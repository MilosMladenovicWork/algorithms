class Queue {
  list: QueueLinkedList;

  constructor() {
    this.list = new QueueLinkedList();
  }

  enqueue(value: any) {
    this.list.addToTail(value);

    return this;
  }

  dequeue() {
    return this.list.removeFromHead();
  }

  printQueue() {
    this.list.traverse((node) => console.log(node.data));
  }
}

class QueueLinkedList {
  head: QueueLinkedListNode | null;
  tail: QueueLinkedListNode | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  addToTail(data: any) {
    const node = new QueueLinkedListNode(data);

    if (this.tail) {
      this.tail.next = node;
    }

    this.tail = node;

    if (!this.head) {
      this.head = node;
    }

    return this;
  }

  removeFromHead() {
    const head = this.head;
    const tail = this.tail;

    if (!head) {
      return head;
    }

    this.head = head.next;

    if (head === tail) {
      this.tail = null;
    }

    return head.data;
  }

  getHead() {
    if (this.head) {
      return this.head.data;
    }

    return this.head;
  }

  traverse(callback: (node: QueueLinkedListNode) => void) {
    let currentNode = this.head;

    while (currentNode) {
      callback(currentNode);
      currentNode = currentNode.next;
    }
  }
}

class QueueLinkedListNode {
  data: any;
  next: QueueLinkedListNode | null;

  constructor(data: any) {
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
