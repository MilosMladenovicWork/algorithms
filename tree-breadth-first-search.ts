class Tree {
  root: TreeNode;

  constructor(rootNode: TreeNode) {
    this.root = rootNode;
  }
}

class TreeNode {
  key: string;
  data: any;
  children: TreeNode[] | [] = [];

  constructor(key: string, data: any) {
    this.key = key;
    this.data = data;
  }
}

const rootNode = new TreeNode("10", 10);
const node1 = new TreeNode("2", 2);
const node2 = new TreeNode("3", 3);
const node3 = new TreeNode("4", 4);
const node4 = new TreeNode("5", 5);

rootNode.children = [node1, node2];
node1.children = [node3];
node3.children = [node4];

const tree = new Tree(rootNode);

const treeBreadthFirstSearch = (tree: Tree, key: string) => {
  const rootNode = tree.root;

  if (!rootNode) {
    return;
  }

  const nodesQueue: TreeNode[] = [rootNode];

  while (nodesQueue.length > 0) {
    const node = nodesQueue.shift()!;
    console.log(node.key);

    if (node.key === key) {
      return node.data;
    }

    nodesQueue.push(...node.children);
  }

  return;
};

console.log(treeBreadthFirstSearch(tree, "5"));
