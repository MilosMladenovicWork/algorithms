class TreeNode<T> {
  data: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;

  constructor(data: T) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree<T> {
  root: TreeNode<T> | null;

  constructor() {
    this.root = null;
  }

  insert(data: T) {
    const newNode = new TreeNode(data);

    if (!this.root) {
      this.root = newNode;
    }

    let currentNode: TreeNode<T> = this.root;

    while (currentNode !== newNode) {
      if (newNode.data < currentNode.data) {
        if (currentNode.left === null) {
          currentNode.left = newNode;
        }

        currentNode = currentNode.left;
      } else if (newNode.data > currentNode.data) {
        if (currentNode.right === null) {
          currentNode.right = newNode;
        }

        currentNode = currentNode.right;
      }
    }

    return this;
  }

  search(value: T) {
    let currentNode: TreeNode<T> | null = this.root;

    while (currentNode !== null) {
      if (value === currentNode.data) {
        return currentNode;
      } else if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    return null;
  }

  inorderTraversal(node: TreeNode<T> | null) {
    if (node !== null) {
      this.inorderTraversal(node.left);
      console.log(`Inorder: ${node.data}`);
      this.inorderTraversal(node.right);
    }
  }

  preorderTraversal(node: TreeNode<T> | null) {
    if (node !== null) {
      console.log(`Preorder: ${node.data}`);
      this.preorderTraversal(node.left);
      this.preorderTraversal(node.right);
    }
  }

  postorderTraversal(node: TreeNode<T> | null) {
    if (node !== null) {
      this.postorderTraversal(node.left);
      this.postorderTraversal(node.right);
      console.log(`Postorder: ${node.data}`);
    }
  }

  delete(value: T) {
    this.root = this.deleteNode(this.root, value);
  }

  deleteNode(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
    if (node === null) {
      return null;
    }

    if (node.data === value) {
      if (node.left === null && node.right === null) {
        return null;
      } else if (node.left === null && node.right !== null) {
        return node.right;
      } else if (node.left !== null && node.right === null) {
        return node.left;
      } else if (node.left !== null && node.right !== null) {
        const leftSubtreeMaxNode = this.findSubtreeMaxNode(node.left);

        node.data = leftSubtreeMaxNode.data;

        node.left = this.deleteNode(node.left, leftSubtreeMaxNode.data);
      }
    } else if (value < node.data) {
      node.left = this.deleteNode(node.left, value);
    } else if (value > node.data) {
      node.right = this.deleteNode(node.right, value);
    }

    return node;
  }

  findSubtreeMaxNode(node: TreeNode<T>) {
    let maxNode = node;

    while (maxNode.right !== null) {
      maxNode = maxNode.right;
    }

    return maxNode;
  }
}

const bst = new BinarySearchTree();

bst
  .insert(10)
  .insert(2)
  .insert(100)
  .insert(-1)
  .insert(3)
  .insert(-2)
  .insert(-50)
  .insert(1000);

console.log(bst.root);

bst.deleteNode(bst.root, 10);

console.log(bst.root);
