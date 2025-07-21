import { Logger } from '../../../utils/Logger';
import * as vscode from 'vscode';

jest.mock('vscode', () => ({
  window: {
    createOutputChannel: jest.fn(() => ({
      appendLine: jest.fn(),
    })),
  },
}));

describe('Logger', () => {
  let logger: Logger;

  beforeEach(() => {
    logger = new Logger('TestLogger');
  });

  it('should create output channel on initialization', () => {
    expect(vscode.window.createOutputChannel).toHaveBeenCalledWith('TestLogger');
  });

  it('should log info messages', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    logger.info('Test message');
    expect(consoleSpy).toHaveBeenCalledWith('[TestLogger] Test message');
  });

  it('should log error messages with stack trace', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    const error = new Error('Test error');
    logger.error('Test message', error);
    expect(consoleSpy).toHaveBeenCalledWith('[TestLogger] Test message', error);
  });
});
