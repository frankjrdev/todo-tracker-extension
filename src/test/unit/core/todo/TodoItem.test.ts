import { TodoItem } from '@/core/todo/TodoItem';

describe('TodoItem', () => {
  it('should correctly initialize properties', () => {
    const todo = new TodoItem(
      'Fix bug in code',
      'src/file.ts',
      42,
      new Date('2023-10-01T12:00:00Z'),
    );

    expect(todo.text).toBe('Fix bug in code');
    expect(todo.filePath).toBe('src/file.ts');
    expect(todo.lineNumber).toBe(42);
    expect(todo.createdAt).toBeInstanceOf(Date);
  });

  it('toString() returns correct format', () => {
    const todo = new TodoItem('Implement feature X', 'src/feature.ts', 10);

    expect(todo.toString()).toBe('[src/feature.ts:10] - Implement feature X');
  });
});
