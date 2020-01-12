import { DOMParser } from 'xmldom';
import { extractPath, hasTag, orderDesc, TagCount } from './analyze.utils';

interface AnalyzePageRawResult {
  [tag: string]: {
    count: number;
    mostUsedAndDeepest: {
      depth: number;
      siblingsCount: number;
      node: Element;
    };
  };
}

export interface AnalyzePageResult {
  tags: TagCount[];
  mostUsedAndDeepestPath: string;
}

const analyzeRecursive = (
  currentResult: AnalyzePageRawResult,
  currentNode: Element,
  siblings: Element[],
  pathDepth: number
) => {
  const tag = currentNode.tagName;
  // We need to count how many other siblings have the same tag to calculate the most used place
  const siblingsCount = siblings.filter(node => node.tagName === tag).length;
  // If it's the first time we meet this tag, we initialize it with some default values
  if (!(tag in currentResult)) {
    currentResult[tag] = {
      count: 0,
      mostUsedAndDeepest: {
        depth: 0,
        siblingsCount,
        node: currentNode
      }
    };
  }
  const tagOccurrences = currentResult[tag];
  // Increase tag count
  tagOccurrences.count++;
  // If we found a place where the tag is more used, or we found a place where the tag is equally used but it's in a deepest location
  // Update the record holder
  if (
    tagOccurrences.mostUsedAndDeepest.siblingsCount < siblingsCount ||
    (tagOccurrences.mostUsedAndDeepest.siblingsCount <= siblingsCount &&
      tagOccurrences.mostUsedAndDeepest.depth < pathDepth)
  ) {
    tagOccurrences.mostUsedAndDeepest = {
      depth: pathDepth,
      siblingsCount,
      node: currentNode
    };
  }
  // Continue the recursion by checking the children, we are interested only in children that have a tag (no comments, or texts)
  const htmlTags = Array.from(currentNode.childNodes || []).filter(hasTag);
  for (const htmlTag of htmlTags) {
    analyzeRecursive(currentResult, htmlTag, htmlTags, pathDepth + 1);
  }
};

export const analyzePage = (content: string): AnalyzePageResult => {
  if (!content.trim()) {
    throw new Error('Cannot analyze an empty document');
  }
  const document = new DOMParser().parseFromString(content);
  const rawResult: AnalyzePageRawResult = {};
  // we are interested only in children that have a tag (no comments, or texts)
  const htmlTags = Array.from(document.childNodes || []).filter(hasTag);
  for (const htmlTag of htmlTags) {
    analyzeRecursive(rawResult, htmlTag, htmlTags, 0);
  }
  // Extract tag popularity from the raw result
  const tags = Object.keys(rawResult)
    .map(tag => ({ tag, count: rawResult[tag].count }))
    .sort(orderDesc);
  // Obtain the most common tag
  const mostCommon = tags[0].tag;
  const mostUsedAndDeepestPath = extractPath(rawResult[mostCommon].mostUsedAndDeepest.node);
  return {
    tags,
    mostUsedAndDeepestPath
  };
};
