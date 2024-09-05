const tree = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 4,
    },
    right: {
      value: 5,
    },
  },
  right: {
    value: 3,
    right: {
      value: 6,
    },
  },
};

function preorderTreeTraversal(tree: any) {
  const stack = [tree];

  while (stack.length > 0) {
    const node = stack.pop()!;
    console.log(node.value);

    if (node.right) {
      stack.push(node.right);
    }

    if (node.left) {
      stack.push(node.left);
    }
  }
}

function inorderTreeTraversal(tree: any) {
  const stack: any[] = [];
  const result: any[] = [];
  let currentNode = tree;

  while (currentNode || stack.length > 0) {
    while (currentNode) {
      stack.push(currentNode);

      currentNode = currentNode.left;
    }

    const node = stack.pop();
    result.push(node.value);

    currentNode = node.right;
  }

  console.log(result);
}

// inorderTreeTraversal(tree);

function postorderTreeTraversal(tree: any) {
  let currentNode: any = tree;
  const result: any[] = [];
  let lastVisitedNode: any;
  const stack: any[] = [];

  while (currentNode || stack.length > 0) {
    while (currentNode) {
      stack.push(currentNode);
      currentNode = currentNode.left;
    }

    const node = stack[stack.length - 1];

    if (node.right && node.right !== lastVisitedNode) {
      currentNode = node.right;
    } else {
      const poppedNode = stack.pop();
      lastVisitedNode = poppedNode;

      result.push(poppedNode.value);
    }
  }

  console.log(result);

  return result;
}

postorderTreeTraversal(tree);

function preorderTreeTraversalRecursive(node: any) {
  console.log(node.value);

  if (node.left) {
    preorderTreeTraversalRecursive(node.left);
  }

  if (node.right) {
    preorderTreeTraversalRecursive(node.right);
  }
}

// preorderTreeTraversalRecursive(tree);

function inorderTreeTraversalRecursive(node: any) {
  if (node.left) {
    inorderTreeTraversalRecursive(node.left);
  }

  console.log(node.value);

  if (node.right) {
    inorderTreeTraversalRecursive(node.right);
  }
}

// inorderTreeTraversal(tree);

function postorderTreeTraversalRecursive(node: any) {
  if (node.left) {
    postorderTreeTraversalRecursive(node.left);
  }

  if (node.right) {
    postorderTreeTraversalRecursive(node.right);
  }

  console.log(node.value);
}

// postorderTreeTraversalRecursive(tree);
