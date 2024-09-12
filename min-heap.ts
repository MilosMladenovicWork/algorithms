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
    if (this.array.length === 0) {
      return null;
    }

    this.swap(0, this.array.length - 1);

    const minNode = this.array.pop();

    this.heapifyDown(0);

    return minNode;
  }

  heapifyUp(index: number) {
    let currentIndex = index;

    const parentIndex = Math.floor((currentIndex - 1) / 2);

    while (
      currentIndex > 0 &&
      this.array[currentIndex] < this.array[parentIndex]
    ) {
      this.swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
    }
  }

  heapifyDown(index: number) {
    let leastValueIndex = index;
    let leftChildIndex = 2 * leastValueIndex + 1;
    let rightChildIndex = 2 * leastValueIndex + 2;

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

  swap(index1: number, index2: number) {
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
