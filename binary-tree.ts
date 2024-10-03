class BinaryTree {
  root: BinaryTreeNode;
  constructor(rootNode: BinaryTreeNode) {
    this.root = rootNode;
  }

  breadthFirstTraversal() {
    const toVisitNodes = [this.root];

    while (toVisitNodes.length > 0) {
      const node = toVisitNodes.shift()!;

      console.log(node.data);

      if (node.left) {
        toVisitNodes.push(node.left);
      }

      if (node.right) {
        toVisitNodes.push(node.right);
      }
    }
  }
}

class BinaryTreeNode {
  data: any;
  left: BinaryTreeNode | null;
  right: BinaryTreeNode | null;

  constructor(data: any) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

const node1 = new BinaryTreeNode(10);
const node2 = new BinaryTreeNode(20);
const node3 = new BinaryTreeNode(30);
const node4 = new BinaryTreeNode(40);

node1.left = node2;
node1.right = node3;
node2.left = node4;

const binaryTree = new BinaryTree(node1);
binaryTree.breadthFirstTraversal();
