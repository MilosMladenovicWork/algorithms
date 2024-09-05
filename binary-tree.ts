class BinaryTree{
  root: BinaryTreeNode;

  constructor(rootNode: BinaryTreeNode){
    this.root = rootNode;
  }

  breadthFirstTraversal(){
    const queue: BinaryTreeNode[] = [this.root];

    while(queue.length > 0){
      const node = queue.shift()!;

      console.log(node.data);

      if(node.left){
        queue.push(node.left)
      }

      if(node.right){
        queue.push(node.right)
      }
    }
  }
}

class BinaryTreeNode {
  data: any;
  left: BinaryTreeNode | null = null;
  right: BinaryTreeNode | null = null;
  
  constructor(data: any){
    this.data = data;
  }
}

const node1 = new BinaryTreeNode(10)
const node2 = new BinaryTreeNode(20)
const node3 = new BinaryTreeNode(30)
const node4 = new BinaryTreeNode(40)
const node5 = new BinaryTreeNode(50)

node1.left = node2;
node1.right = node3;
node2.right = node4;
node3.left = node5;

const binaryTree = new BinaryTree(node1);
binaryTree.breadthFirstTraversal()