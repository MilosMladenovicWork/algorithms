class PriorityQueue {
  minHeap: MinHeap;

  constructor() {
    this.minHeap = new MinHeap();
  }

  enqueue(value: number) {
    this.minHeap.add(value);

    return this;
  }

  dequeue() {
    const node = this.minHeap.removeMin();

    if (!node) {
      return null;
    }

    return node;
  }
}

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
    this.swap(0, this.array.length - 1);
    const value = this.array.pop();

    this.heapifyDown(0);

    return value;
  }

  private heapifyUp(index: number) {
    let currentIndex = index;
    let parentIndex = Math.floor((currentIndex - 1) / 2);

    while (
      currentIndex > 0 &&
      this.array[parentIndex] > this.array[currentIndex]
    ) {
      this.swap(parentIndex, currentIndex);
      currentIndex = parentIndex;
      parentIndex = Math.floor((parentIndex - 1) / 2);
    }
  }

  private heapifyDown(index: number) {
    let leastValueIndex = index;
    const leftChildIndex = index * 2 + 1;
    const rightChildIndex = index * 2 + 2;

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
      leastValueIndex = leftChildIndex;
    }

    if (index !== leastValueIndex) {
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

const pq = new PriorityQueue();

pq.enqueue(100).enqueue(10).enqueue(1000).enqueue(1);

console.log(pq);

console.log(pq.dequeue());
console.log(pq.dequeue());
console.log(pq.dequeue());
console.log(pq.dequeue());
