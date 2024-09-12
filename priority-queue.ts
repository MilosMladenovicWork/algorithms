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
    return this.minHeap.removeMin();
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
    if (this.array.length === 0) {
      return null;
    }

    [this.array[0], this.array[this.array.length - 1]] = [
      this.array[this.array.length - 1],
      this.array[0],
    ];

    const minValue = this.array.pop()!;

    this.heapifyDown(0);

    return minValue;
  }

  private heapifyUp(index: number) {
    let currentIndex = index;
    while (
      currentIndex > 0 &&
      this.array[currentIndex] < this.array[Math.floor((currentIndex - 1) / 2)]
    ) {
      [
        this.array[currentIndex],
        this.array[Math.floor((currentIndex - 1) / 2)],
      ] = [
        this.array[Math.floor((currentIndex - 1) / 2)],
        this.array[currentIndex],
      ];

      currentIndex = Math.floor((currentIndex - 1) / 2);
    }
  }

  private heapifyDown(index: number) {
    const leftChild = 2 * index + 1;
    const rightChild = 2 * index + 2;
    let smallestValueIndex = index;

    if (
      leftChild < this.array.length &&
      this.array[leftChild] < this.array[smallestValueIndex]
    ) {
      smallestValueIndex = leftChild;
    }

    if (
      rightChild < this.array.length &&
      this.array[rightChild] < this.array[smallestValueIndex]
    ) {
      smallestValueIndex = rightChild;
    }

    if (smallestValueIndex !== index) {
      [this.array[index], this.array[smallestValueIndex]] = [
        this.array[smallestValueIndex],
        this.array[index],
      ];
      this.heapifyDown(smallestValueIndex);
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
