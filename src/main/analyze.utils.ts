/**
 * Not all elements have tags, for example comments and text have no tags
 */
export const hasTag = (node: Node & ParentNode | ChildNode): node is Element => 'tagName' in node;

export interface TagCount {
  tag: string;
  count: number;
}

/**
 * compare tags and order them in descending order using the field count
 */
export const orderDesc = ({ count: countA }: TagCount, { count: countB }: TagCount) =>
  countB - countA;

/**
 * Return a CSS selector to find that specific node
 */
export const extractPath = (node: Element, currentPath = ''): string => {
  const parent = node.parentNode;
  if (parent && hasTag(parent)) {
    // First let's check if the parent has other children with the same tag
    const sameTag = Array.from(parent.childNodes)
      .filter(hasTag)
      .filter(({ tagName }) => tagName === node.tagName);
    // Let's find at what position the node is
    const position = sameTag.indexOf(node);
    // If it's the only children with that tag, we don't need to specify the position
    const pathName =
      sameTag.length > 1 ? `${node.tagName}:nth-of-type(${position + 1})` : node.tagName;
    return extractPath(parent, currentPath ? `${pathName} > ${currentPath}` : pathName);
  }
  return currentPath ? `${node.tagName} > ${currentPath}` : node.tagName;
};
