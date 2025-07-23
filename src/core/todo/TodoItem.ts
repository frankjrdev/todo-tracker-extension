/**
 * Represents a TODO item detected in the code
 * @class TodoItem
 * @property {string} text - Descriptive text of the TODO
 * @property {string} filePath - Path of the file where it was found
 * @property {number} lineNumber - Line number in the file
 * @property {Date} createdAt - Detection date
 */
export class TodoItem {
  constructor(
    public readonly text: string,
    public readonly filePath: string,
    public readonly lineNumber: number,
    public readonly createdAt: Date = new Date(),
  ) {}

  /**
   * Returns a string representation of the TodoItem
   * @returns {string} Format: "[file:line] - text"
   */
  public toString(): string {
    return `[${this.filePath}:${this.lineNumber}] - ${this.text}`;
  }
}
