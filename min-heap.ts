class MinHeap {
  array: number[];

  constructor() {
    this.array = [];
  }

  add(value: number) {
    this.array.push(value);

    this.heapifyUp(this.array.length - 1);

    return this;
  }

  removeMin() {
    if (this.isEmpty()) {
      return null;
    }

    this.swap(0, this.array.length - 1);

    const value = this.array.pop();

    this.heapifyDown(0);

    return value;
  }

  isEmpty() {
    return this.array.length === 0;
  }

  private heapifyUp(index: number) {
    const parentNodeIndex = Math.floor((index - 1) / 2);
    let currentIndex = index;

    while (
      parentNodeIndex >= 0 &&
      this.array[parentNodeIndex] > this.array[index]
    ) {
      this.swap(parentNodeIndex, index);
      currentIndex = parentNodeIndex;
    }
  }

  private heapifyDown(index: number) {
    const leftChildIndex = index * 2 + 1;
    const rightChildIndex = index * 2 + 2;
    let leastValueIndex = index;

    if (
      leftChildIndex < this.array.length &&
      this.array[leastValueIndex] > this.array[leftChildIndex]
    ) {
      leastValueIndex = leftChildIndex;
    }
    if (
      rightChildIndex < this.array.length &&
      this.array[leastValueIndex] > this.array[rightChildIndex]
    ) {
      leastValueIndex = rightChildIndex;
    }

    if (leastValueIndex !== index) {
      this.swap(index, leastValueIndex);
      this.heapifyDown(leastValueIndex);
    }
  }

  private swap(index1: number, index2: number) {
    [this.array[index1], this.array[index2]] = [
      this.array[index2],
      this.array[index1],
    ];
  }
}

const heap = new MinHeap();

heap.add(100);
heap.add(10);
heap.add(1);
console.log(heap);
console.log(heap.removeMin());
console.log(heap.removeMin());
console.log(heap.removeMin());
console.log(heap);
