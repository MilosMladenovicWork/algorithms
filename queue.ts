class Queue {
  linkedList: LinkedList;
  constructor() {
    this.linkedList = new LinkedList();
  }

  enqueue(value: number) {
    this.linkedList.addToTail(value);
    return this;
  }

  dequeue() {
    return this.linkedList.removeFromHead();
  }

  printQueue() {
    this.linkedList.traverse((node) => {
      console.log(node.data);
    });
  }
}

class LinkedList {
  head: LinkedListNode | null;
  tail: LinkedListNode | null;
  constructor() {
    this.head = null;
    this.tail = null;
  }

  addToTail(value: number) {
    const node = new LinkedListNode(value);
    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }

    return this;
  }

  removeFromHead() {
    if (!this.head) {
      return this.head;
    }

    const node = this.head;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = node.next;
    }

    return node;
  }

  traverse(callback: (node: LinkedListNode) => void) {
    let currentNode = this.head;

    while (currentNode !== null) {
      callback(currentNode);
      currentNode = currentNode.next;
    }
  }
}

class LinkedListNode {
  data: number;
  next: LinkedListNode | null;

  constructor(data: number) {
    this.data = data;
    this.next = null;
  }
}

const queue = new Queue();

queue.enqueue(10).enqueue(100).enqueue(1000);
console.log(queue.printQueue());
console.log(queue);
console.log(queue);

queue.dequeue();
console.log(queue);
queue.dequeue();
console.log(queue);
queue.dequeue();
console.log(queue);

console.log(queue.dequeue());
