class QueueNode<T> {
  data: T;
  next: QueueNode<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

class Queue<T> {
  front: QueueNode<T> | null;
  rear: QueueNode<T> | null;

  constructor() {
    this.front = null;
    this.rear = null;
  }

  enqueue(data: T) {
    const node = new QueueNode(data);

    if (!this.rear) {
      this.front = node;
      this.rear = node;
    } else {
      this.rear.next = node;
      this.rear = node;
    }

    return this;
  }

  dequeue() {
    if (!this.front) {
      return null;
    }

    const node = this.front;
    const nodeData = node.data;

    if (this.front === this.rear) {
      this.front = null;
      this.rear = null;

      return nodeData;
    }

    this.front = node.next;
    node.next = null;

    return nodeData;
  }

  peek() {
    if (!this.front) {
      return null;
    }

    return this.front.data;
  }

  isEmpty() {
    return this.front === null;
  }

  printQueue() {
    let currentNode = this.front;
    while (currentNode !== null) {
      console.log(currentNode.data);
      currentNode = currentNode.next;
    }
  }
}

const queue = new Queue();

queue.enqueue(10).enqueue(100).enqueue(1000);
console.log(queue.printQueue());
console.log(queue.front);
console.log(queue.rear);

queue.dequeue();
console.log(queue.front);
console.log(queue.rear);
queue.dequeue();
console.log(queue.front);
console.log(queue.rear);
queue.dequeue();
console.log(queue.front);
console.log(queue.rear);

console.log(queue.dequeue());
