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
    const visitedNode = stack.pop();

    console.log(visitedNode.value);

    if (visitedNode.right) {
      stack.push(visitedNode.right);
    }

    if (visitedNode.left) {
      stack.push(visitedNode.left);
    }
  }
}

// preorderTreeTraversal(tree);

function inorderTreeTraversal(tree: any) {
  const result: any[] = [];
  let currentNode = tree;
  let nodesToVisit: any[] = [];

  while (nodesToVisit.length > 0 || currentNode) {
    while (currentNode) {
      nodesToVisit.push(currentNode);
      currentNode = currentNode.left;
    }

    const node = nodesToVisit.pop()!;

    result.push(node);

    if (node.right) {
      currentNode = node.right;
    }
  }

  return result;
}

// console.log(inorderTreeTraversal(tree));

function postorderTreeTraversal(tree: any) {
  const result: any[] = [];
  const visitedNodes: any[] = [];
  let currentNode = tree;
  let previousNode = null;

  while (visitedNodes.length > 0 || currentNode) {
    while (currentNode) {
      visitedNodes.push(currentNode);
      currentNode = currentNode.left;
    }

    const peekedNode = visitedNodes[visitedNodes.length - 1];

    if (peekedNode.right && previousNode !== peekedNode.right) {
      currentNode = peekedNode.right;
    } else {
      const node = visitedNodes.pop();

      previousNode = node;

      result.push(node);
    }
  }

  return result;
}

// console.log(postorderTreeTraversal(tree));

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

  console.log(node);

  if (node.right) {
    inorderTreeTraversalRecursive(node.right);
  }
}

// inorderTreeTraversalRecursive(tree);

function postorderTreeTraversalRecursive(node: any) {
  if (node.left) {
    postorderTreeTraversalRecursive(node.left);
  }

  if (node.right) {
    postorderTreeTraversalRecursive(node.right);
  }

  console.log(node);
}

// postorderTreeTraversalRecursive(tree);
