class RootNode<T> {
  data: T;
  left: RootNode<T> | null;
  right: RootNode<T> | null;

  constructor(data: T) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree<T> {
  root: RootNode<T> | null;

  constructor() {
    this.root = null;
  }

  insert(data: T) {
    const newNode = new RootNode(data);

    if (!this.root) {
      this.root = newNode;
    }

    this.insertInSubtree(this.root, newNode);

    return this;
  }

  private insertInSubtree<T>(node: RootNode<T>, newNode: RootNode<T>) {
    if (newNode.data > node.data) {
      if (node.right) {
        this.insertInSubtree(node.right, newNode);
      } else {
        node.right = newNode;
      }
    } else if (newNode.data < node.data) {
      if (node.left) {
        this.insertInSubtree(node.left, newNode);
      } else {
        node.left = newNode;
      }
    } else {
      return;
    }
  }

  search(data: any) {
    if (!this.root) {
      return null;
    }

    return this.searchSubtree<any>(this.root, data);
  }

  private searchSubtree<T>(node: RootNode<T>, data: T): any {
    if (node.data === data) {
      return node;
    } else if (data > node.data) {
      if (node.right) {
        return this.searchSubtree(node.right, data);
      } else {
        return null;
      }
    } else if (data < node.data) {
      if (node.left) {
        return this.searchSubtree(node.left, data);
      } else {
        return null;
      }
    }
  }
}

const binaryTree = new BinaryTree();

binaryTree
  .insert(10)
  .insert(100)
  .insert(-100)
  .insert(2)
  .insert(50)
  .insert(100)
  .insert(50);

console.log(binaryTree.root);

console.log(binaryTree.root?.left);

console.log(binaryTree.root?.right);

console.log(binaryTree.search(100));

console.log(binaryTree.search(2));

console.log(binaryTree.search(2000));
