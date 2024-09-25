class AvlTree {
  root: AvlTreeNode | null = null;

  constructor() {}

  insert(value: number) {
    const node = new AvlTreeNode(value);

    this.root = this.insertNode(node, this.root);

    return this;
  }

  private insertNode(node: AvlTreeNode, currentNode: AvlTreeNode | null) {
    if (currentNode === null) {
      return node;
    }
    if (node.value > currentNode.value) {
      currentNode.right = this.insertNode(node, currentNode.right);
    } else if (node.value < currentNode.value) {
      currentNode.left = this.insertNode(node, currentNode.left);
    } else {
      return currentNode;
    }

    currentNode.height =
      1 +
      Math.max(
        this.getHeight(currentNode.left),
        this.getHeight(currentNode.right)
      );

    const balanceFactor =
      this.getHeight(currentNode.left) - this.getHeight(currentNode.right);

    if (balanceFactor > 1) {
      if (currentNode.left!.value < node.value) {
        // left right
        currentNode.left = this.leftRotation(currentNode.left!);
      }
      // right
      return this.rightRotation(currentNode);
    } else if (balanceFactor < -1) {
      if (currentNode.right!.value > node.value) {
        // right left
        currentNode.right = this.rightRotation(currentNode.right!);
      }
      // left
      return this.leftRotation(currentNode);
    }

    return currentNode;
  }

  private getHeight(node: AvlTreeNode | null) {
    return node ? node.height : 0;
  }

  private leftRotation(node: AvlTreeNode) {
    const rightNode = node.right!;

    const rightLeftNode = rightNode.left;

    node.right = rightLeftNode;

    rightNode.left = node;

    node.height =
      1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    rightNode.height =
      1 +
      Math.max(this.getHeight(rightNode.left), this.getHeight(rightNode.right));

    return rightNode;
  }

  private rightRotation(node: AvlTreeNode) {
    const leftNode = node.left!;

    const leftRightNode = leftNode.right;

    node.left = leftRightNode;

    leftNode.right = node;

    node.height =
      1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    leftNode.height =
      1 +
      Math.max(this.getHeight(leftNode.left), this.getHeight(leftNode.right));

    return leftNode;
  }
}

class AvlTreeNode {
  value: number;
  left: AvlTreeNode | null = null;
  right: AvlTreeNode | null = null;
  height: number;

  constructor(value: number) {
    this.value = value;
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

console.log(avlTree.root);
