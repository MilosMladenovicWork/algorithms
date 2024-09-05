class ArrayCircularDeque<T> {
  array: T[];
  front = -1;
  rear = -1;

  constructor(size: number) {
    if (size <= 0) {
      throw new Error("invalid deque size");
    }

    this.array = new Array(size);
  }

  frontEnqueue(value: T) {
    if (this.front === -1) {
      this.front = 0;
      this.rear = 0;
      this.array[this.front] = value;
    } else {
      const newFrontIndex =
        this.front - 1 < 0 ? this.array.length - 1 : this.front - 1;

      if (newFrontIndex === this.rear) {
        console.log("deque full");
      } else {
        this.front = newFrontIndex;
        this.array[this.front] = value;
      }
    }

    return this;
  }

  rearEnqueue(value: T) {
    if (this.front === -1) {
      this.front = 0;
      this.rear = 0;
      this.array[this.rear] = value;
    } else {
      const newRearIndex = (this.rear + 1) % this.array.length;

      if (newRearIndex === this.front) {
        console.log("deque full");
      } else {
        this.rear = newRearIndex;
        this.array[newRearIndex] = value;
      }
    }

    return this;
  }

  frontDequeue() {
    if (this.front === -1) {
      return null;
    } else {
      const dequeuedData = this.array[this.front];

      if (this.front === this.rear) {
        this.front = -1;
        this.rear = -1;
      } else {
        this.front = (this.front + 1) % this.array.length;
      }

      return dequeuedData;
    }
  }
}

const acd = new ArrayCircularDeque(3);

acd.rearEnqueue(1).rearEnqueue(2).rearEnqueue(3);

console.log(acd.frontDequeue());
console.log(acd.frontDequeue());
console.log(acd.frontDequeue());
console.log(acd.frontDequeue());

console.log(acd);
