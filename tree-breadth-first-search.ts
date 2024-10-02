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

const bfsTree = new Tree(rootNode);

const treeBreadthFirstSearch = (tree: Tree, key: string) => {
  const queue = [tree.root];

  while (queue.length > 0) {
    const node = queue.shift()!;

    if (node.key === key) {
      return node.data;
    }

    for (const nodeChild of node.children) {
      queue.push(nodeChild);
    }
  }

  return null;
};

console.log(treeBreadthFirstSearch(bfsTree, "5"));
