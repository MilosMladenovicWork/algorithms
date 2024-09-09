class AvlTree {
  root: AvlTreeNode | null = null;

  insert(value: number) {
    this.root = this.insertNode(this.root, value);
  }

  private insertNode(tree: AvlTreeNode | null, value: number) {
    if (tree === null) {
      return new AvlTreeNode(value);
    }

    if (tree.value > value) {
      tree.left = this.insertNode(tree.left, value);
    } else if (tree.value < value) {
      tree.right = this.insertNode(tree.right, value);
    } else {
      return tree;
    }

    tree.height =
      1 + Math.max(this.getHeight(tree.left), this.getHeight(tree.right));

    const balanceFactor = this.getBalanceFactor(tree);

    if (balanceFactor > 1) {
      if (value < tree.left!.value) {
        return this.rotateRight(tree);
      } else {
        tree.left = this.rotateLeft(tree.left!);
        return this.rotateRight(tree);
      }
    } else if (balanceFactor < -1) {
      if (value > tree.right!.value!) {
        return this.rotateLeft(tree);
      } else {
        tree.right = this.rotateRight(tree.right!);
        return this.rotateLeft(tree);
      }
    }

    return tree;
  }

  private getHeight(node: AvlTreeNode | null) {
    return node?.height ?? 0;
  }

  private getBalanceFactor(node: AvlTreeNode) {
    return this.getHeight(node.left) - this.getHeight(node.right);
  }

  private rotateLeft(node: AvlTreeNode) {
    const rightNode = node.right!;
    const rightLeftNode = rightNode.left;

    rightNode.left = node;
    node.right = rightLeftNode;

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

    leftNode.right = node;
    node.left = leftRightNode;

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
  left: AvlTreeNode | null = null;
  right: AvlTreeNode | null = null;
  height: number = 1;

  constructor(value: number) {
    this.value = value;
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
