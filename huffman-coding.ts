class HuffmanCoding {
  data: string;
  characterCodeMapping: { [key: string]: string };
  compressedData: string;
  huffmanTree: HuffmanTreeNode | null;

  constructor(data: string) {
    this.data = data;
    this.characterCodeMapping = {};
    this.compressedData = "";
    this.huffmanTree = null;
  }

  compress() {
    const characterOccurences = this.getCharacterOccurences(this.data);

    this.createHuffmanTree(characterOccurences);

    return this;
  }

  private createHuffmanTree(characterOccurences: { [key: string]: number }) {
    const priorityQueue = new HCPriorityQueue();

    Object.keys(characterOccurences).forEach((character) => {
      priorityQueue.enqueue({
        data: {
          character: character,
          occurences: characterOccurences[character],
        },
        value: characterOccurences[character],
      });
    });

    let node1 = priorityQueue.dequeue();
    let node2 = priorityQueue.dequeue();

    while (node1) {
      if (node1 && node2) {
        priorityQueue.enqueue({
          data: {
            occurences: node1.data.occurences + node2.data.occurences,
            leftNode: node1,
            rightNode: node2,
          },
          value: node1.data.occurences + node2.data.occurences,
        });

        node1 = priorityQueue.dequeue();
        node2 = priorityQueue.dequeue();
      } else if (node1 && !node2) {
        if (node1.data.character) {
          priorityQueue.enqueue({
            data: {
              occurences: node1.data.occurences,
              leftNode: node1,
            },
            value: node1.data.occurences,
          });
        } else {
          priorityQueue.enqueue(node1);
        }
        node1 = null;
      }
    }

    const huffmanTree = priorityQueue.dequeue();

    if (huffmanTree) {
      this.assignCodesToHuffmanTreeAndCreateCharacterCodeMappings(huffmanTree);
    }

    this.huffmanTree = huffmanTree;

    for (let i = 0; i < this.data.length; i++) {
      this.compressedData += this.characterCodeMapping[this.data[i]];
    }

    return this;
  }

  private assignCodesToHuffmanTreeAndCreateCharacterCodeMappings(
    huffmanTreeNode: HuffmanTreeNode,
    code: string = ""
  ) {
    if (huffmanTreeNode.data.leftNode) {
      this.assignCodesToHuffmanTreeAndCreateCharacterCodeMappings(
        huffmanTreeNode.data.leftNode,
        code + "0"
      );
    }

    if (huffmanTreeNode.data.rightNode) {
      this.assignCodesToHuffmanTreeAndCreateCharacterCodeMappings(
        huffmanTreeNode.data.rightNode,
        code + "1"
      );
    }

    if (huffmanTreeNode.data.character) {
      huffmanTreeNode.code = code;
      this.characterCodeMapping[huffmanTreeNode.data.character] = code;
    }
  }

  private getCharacterOccurences(data: string) {
    const characterOccurences: { [key: string]: number } = {};
    for (let i = 0; i < data.length; i++) {
      if (!characterOccurences[data[i]]) {
        characterOccurences[data[i]] = 1;
      } else {
        characterOccurences[data[i]] += 1;
      }
    }

    return characterOccurences;
  }

  decompress() {
    let currentNode = this.huffmanTree;
    let decompressedData = "";

    for (let i = 0; i < this.compressedData.length; i++) {
      if (currentNode) {
        if (this.compressedData[i] === "0") {
          currentNode = currentNode.data.leftNode!;
        } else if (this.compressedData[i] === "1") {
          currentNode = currentNode.data.rightNode!;
        }

        if (currentNode.data.character) {
          decompressedData += currentNode.data.character;
          currentNode = this.huffmanTree;
        }
      }
    }

    return decompressedData;
  }
}

type HuffmanTreeNode = {
  code?: string;
  data: {
    occurences: number;
    leftNode?: HuffmanTreeNode;
    rightNode?: HuffmanTreeNode;
    character?: string;
  };
};

class HCPriorityQueue {
  minHeap: HCMinHeap;

  constructor() {
    this.minHeap = new HCMinHeap();
  }

  enqueue(value: { data: any; value: number }) {
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

class HCMinHeap {
  array: { data: any; value: number }[];

  constructor() {
    this.array = [];
  }

  add(value: { data: any; value: number }) {
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
      this.array[parentNodeIndex].value > this.array[currentIndex].value
    ) {
      this.swap(parentNodeIndex, currentIndex);
      currentIndex = parentNodeIndex;
    }
  }

  private heapifyDown(index: number) {
    const leftChildIndex = index * 2 + 1;
    const rightChildIndex = index * 2 + 2;
    let leastValueIndex = index;

    if (
      leftChildIndex < this.array.length &&
      this.array[leastValueIndex].value > this.array[leftChildIndex].value
    ) {
      leastValueIndex = leftChildIndex;
    }
    if (
      rightChildIndex < this.array.length &&
      this.array[leastValueIndex].value > this.array[rightChildIndex].value
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

const huffmanCoding = new HuffmanCoding("lossless");

console.log(huffmanCoding.compress());

console.log(huffmanCoding.decompress());
