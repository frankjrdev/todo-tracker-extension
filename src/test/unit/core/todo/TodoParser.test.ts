import { TodoItem } from '@/core/todo/TodoItem';

export class TodoParser {
  // Regex mejorado para capturar TODOs en diferentes formatos
  private readonly TODO_REGEX = /(?:\/\/|\/\*)\s*TODO:?([^\*]*?(?:\*\/)?)/gi;

  public parse(content: string, filePath: string): TodoItem[] {
    const todos: TodoItem[] = [];
    const lines = content.split('\n');
    let inMultilineComment = false;
    let multilineText = '';
    let startLine = 0;

    lines.forEach((line, index) => {
      // Manejo de comentarios multi-línea
      if (inMultilineComment) {
        const endMatch = line.match(/\*\//);
        if (endMatch) {
          inMultilineComment = false;
          const textBeforeEnd = line.substring(0, endMatch.index);
          multilineText += textBeforeEnd;

          // Procesar el TODO completo
          this.processTodoMatch(multilineText, filePath, startLine + 1, todos);
          multilineText = '';
        } else {
          multilineText += line + '\n';
        }
        return;
      }

      // Buscar inicio de comentario multi-línea
      const multilineStart = line.match(/\/\*\s*TODO:?([^\*]*)/);
      if (multilineStart) {
        inMultilineComment = true;
        startLine = index;
        multilineText = multilineStart[1] || '';
        return;
      }

      // Procesar comentarios de una sola línea
      let match;
      const singleLineRegex = /\/\/\s*TODO:?(.*)/g;
      while ((match = singleLineRegex.exec(line)) !== null) {
        const todoText = match[1].trim();
        if (todoText) {
          todos.push(new TodoItem(todoText, filePath, index + 1, new Date()));
        }
      }
    });

    return todos;
  }

  private processTodoMatch(text: string, filePath: string, lineNumber: number, todos: TodoItem[]) {
    const todoText = text
      .replace(/\n/g, ' ') // Reemplazar saltos de línea con espacios
      .replace(/\s+/g, ' ') // Normalizar espacios
      .trim();

    if (todoText) {
      todos.push(new TodoItem(todoText, filePath, lineNumber, new Date()));
    }
  }
}
