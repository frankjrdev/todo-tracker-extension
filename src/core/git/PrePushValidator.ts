import { TodoItem } from '../todo-tracker/TodoItem';

/**
 * Validates TODO/FIXME comments before pushing changes
 * @class PrePushValidator
 * This class is responsible for checking if there are any TODO or FIXME comments in the code
 * that need to be addressed before allowing a push to the repository.
 * It can be extended to include more complex validation logic, such as checking for specific
 * patterns or ensuring that certain TODOs are resolved.
 */
export class PrePushValidator {
  /**
   * Validates if existing TODO/FIXME comments are resolved before pushing code changes.
   * @param {TodoItem[]} allTodos - All TODOs in the project
   * @param {string[]} modifiedFiles - Paths of modified files
   * @throws {Error} If there are pending TODOs in modified files
   */
  public validate(allTodos: TodoItem[], modifiedFiles: string[]): void {
    const pendigTodos = allTodos.filter((todo) =>
      modifiedFiles.some((file) => todo.filePath.includes(file)),
    );

    if (pendigTodos.length > 0) {
      throw new Error(
        `You have pending TODOs in the following files: ${pendigTodos.map((todo) => todo.filePath).join(', ')}. Please resolve them before pushing.`,
      );
    }
  }
}
