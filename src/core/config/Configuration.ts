import { Logger } from '@/utils/Logger';
import * as vscode from 'vscode';
/**
 * Manages extension configuration
 * @class Configuration
 */
export class Configuration {
  private static readonly SECTION = 'todoTracker';

  /**
   *Gets configurarion value by key
   * @template T
   * @param {string} key - The configuration key
   * @param {T} defaultValue - The default value if the key is not found
   * @returns {T} The configuration value
   */
  public static get<T>(key: string, defaultValue: T): T {
    return vscode.workspace.getConfiguration(this.SECTION).get<T>(key, defaultValue);
  }

  /**
   * Updates configuration value by key
   * @template T
   * @param {string} key - The configuration key
   * @param {T} value - The value to set
   * @param {vscode.ConfigurationTarget} target - Configuration target
   * @param {Logger} [logger] - Optional logger
   */

  public static async set<T>(
    key: string,
    value: T,
    target: vscode.ConfigurationTarget = vscode.ConfigurationTarget.Workspace,
    logger?: Logger,
  ): Promise<void> {
    try {
      await vscode.workspace.getConfiguration(this.SECTION).update(key, value, target);
      logger?.info(`Configuration updated: ${key} = ${value}`);
    } catch (error) {
      logger?.error(`Failed to update configuration: ${key}`, error as Error);

      throw new Error(`Configuration update failed for key: ${key}`);
    }
  }
}
