class CircularStaticArray {
  capacity: number;
  array: (number | undefined)[];
  startIndex: number;
  endIndex: number;
  numberOfElements: number;

  constructor(capacity: number) {
    if (capacity < 1) {
      throw Error("Capacity must be greater than 0");
    }
    this.capacity = capacity;
    this.array = new Array(capacity);
    this.startIndex = 0;
    this.endIndex = capacity === 1 ? 0 : 1;
    this.numberOfElements = 0;
  }

  push(value: number) {
    if (this.isFull()) {
      throw Error("Array full");
    }

    this.array[this.endIndex] = value;

    this.endIndex = this.getNextEndIndex();

    this.numberOfElements += 1;

    return this;
  }

  unshift(value: number) {
    if (this.isFull()) {
      throw Error("Array full");
    }

    this.array[this.startIndex] = value;

    this.startIndex = this.getNextStartIndex();

    this.numberOfElements += 1;

    return this;
  }

  pop() {
    if (this.isEmpty()) {
      return;
    }

    this.endIndex = this.getPrevEndIndex();

    const value = this.array[this.endIndex];

    this.array[this.endIndex] = undefined;

    this.numberOfElements -= 1;

    return value;
  }

  shift() {
    if (this.isEmpty()) {
      return;
    }

    this.startIndex = this.getPrevStartIndex();

    const value = this.array[this.startIndex];

    this.array[this.startIndex] = undefined;

    this.numberOfElements -= 1;

    return value;
  }

  private isEmpty() {
    return this.numberOfElements === 0;
  }

  private isFull() {
    return this.numberOfElements === this.capacity;
  }

  private getNextEndIndex() {
    return (this.endIndex + 1) % this.capacity;
  }

  private getNextStartIndex() {
    return (this.startIndex - 1 + this.capacity) % this.capacity;
  }

  private getPrevEndIndex() {
    return (this.endIndex - 1 + this.capacity) % this.capacity;
  }

  private getPrevStartIndex() {
    return (this.startIndex + 1) % this.capacity;
  }
}

const circularStaticArray = new CircularStaticArray(4);

circularStaticArray.push(10);
console.log(circularStaticArray);
circularStaticArray.unshift(15);
console.log(circularStaticArray);
circularStaticArray.push(20);
console.log(circularStaticArray);
circularStaticArray.push(25);
console.log(circularStaticArray);
circularStaticArray.pop();
console.log(circularStaticArray);
circularStaticArray.shift();
console.log(circularStaticArray);
circularStaticArray.shift();
console.log(circularStaticArray);
circularStaticArray.shift();
console.log(circularStaticArray);
