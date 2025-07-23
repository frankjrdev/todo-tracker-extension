import * as vscode from 'vscode';
import { TodoParser } from './core/todo/TodoParser';
import { PrePushValidator } from './core/git/PrePushValidator';
import { Logger } from './utils/Logger';

/**
 * Activates the extension
 * @param {vscode.ExtensionContext} context - VSCode extension context
 */
export function activate(context: vscode.ExtensionContext) {
  const logger = new Logger('TodoTrackerExtension');
  const todoParser = new TodoParser();
  const pushValidator = new PrePushValidator();

  logger.info('Todo Tracker Extension is now active');

  //TODO: Register the pre-push validator
}

// This method is called when your extension is deactivated
export function deactivate() {
  const logger = new Logger('TodoTrackerExtension');
  logger.info('Todo Tracker Extension is now deactivated');
  // Perform any necessary cleanup here
}
