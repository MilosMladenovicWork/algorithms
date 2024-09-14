class CircularStaticArray {
  capacity: number;
  startPointer: number;
  endPointer: number;
  size: number;
  array: any[];

  constructor(capacity: number) {
    this.capacity = capacity;
    this.startPointer = 0;
    this.endPointer = 1;
    this.size = 0;
    this.array = new Array(capacity);
  }

  push(value: any) {
    if (this.isFull()) {
      throw new Error("Array full");
    }

    this.array[this.endPointer] = value;

    this.endPointer = this.getNextEndPointer();

    this.size++;

    return this;
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error("Array empty");
    }

    this.endPointer = this.getPrevEndPointer();

    const removedValue = this.array[this.endPointer];

    this.array[this.endPointer] = undefined;

    this.size--;

    return removedValue;
  }

  unshift(value: any) {
    if (this.isFull()) {
      throw new Error("Array full");
    }

    this.array[this.startPointer] = value;

    this.startPointer = this.getNextStartPointer();

    this.size++;

    return this;
  }

  shift() {
    if (this.isEmpty()) {
      throw new Error("Array empty");
    }

    this.startPointer = this.getPrevStartPointer();

    const removedValue = this.array[this.startPointer];

    this.array[this.startPointer] = undefined;

    this.size--;

    return removedValue;
  }

  private getNextStartPointer() {
    return (this.startPointer - 1 + this.capacity) % this.capacity;
  }

  private getPrevStartPointer() {
    return (this.startPointer + 1) % this.capacity;
  }

  private getNextEndPointer() {
    return (this.endPointer + 1) % this.capacity;
  }

  private getPrevEndPointer() {
    return (this.endPointer - 1 + this.capacity) % this.capacity;
  }

  private isFull() {
    return this.capacity === this.size;
  }

  private isEmpty() {
    return this.size === 0;
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
