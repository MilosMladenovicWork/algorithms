class Stack {
  private list: LinkedList;

  constructor() {
    this.list = new LinkedList();
  }

  push(value: any) {
    return this.list.addToHead(value);
  }

  pop() {
    return this.list.removeFromHead();
  }

  peek() {
    return this.list.getHead();
  }
}

class LinkedList {
  head: LinkedListNode | null;

  constructor() {
    this.head = null;
  }

  addToHead(data: any) {
    const node = new LinkedListNode(data);

    const head = this.head;

    if (!this.head) {
      this.head = node;
    }

    node.next = head;

    this.head = node;

    return this;
  }

  removeFromHead() {
    const head = this.head;

    if (!head) {
      return head;
    }

    this.head = head.next;

    return head.data;
  }

  getHead() {
    if (this.head) {
      return this.head.data;
    }

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
