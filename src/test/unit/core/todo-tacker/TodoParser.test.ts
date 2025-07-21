import { TodoParser } from '../../../../core/todo-tracker/TodoParser';

describe('TodoParser', () => {
  const parser = new TodoParser();

  it('should detect single-line TODO comments', () => {
    const content = '// TODO: Delete data mocked';
    const todos = parser.parse(content, 'src/file.ts');
    expect(todos.length).toBe(1);
    expect(todos[0].text).toBe('Delete data mocked');
    expect(todos[0].filePath).toBe('src/file.ts');
    expect(todos[0].lineNumber).toBe(1);
  });

  it('should detect multi-line TODO comments', () => {
    const content = '/* TODO: Refactor this code\n * to improve readability */';
    const todos = parser.parse(content, 'src/file.ts');
    expect(todos.length).toBe(1);
    expect(todos[0].text).toBe('Refactor this code to improve readability');
    expect(todos[0].filePath).toBe('src/file.ts');
    expect(todos[0].lineNumber).toBe(1);
  });

  it('should handle multiple TODOs in a single line', () => {
    const content = '// TODO: First task; TODO: Second task';
    const todos = parser.parse(content, 'src/file.ts');
    expect(todos.length).toBe(2);
    expect(todos[0].text).toBe('First task');
    expect(todos[1].text).toBe('Second task');
  });

  it('should ignore lines without TODO comments', () => {
    const content = 'This line has no TODO comment';
    const todos = parser.parse(content, 'src/file.ts');
    expect(todos.length).toBe(0);
  });

  it('should return an empty array for empty content', () => {
    const content = '';
    const todos = parser.parse(content, 'src/file.ts');
    expect(todos.length).toBe(0);
  });
});
