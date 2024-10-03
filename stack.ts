class Stack {
  singlyLinkedList: SinglyLinkedList;
  constructor() {
    this.singlyLinkedList = new SinglyLinkedList();
  }

  push(value: any) {
    this.singlyLinkedList.addToHead(value);

    return this;
  }

  pop() {
    const node = this.singlyLinkedList.removeFromHead();

    if (!node) {
      return node;
    }

    return node.data;
  }

  peek() {
    const node = this.singlyLinkedList.getHead();

    if (!node) {
      return node;
    }

    return node.data;
  }
}

class SinglyLinkedList {
  head: SinglyLinkedListNode | null;
  constructor() {
    this.head = null;
  }

  addToHead(value: any) {
    const node = new SinglyLinkedListNode(value);

    if (!this.head) {
      this.head = node;
    } else {
      node.next = this.head;
      this.head = node;
    }

    return this;
  }

  removeFromHead() {
    if (this.isEmpty()) {
      return;
    }

    const node = this.head!;

    this.head = node.next;

    return node;
  }

  getHead() {
    return this.head;
  }

  isEmpty() {
    return !this.head;
  }
}

class SinglyLinkedListNode {
  data: any;
  next: SinglyLinkedListNode | null;
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
