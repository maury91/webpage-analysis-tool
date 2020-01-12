import { readFileSync } from 'fs';
import * as path from 'path';
import { analyzePage } from '../analyze';

const test1html = readFileSync(path.join(__dirname, 'test1.html'), 'utf-8');
const test2xml = readFileSync(path.join(__dirname, 'test2.xml'), 'utf-8');

describe('Analyze function', () => {
  it('Should find all unique tags used in the document.', () => {
    const result = analyzePage(test1html);
    expect(result.tags).toEqual([
      { tag: 'em', count: 6 },
      { tag: 'p', count: 3 },
      { tag: 'html', count: 1 },
      { tag: 'head', count: 1 },
      { tag: 'meta', count: 1 },
      { tag: 'title', count: 1 },
      { tag: 'body', count: 1 },
      { tag: 'section', count: 1 },
      { tag: 'strong', count: 1 }
    ]);
  });

  it('Should find the most common tag in the document.', () => {
    const result = analyzePage(test1html);
    expect(result.tags[0].tag).toBe('em');
  });

  it('Should find the longest path in the document tree where the most popular tag is used the most times', () => {
    const result = analyzePage(test1html);
    expect(result.mostUsedAndDeepestPath).toBe(
      'html > body > p:nth-of-type(2) > em:nth-of-type(1)'
    );
  });

  it('Should throw an error for an empty document', () => {
    expect(() => analyzePage('')).toThrow();
  });

  it('Should analyze XML files', () => {
    expect(analyzePage(test2xml)).toEqual({
      tags: [
        { tag: 'b', count: 8 },
        { tag: 'food', count: 5 },
        { tag: 'name', count: 5 },
        { tag: 'price', count: 5 },
        { tag: 'description', count: 5 },
        { tag: 'calories', count: 5 },
        { tag: 'xml', count: 1 },
        { tag: 'breakfast_menu', count: 1 }
      ],
      mostUsedAndDeepestPath:
        'breakfast_menu > food:nth-of-type(2) > description > b:nth-of-type(1)'
    });
  });
});
