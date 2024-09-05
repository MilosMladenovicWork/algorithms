class PriorityQueue {
  array: number[] = [];

  constructor() {
    this.array = [];
  }

  enqueue(value: number) {
    this.array.push(value);

    for (let i = Math.floor(this.array.length / 2) - 1; i >= 0; i--) {
      this.heapify(this.array, i, this.array.length);
    }

    return this;
  }

  dequeue() {
    if (this.array.length === 0) {
      return 0;
    }

    [this.array[0], this.array[this.array.length - 1]] = [
      this.array[this.array.length - 1],
      this.array[0],
    ];

    const dequeuedData = this.array.pop();

    for (let i = Math.floor(this.array.length / 2) - 1; i >= 0; i--) {
      this.heapify(this.array, i, this.array.length);
    }

    return dequeuedData;
  }

  private heapify(array: number[], nodeIndex: number, heapSize: number) {
    let largestIndex = nodeIndex;
    let leftChildIndex = 2 * nodeIndex + 1;
    let rightChildIndex = 2 * nodeIndex + 2;

    if (
      leftChildIndex < heapSize &&
      array[leftChildIndex] > array[largestIndex]
    ) {
      largestIndex = leftChildIndex;
    }

    if (
      rightChildIndex < heapSize &&
      array[rightChildIndex] > array[largestIndex]
    ) {
      largestIndex = rightChildIndex;
    }

    if (largestIndex !== nodeIndex) {
      [array[largestIndex], array[nodeIndex]] = [
        array[nodeIndex],
        array[largestIndex],
      ];
      this.heapify(array, largestIndex, heapSize);
    }
  }
}

const pq = new PriorityQueue();

pq.enqueue(100).enqueue(10).enqueue(1000).enqueue(1);

console.log(pq);

console.log(pq.dequeue());
console.log(pq.dequeue());
console.log(pq.dequeue());
console.log(pq.dequeue());
