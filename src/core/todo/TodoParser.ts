import { TodoItem } from './TodoItem';

/**
 * Parses files to detect TODO/FIXME comments
 * @class TodoParser
 */
export class TodoParser {
  private readonly TODO_REGEX = /\/\/\s*TODO:?(.*)$|\/\*\s*TODO:?(.*?)\*\//gi;

  /**
   * Parse the content of a file to find TODOs
   * @param {string} content - The content of the file to parse
   * @param {string} filePath - The path of the file being parsed
   * @returns {TodoItem[]} An array of TodoItem objects found in the content
   */
  public parse(content: string, filePath: string): TodoItem[] {
    const todos: TodoItem[] = [];
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      let match;
      while ((match = this.TODO_REGEX.exec(line)) !== null) {
        const todoText = (match[1] || match[2]).trim();
        if (todoText) {
          const todoItem = new TodoItem(
            todoText,
            filePath,
            index + 1, // Line numbers are 1-based
            new Date(), // Use current date for createdAt
          );
          todos.push(todoItem);
        }
      }
    });

    return todos;
  }
}
