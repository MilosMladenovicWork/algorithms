class MaxHeap {
  array: number[];

  constructor() {
    this.array = [];
  }

  add(value: number) {
    this.array.push(value);

    this.heapifyUp(this.array.length - 1);

    return this;
  }

  removeMax() {
    if (this.array.length === 0) {
      return null;
    }

    this.swap(0, this.array.length - 1);

    const value = this.array.pop()!;

    this.heapifyDown(0);

    return value;
  }

  private heapifyDown(index: number) {
    let greatestValueIndex = index;
    const leftChildIndex = greatestValueIndex * 2 + 1;
    const rightChildIndex = greatestValueIndex * 2 + 1;

    if (
      leftChildIndex < this.array.length &&
      this.array[leftChildIndex] > this.array[greatestValueIndex]
    ) {
      greatestValueIndex = leftChildIndex;
    }

    if (
      rightChildIndex < this.array.length &&
      this.array[rightChildIndex] > this.array[greatestValueIndex]
    ) {
      greatestValueIndex = rightChildIndex;
    }

    if (greatestValueIndex !== index) {
      this.swap(index, greatestValueIndex);
      this.heapifyDown(greatestValueIndex);
    }
  }

  private heapifyUp(index: number) {
    let currentIndex = index;
    let parentIndex = Math.floor((currentIndex - 1) / 2);

    while (
      currentIndex > 0 &&
      this.array[currentIndex] > this.array[parentIndex]
    ) {
      this.swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
      parentIndex = Math.floor((currentIndex - 1) / 2);
    }
  }

  private swap(index1: number, index2: number) {
    [this.array[index1], this.array[index2]] = [
      this.array[index2],
      this.array[index1],
    ];
  }
}

const maxHeap = new MaxHeap();

maxHeap.add(100);
maxHeap.add(10);
maxHeap.add(1);
console.log(maxHeap);
console.log(maxHeap.removeMax());
console.log(maxHeap.removeMax());
console.log(maxHeap.removeMax());
console.log(maxHeap);
