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

    const maxNode = this.array.pop();

    this.heapifyDown(0);

    return maxNode;
  }

  heapifyUp(index: number) {
    let currentIndex = index;

    const parentIndex = Math.floor((currentIndex - 1) / 2);

    while (
      currentIndex > 0 &&
      this.array[currentIndex] > this.array[parentIndex]
    ) {
      this.swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
    }
  }

  heapifyDown(index: number) {
    let highestValueIndex = index;
    let leftChildIndex = 2 * highestValueIndex + 1;
    let rightChildIndex = 2 * highestValueIndex + 2;

    if (
      leftChildIndex < this.array.length &&
      this.array[highestValueIndex] < this.array[leftChildIndex]
    ) {
      highestValueIndex = leftChildIndex;
    }

    if (
      rightChildIndex < this.array.length &&
      this.array[highestValueIndex] < this.array[rightChildIndex]
    ) {
      highestValueIndex = rightChildIndex;
    }

    if (highestValueIndex !== index) {
      this.swap(index, highestValueIndex);
      this.heapifyDown(highestValueIndex);
    }
  }

  swap(index1: number, index2: number) {
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
