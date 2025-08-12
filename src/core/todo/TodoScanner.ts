import { TodoItem } from '@/core/todo/TodoItem';
import { Logger } from '@/utils/Logger';
import { TodoParser } from './TodoParser';
import * as vscode from 'vscode';

export class TodoScanner {
  private readonly parser = new TodoParser();
  private readonly excludedFolders = [
    'node_modules',
    'dist',
    'build',
    'out',
    '**/.git',
    '**/.svn',
    '**/.hg',
  ];

  /**
   *Scans the entire workspacer for TODOs
   * @param {Logger} logger - The logger instance to log messages
   * @returns {Promise<TodoItem[]>} A promise that resolves to an array of TodoItem objects
   */
  public async scanWorkspace(logger: Logger): Promise<TodoItem[]> {
    try {
      logger.info('Starting to scan workspace for TODOs...');
      const todoItems: TodoItem[] = [];

      // Get all relevant files in workspace
      const files = await vscode.workspace.findFiles(
        '**/*.{js,ts,jsx,tsx,html,css,py,java,php,go,rb}',
        `{${this.excludedFolders.join(',')}}`,
      );

      logger.info(`Found ${files.length} files to scan`);

      // Process files in batches to avoid memory issues
      const BATCH_SIZE = 50;
      for (let i = 0; i < files.length; i += BATCH_SIZE) {
        const batch = files.slice(i, i + BATCH_SIZE);
        const batchResults = await Promise.all(batch.map((file) => this.processFile(file, logger)));

        todoItems.push(...batchResults.flat());

        logger.info(
          `Processed batch ${i / BATCH_SIZE + 1}/${Math.ceil(files.length / BATCH_SIZE)}`,
        );
      }

      logger.info(`Found ${todoItems.length} TODOs across ${files.length} files`);
      return todoItems;
    } catch (error) {
      logger.error('Failed to scan workspace for TODOs', error as Error);
      throw error;
    }
  }

  /**
   * Processes a single file to extract TODOs
   * @param {vscode.Uri} file - The file URI to process
   * @param {Logger} logger - Logger instance
   * @returns {Promise<TodoItem[]>} Array of TODOs found in the file
   */
  private async processFile(file: vscode.Uri, logger: Logger): Promise<TodoItem[]> {
    try {
      const document = await vscode.workspace.openTextDocument(file);
      const todos = this.parser.parse(document.getText(), file.fsPath);

      if (todos.length > 0) {
        logger.info(`Found ${todos.length} TODOs in ${file.fsPath}`);
      }

      return todos;
    } catch (error) {
      logger.warn(`Failed to process file ${file.fsPath}`, error as Error);
      return [];
    }
  }
}
