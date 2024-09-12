class AvlTree {
  root: AvlTreeNode | null;
  constructor() {
    this.root = null;
  }

  insert(value: number) {
    this.root = this.insertNode(this.root, value);

    return this;
  }

  private insertNode(node: AvlTreeNode | null, value: number) {
    if (node === null) {
      return new AvlTreeNode(value);
    }

    if (node.value > value) {
      node.left = this.insertNode(node.left, value);
    } else if (node.value < value) {
      node.right = this.insertNode(node.right, value);
    } else {
      return node;
    }

    node.height =
      1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

    const balanceFactor = this.getBalanceFactor(node);

    if (balanceFactor > 1) {
      if (node.left!.value > value) {
        return this.rotateRight(node);
      } else {
        node.left = this.rotateLeft(node.left!);
        return this.rotateRight(node);
      }
    } else if (balanceFactor < -1) {
      if (node.right!.value < value) {
        return this.rotateLeft(node);
      } else {
        node.right = this.rotateRight(node.right!);
        return this.rotateLeft(node);
      }
    }

    return node;
  }

  private getHeight(node: AvlTreeNode | null) {
    return node ? node.height : 0;
  }

  private getBalanceFactor(node: AvlTreeNode) {
    return this.getHeight(node.left) - this.getHeight(node.right);
  }

  private rotateLeft(node: AvlTreeNode) {
    const rightNode = node.right!;
    const rightLeftNode = rightNode.left;

    node.right = rightLeftNode;
    rightNode.left = node;

    rightNode.height =
      1 +
      Math.max(this.getHeight(rightNode.left), this.getHeight(rightNode.right));
    node.height =
      1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

    return rightNode;
  }

  private rotateRight(node: AvlTreeNode) {
    const leftNode = node.left!;
    const leftRightNode = leftNode.right;

    node.left = leftRightNode;
    leftNode.right = node;

    leftNode.height =
      1 +
      Math.max(this.getHeight(leftNode.left), this.getHeight(leftNode.right));
    node.height =
      1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

    return leftNode;
  }
}

class AvlTreeNode {
  value: number;
  left: AvlTreeNode | null;
  right: AvlTreeNode | null;
  height: number;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

const avlTree = new AvlTree();
avlTree.insert(10);
avlTree.insert(5);
avlTree.insert(15);
avlTree.insert(0);
avlTree.insert(20);
avlTree.insert(-10);
avlTree.insert(30);

console.log(avlTree.root?.left);
