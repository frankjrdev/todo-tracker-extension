import { TodoItem } from '@/core/todo-tracker/TodoItem';
import { TodoTreeView } from '@/ui/TodoTreeView';
import { Logger } from '@/utils/Logger';

jest.mock('vscode');

describe('TodoTreeView', () => {
  let mockLogger: Logger;
  let treeView: TodoTreeView;

  beforeEach(() => {
    mockLogger = { info: jest.fn() } as unknown as Logger;
    treeView = new TodoTreeView(mockLogger);
  });

  it('should refresh tree view', () => {
    treeView.refresh();
    expect(mockLogger.info).toHaveBeenCalledWith('Todo tree view refreshed');
  });

  it('should create tree items correctly', () => {
    const todo = new TodoItem('Test TODO', '/path/file.ts', 10);
    const treeItem = treeView.getTreeItem(todo);

    expect(treeItem.label).toBe('Test TODO');
    expect(treeItem.tooltip).toBe('/path/file.ts:10');
    expect(treeItem.command?.arguments?.[0].path).toContain('/path/file.ts');
  });
});
