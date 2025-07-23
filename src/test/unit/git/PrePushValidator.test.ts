import { PrePushValidator } from '@/core/git/PrePushValidator';
import { TodoItem } from '@/core/todo/TodoItem';

describe('PrePushValidator', () => {
  const validator = new PrePushValidator();

  it('should pass when no TODOs in modified files', () => {
    const todos = [
      new TodoItem('Fix bug in code', 'src/file.ts', 42, new Date('2023-10-01T12:00:00Z')),
      new TodoItem('Implement feature X', 'src/feature.ts', 10, new Date('2023-10-01T12:00:00Z')),
    ];

    const modifiedFiles = ['src/anotherFile.ts'];
    expect(() => validator.validate(todos, modifiedFiles)).not.toThrow();
  });

  it('should throw error when TODOs are present in modified files', () => {
    const todos = [
      new TodoItem('Fix bug in code', 'src/file.ts', 42, new Date('2023-10-01T12:00:00Z')),
      new TodoItem('Implement feature X', 'src/feature.ts', 10, new Date('2023-10-01T12:00:00Z')),
    ];

    const modifiedFiles = ['src/file.ts'];
    expect(() => validator.validate(todos, modifiedFiles)).toThrow(
      'You have pending TODOs in the following files: src/file.ts. Please resolve them before pushing.',
    );
  });

  it('should handle multiple modified files with TODOs', () => {
    const todos = [
      new TodoItem('Fix bug in code', 'src/file.ts', 42, new Date('2023-10-01T12:00:00Z')),
      new TodoItem('Implement feature X', 'src/feature.ts', 10, new Date('2023-10-01T12:00:00Z')),
    ];

    const modifiedFiles = ['src/file.ts', 'src/feature.ts'];
    expect(() => validator.validate(todos, modifiedFiles)).toThrow(
      'You have pending TODOs in the following files: src/file.ts, src/feature.ts. Please resolve them before pushing.',
    );
  });
});
