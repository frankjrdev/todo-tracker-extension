import { TodoItem } from '@/core/todo/TodoItem';
import { TodoParser } from '@/core/todo/TodoParser';

describe('TodoParser', () => {
  let parser: TodoParser;

  beforeEach(() => {
    // Given a new instance of TodoParser before each test
    parser = new TodoParser();
  });

  describe('parse', () => {
    it('should return empty array for empty content', () => {
      // Given: Content with no TODO comments
      const content = '';
      const filePath = 'test.js';

      // When: Parsing the content
      const result = parser.parse(content, filePath);

      // Then: Should return empty array
      expect(result).toEqual([]);
    });

    it('should return empty array for content without TODOs', () => {
      // Given: Content without TODO comments
      const content = 'This is a test file without TODOs.';
      const filePath = 'test.js';

      // When: Parsing the content
      const result = parser.parse(content, filePath);

      // Then: Should return empty array
      expect(result).toEqual([]);
    });

    it('should handle undefined match group in line comments', () => {
      const content = '// TODO:'; // Sin texto después
      const filePath = 'test.js';
      const result = parser.parse(content, filePath);
      expect(result).toHaveLength(0);
    });

    it('should handle undefined match group in block comments', () => {
      const content = '/* TODO: */'; // Sin texto después
      const filePath = 'test.js';
      const result = parser.parse(content, filePath);
      expect(result).toHaveLength(0);
    });

    it('should detect single-line TODO comments ', () => {
      // Given: Content with a single TODO comment
      const content = '// TODO: Implement feature X';
      const filePath = 'test.js';

      // When: Parsing the content
      const result = parser.parse(content, filePath);

      // Then: Should return an array with one TodoItem
      expect(result[0]).toBeInstanceOf(TodoItem);
      expect(result[0].text).toBe('Implement feature X');
      expect(result[0].filePath).toBe(filePath);
    });

    it('should no detect TODO in lowercase', () => {
      const content = '// todo: lowercase todo';
      const result = parser.parse(content, 'test.js');
      expect(result).toHaveLength(0);
    });

    it('should handle empty TODO comments', () => {
      // Given: Content with an empty TODO comment
      const content = '// TODO: ';
      const filePath = 'test.js';

      // When: Parsing the content
      const result = parser.parse(content, filePath);

      // Then: Should ignore the empty TODO comment
      expect(result).toHaveLength(0);
    });

    it('should detect TODO with username', () => {
      // Given: Content with username in TODO
      const content = '// TODO(@user): Assign task';
      const filePath = 'test.js';

      // When: Parsing the content
      const result = parser.parse(content, filePath);

      // Then: Should return an array with one TodoItem
      expect(result[0]).toBeInstanceOf(TodoItem);
      expect(result[0].text).toBe('(@user): Assign task');
      expect(result[0].filePath).toBe(filePath);
    });

    it('should detect multi-line TODO comments', () => {
      // Given: Content with multi-line TODO
      const content = '/* TODO: Implement\nmulti-line fix */\nconst x = 5;';
      const filePath = 'test.js';

      // When: Parsing the content
      const result = parser.parse(content, filePath);

      // Then: Should detect the TODO with newline preserved
      expect(result).toHaveLength(1);
      expect(result[0].text).toBe('Implement\nmulti-line fix');
    });

    it('should detect multiple TODOs in same file', () => {
      // Given: Content with multiple TODOs
      const content = `// TODO: First task
const x = 5;
/* TODO: Second task */`;
      const filePath = 'test.js';

      // When: Parsing the content
      const result = parser.parse(content, filePath);

      // Then: Should return both TODOs
      expect(result).toHaveLength(2);
      expect(result[0].text).toBe('First task');
      expect(result[1].text).toBe('Second task');
    });
  });

  it('should ignore empty TODO comments in block comments', () => {
    // Given: Content with an empty TODO in a block comment
    const content = '/* TODO:    */\nconst x = 5;';
    const filePath = 'test.js';

    // When: Parsing the content
    const result = parser.parse(content, filePath);

    // Then: Should ignore the empty TODO comment
    expect(result).toHaveLength(0);
  });

  it('should ignore block comments without TODO', () => {
    // Given: Content with a block comment but no TODO
    const content = '/* This is just a comment */\nconst x = 5;';
    const filePath = 'test.js';

    // When: Parsing the content
    const result = parser.parse(content, filePath);

    // Then: Should return empty array
    expect(result).toHaveLength(0);
  });

  it('should handle very long lines without freezing', () => {
    const longLine = '// TODO: ' + 'x'.repeat(1000000);
    const result = parser.parse(longLine, 'test.js');
    expect(result).toHaveLength(1);
  });

  it('should safely handle null or undefined content', () => {
    // @ts-expect-error - Prueba de seguridad
    expect(() => parser.parse(null, 'test.js')).not.toThrow();
    // @ts-expect-error - Prueba de seguridad
    expect(() => parser.parse(undefined, 'test.js')).not.toThrow();
  });

  it('should handle empty file path', () => {
    const content = '// TODO: test';
    const result = parser.parse(content, '');
    expect(result[0].filePath).toBe('');
  });
});
