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

  it('should set current date when createdAt is not provided', () => {
    const before = new Date();
    const todo = new TodoItem('Test', 'file.ts', 1);
    const after = new Date();

    expect(todo.createdAt).toBeInstanceOf(Date);
    expect(todo.createdAt.getTime()).toBeGreaterThanOrEqual(before.getTime());
    expect(todo.createdAt.getTime()).toBeLessThanOrEqual(after.getTime());
  });

  it('toString() returns correct format', () => {
    const todo = new TodoItem('Implement feature X', 'src/feature.ts', 10);

    expect(todo.toString()).toBe('[src/feature.ts:10] - Implement feature X');
  });

  it('should format correctly with normal values', () => {
    const todo = new TodoItem('Normal text', 'src/file.ts', 42);
    expect(todo.toString()).toBe('[src/file.ts:42] - Normal text');
  });

  it('should handle empty text', () => {
    const todo = new TodoItem('', 'src/file.ts', 42);
    expect(todo.toString()).toBe('[src/file.ts:42] - ');
  });

  it('should handle special characters', () => {
    const todo = new TodoItem('Fix #@!%', 'src/weird@file.ts', 1);
    expect(todo.toString()).toBe('[src/weird@file.ts:1] - Fix #@!%');
  });
});
