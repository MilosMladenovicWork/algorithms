class CircularQueueNode<T> {
  data: T;
  next: CircularQueueNode<T> | null;
  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

class CircularQueue<T> {
  front: CircularQueueNode<T> | null;
  rear: CircularQueueNode<T> | null;

  constructor() {
    this.front = null;
    this.rear = null;
  }

  enqueue(value: T) {
    const newNode = new CircularQueueNode(value);

    if (!this.front || !this.rear) {
      newNode.next = newNode;
      this.front = newNode;
      this.rear = newNode;
    } else {
      newNode.next = this.front;
      this.rear.next = newNode;
      this.rear = newNode;
    }

    return this;
  }

  dequeue() {
    if (!this.front || !this.rear) {
      return null;
    } else {
      if (this.front === this.rear) {
        const dequedNode = this.front;

        this.front = null;
        this.rear = null;

        return dequedNode.data;
      } else {
        let currentNode: CircularQueueNode<T> = this.front;

        while (currentNode.next !== this.rear) {
          if (!currentNode.next) {
            throw Error("Broken circular queue");
          }
          currentNode = currentNode.next;
        }

        const dequeuedData = currentNode.next.data;

        currentNode.next = this.front;
        this.rear = currentNode;

        return dequeuedData;
      }
    }
  }
}

const cq = new CircularQueue();

cq.enqueue(1).enqueue(2).enqueue(3).enqueue(4).enqueue(5);

console.log(cq.dequeue());
console.log(cq.dequeue());

console.log(cq);
