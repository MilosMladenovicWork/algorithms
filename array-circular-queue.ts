class ArrayCircularQueue<T> {
  array: T[];
  front = -1;
  rear = -1;

  constructor(size: number) {
    if (size <= 0) {
      throw new Error("invalid queue size");
    }
    this.array = new Array(size);
  }

  enqueue(value: T) {
    if (this.front === -1) {
      this.front = 0;
      this.rear = 0;
      this.array[this.front] = value;
    } else {
      const nextIndex = this.getNextIndex(this.rear);

      if (nextIndex === this.front) {
        console.log("queue full");
      } else {
        this.rear += 1;
        this.array[nextIndex] = value;
      }
    }
    return this;
  }

  dequeue() {
    if (this.front === -1) {
      return null;
    } else {
      const dequeuedData = this.array[this.front];

      if (this.front === this.rear) {
        this.front = -1;
        this.rear = -1;
      } else {
        this.front += 1;
      }

      return dequeuedData;
    }
  }

  private getNextIndex(index: number) {
    return (index + 1) % this.array.length;
  }
}

const acq = new ArrayCircularQueue(3);

acq.enqueue(1).enqueue(2).enqueue(3).enqueue(4).enqueue(5);

console.log(acq.dequeue());
console.log(acq.dequeue());
console.log(acq.dequeue());

console.log(acq);
