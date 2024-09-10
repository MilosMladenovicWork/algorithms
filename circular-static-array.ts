class CircularStaticArray {
  private capacity: number;
  private startIndex: number;
  private endIndex: number;
  private array: any[];
  private size: number;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.array = new Array(this.capacity);
    this.size = 0;
    this.startIndex = 0;
    this.endIndex = 1 % this.capacity;
  }

  push(value: any) {
    if (this.size === this.capacity) {
      throw Error("Array full");
    }

    this.array[this.endIndex] = value;
    this.endIndex = this.getNextEndIndex();
    this.size++;
  }

  pop() {
    if (this.size === 0) {
      throw Error("Array empty");
    }

    const value = this.array[this.getPrevEndIndex()];

    this.array[this.getPrevEndIndex()] = undefined;

    this.endIndex = this.getPrevEndIndex();

    this.size--;

    return value;
  }

  shift() {
    if (this.size === 0) {
      throw Error("Array empty");
    }

    const value = this.array[this.getPrevStartIndex()];

    this.array[this.getPrevStartIndex()] = undefined;

    this.startIndex = this.getPrevStartIndex();

    this.size--;

    return value;
  }

  unshift(value: any) {
    if (this.size === this.capacity) {
      throw Error("Array full");
    }

    this.array[this.startIndex] = value;

    this.startIndex = this.getNextStartIndex();

    this.size++;
  }

  private getNextEndIndex() {
    return (this.endIndex + 1) % this.capacity;
  }

  private getPrevEndIndex() {
    return Math.abs((this.endIndex - 1 + this.capacity) % this.capacity);
  }

  private getNextStartIndex() {
    return Math.abs((this.startIndex - 1 + this.capacity) % this.capacity);
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
