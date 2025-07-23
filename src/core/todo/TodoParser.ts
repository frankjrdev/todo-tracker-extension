import { TodoItem } from './TodoItem';

/**
 * Parses files to detect TODO/FIXME comments
 * @class TodoParser
 */
export class TodoParser {
  // Regex para comentarios de línea y bloque
  private readonly LINE_TODO_REGEX = /\/\/\s*TODO:?(.*)$/gm;
  private readonly BLOCK_TODO_REGEX = /\/\*\s*TODO:?(.*?)\*\//gms;

  public parse(content: string, filePath: string): TodoItem[] {
    const todos: TodoItem[] = [];

    // Buscar TODOs en comentarios de línea
    let match;
    while ((match = this.LINE_TODO_REGEX.exec(content)) !== null) {
      const todoText = (match[1] || '').trim();
      if (todoText) {
        const before = content.slice(0, match.index);
        const lineNumber = before.split('\n').length;
        todos.push(new TodoItem(todoText, filePath, lineNumber, new Date()));
      }
    }

    // Buscar TODOs en comentarios de bloque
    while ((match = this.BLOCK_TODO_REGEX.exec(content)) !== null) {
      const todoText = (match[1] || '').trim();
      if (todoText) {
        const before = content.slice(0, match.index);
        const lineNumber = before.split('\n').length;
        todos.push(new TodoItem(todoText, filePath, lineNumber, new Date()));
      }
    }

    return todos;
  }
}
