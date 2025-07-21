import * as vscode from 'vscode';
/**
 *Logging utility for the Todo Tracker extension
 * @class Logger
 */

export class Logger {
  private readonly outputChannel: vscode.OutputChannel;
  private readonly channelName: string;

  /**
   * Creates a new Logger instance
   * @param {string} channelName - The name of the output channel
   */
  constructor(channelName: string) {
    this.channelName = channelName;
    this.outputChannel = vscode.window.createOutputChannel(channelName);
  }

  /**
   * Logs an informational message
   * @param {string} message - The message to log
   */
  public info(message: string): void {
    const timestamp = new Date().toISOString();
    this.outputChannel.appendLine(`[INFO] [${timestamp}] ${message}`);
    console.info(`[INFO] [${timestamp}] ${message}`);
  }

  /**
   * Logs a warning message
   * @param {string} message - Message to log
   */
  public warn(message: string): void {
    const timestamp = new Date().toISOString();
    this.outputChannel.appendLine(`[WARN][${timestamp}] ${message}`);
    console.warn(`[${this.channelName}] ${message}`);
  }

  /**
   * Logs an error message
   * @param {string} message - Message to log
   * @param {Error} [error] - Optional error object
   */
  public error(message: string, error?: Error): void {
    const timestamp = new Date().toISOString();
    const errorDetails = error ? `\n${error.stack}` : '';
    this.outputChannel.appendLine(`[ERROR][${timestamp}] ${message}${errorDetails}`);
    console.error(`[${this.channelName}] ${message}`, error);
  }
}
