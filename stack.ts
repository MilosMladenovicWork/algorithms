class Stack {
  size: number;
  linkedList: LinkedList;

  constructor() {
    this.linkedList = new LinkedList();
    this.size = 0;
  }

  push(value: any) {
    this.linkedList.appendToHead(value);

    return this;
  }

  pop() {
    if (this.linkedList.isEmpty()) {
      throw new Error("Stack is empty");
    }

    const removedNode = this.linkedList.removeFromHead();

    return removedNode ? removedNode.data : removedNode;
  }

  peek() {
    const node = this.linkedList.getHead();

    return node ? node.data : node;
  }

  isEmpty() {
    return this.size === 0;
  }
}

class LinkedList {
  head: LinkedListNode | null;
  size: number;
  constructor() {
    this.head = null;
    this.size = 0;
  }

  isEmpty() {
    return this.size === 0;
  }

  appendToHead(value: any) {
    const node = new LinkedListNode(value);

    node.next = this.head;

    this.head = node;

    this.size++;

    return this;
  }

  removeFromHead() {
    if (this.isEmpty()) {
      throw new Error("Linked list empty");
    }

    const removedNode = this.head;

    if (this.head) {
      this.head = this.head.next;
    }

    this.size--;

    return removedNode;
  }

  getHead() {
    return this.head;
  }
}

class LinkedListNode {
  data: any;
  next: LinkedListNode | null;

  constructor(data: any) {
    this.data = data;
    this.next = null;
  }
}

const stack = new Stack();

stack.push(10);
stack.push(9);
stack.push(100);

console.log(stack.pop());
console.log(stack.peek());
