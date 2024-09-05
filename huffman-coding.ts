// type HuffmanTreeNode = {
//   priority: number;
// } & (
//   | {
//       data: {
//         character: never;
//         code: never;
//         left: HuffmanTreeNode | undefined;
//         right: HuffmanTreeNode | undefined;
//       };
//     }
//   | {
//       data: {
//         character: string;
//         code: string;
//         left: never;
//         right: never;
//       };
//     }
// );

// class HuffmanCoding {
//   data: string = "";
//   huffmanTree: HuffmanTreeNode | undefined;
//   huffmanTreeMapping: any;
//   compressedData: string = "";

//   constructor(data: string) {
//     this.data = data;
//   }

//   compress() {
//     // count character occurences
//     const characterOccurences = this.countCharacterOccurences(this.data);
//     // create huffman tree and map with character code mapping
//     const { huffmanTree, huffmanTreeMapping } =
//       this.createHuffmanTree(characterOccurences);
//     this.huffmanTree = huffmanTree;
//     this.huffmanTreeMapping = huffmanTreeMapping;
//     // convert data into compressed data using huffman tree
//     const compressedData = this.compressDataUsingHuffmanTreeMapping(
//       this.data,
//       huffmanTreeMapping
//     );

//     return compressedData;
//   }

//   decompress() {
//     // traverse huffman tree for each character from compressed data
//     let decompressedData = "";
//     let huffmanTreeNode = this.huffmanTree;
//     for (const codeCharacter of this.compressedData) {
//       if (codeCharacter === "0" && huffmanTreeNode?.data.left) {
//         huffmanTreeNode = huffmanTreeNode.data.left;
//       }
//       if (codeCharacter === "1" && huffmanTreeNode?.data.right) {
//         huffmanTreeNode = huffmanTreeNode.data.right;
//       }
//       if (huffmanTreeNode?.data.character) {
//         decompressedData += huffmanTreeNode.data.character;
//         huffmanTreeNode = this.huffmanTree;
//       }
//     }

//     return decompressedData;
//   }

//   private createHuffmanTree(characterOccurences: { [key: string]: number }) {
//     // use character occurence to construct priority queue
//     const priorityQueue = new PriorityQueue();

//     const characters = Object.keys(characterOccurences);

//     for (const character of characters) {
//       priorityQueue.enqueue({
//         priority: characterOccurences[character],
//         data: { character },
//       });
//     }
//     // use priority queue to construct huffman tree
//     let firstElement = priorityQueue.dequeue();
//     let secondElement = priorityQueue.dequeue();

//     while (firstElement && secondElement) {
//       priorityQueue.enqueue({
//         priority: firstElement.priority + secondElement.priority,
//         data: {
//           left: firstElement,
//           right: secondElement,
//         },
//       });

//       firstElement = priorityQueue.dequeue();
//       secondElement = priorityQueue.dequeue();
//     }

//     // deque only element left from priority queue
//     const huffmanTreeWithoutCodes = firstElement;
//     // assign code to each leaf node (character) and create a mapping
//     const { huffmanTree, mapping } =
//       this.assignCodesToHuffmanTreeAndCreateMapping(huffmanTreeWithoutCodes);
//     // return huffmanTree and mapping
//     return { huffmanTree, huffmanTreeMapping: mapping };
//   }

//   private countCharacterOccurences(data: string) {
//     // traverse text and count occurences
//     const occurencesPerCharacter: { [key: string]: number } = {};

//     for (const character of data) {
//       if (occurencesPerCharacter[character]) {
//         occurencesPerCharacter[character]++;
//       } else {
//         occurencesPerCharacter[character] = 1;
//       }
//     }

//     return occurencesPerCharacter;
//   }

//   private compressDataUsingHuffmanTreeMapping(
//     data: string,
//     huffmanTreeMapping: { [key: string]: string }
//   ) {
//     for (const character of data) {
//       this.compressedData += huffmanTreeMapping[character];
//     }

//     return this.compressedData;
//   }

//   private assignCodesToHuffmanTreeAndCreateMapping(
//     huffmanTree: HuffmanTreeNode,
//     currentCode: string = "",
//     mapping: { [key: string]: string } = {}
//   ) {
//     if (huffmanTree.data.character) {
//       huffmanTree.data.code = currentCode;
//       mapping[huffmanTree.data.character] = currentCode;
//     }

//     if (huffmanTree.data.left) {
//       this.assignCodesToHuffmanTreeAndCreateMapping(
//         huffmanTree.data.left,
//         currentCode + "0",
//         mapping
//       );
//     }

//     if (huffmanTree.data.right) {
//       this.assignCodesToHuffmanTreeAndCreateMapping(
//         huffmanTree.data.right,
//         currentCode + "1",
//         mapping
//       );
//     }

//     return { huffmanTree, mapping };
//   }
// }

// class PriorityQueue {
//   queue: any[] = [];

//   enqueue(value: { priority: number; data: any }) {
//     this.queue.push(value);
//     this.sort();
//   }

//   dequeue() {
//     return this.queue.shift();
//   }

//   sort() {
//     let numberOfIterationsNeeded = this.queue.length - 1;

//     while (numberOfIterationsNeeded !== 0) {
//       for (let i = 0; i < numberOfIterationsNeeded; i++) {
//         if (this.queue[i] > this.queue[i + 1]) {
//           [this.queue[i], this.queue[i + 1]] = [
//             this.queue[i + 1],
//             this.queue[i],
//           ];
//         }
//       }
//       numberOfIterationsNeeded--;
//     }
//   }
// }

class HuffmanCoding {
  text: string;
  huffmanTree: any = {};
  characterCodeMapping: { [key: string]: string } = {};
  compressedText: string = "";

  constructor(text: string) {
    this.text = text;
  }

  compress() {
    // count occurences of characters
    const characterOccurences = this.countCharacterOccurences(this.text);
    // construct huffman tree with codes and character-code mappings
    this.constructHuffmanTreeAndCharacterCodeMapping(characterOccurences);

    this.compressText(this.text, this.huffmanTree);
  }

  decompress() {
    let decompressedData = "";

    let currentNode = this.huffmanTree;
    console.log(this.characterCodeMapping);

    for (let i = 0; i < this.compressedText.length; i++) {
      if (this.compressedText[i] === "0") {
        currentNode = currentNode.data.left;
      }

      if (this.compressedText[i] === "1") {
        currentNode = currentNode.data.right;
      }
      if (currentNode.data.character) {
        decompressedData += currentNode.data.character;
        currentNode = this.huffmanTree;
      }
    }

    return decompressedData;

    // traverse tree using compressed data
  }

  compressText(text: string, huffmanTree: any) {
    for (let i = 0; i < text.length; i++) {
      this.compressedText += this.characterCodeMapping[text[i]];
    }

    return this.compressedText;
  }

  countCharacterOccurences(text: string) {
    const occurences: { [key: string]: number } = {};
    for (const character of text) {
      if (occurences[character]) {
        occurences[character]++;
      } else {
        occurences[character] = 1;
      }
    }

    return occurences;
  }

  private constructHuffmanTreeAndCharacterCodeMapping(characterOccurences: {
    [key: string]: number;
  }) {
    const priorityQueue = new PriorityQueue();

    for (const character in characterOccurences) {
      if (characterOccurences.hasOwnProperty(character)) {
        priorityQueue.enqueue(characterOccurences[character], {
          character,
          occurences: characterOccurences[character],
        });
      }
    }

    while (!priorityQueue.isEmpty()) {
      const node1 = priorityQueue.dequeue();
      const node2 = priorityQueue.dequeue();

      if (node1 && node2) {
        priorityQueue.enqueue(node1.priority + node2.priority, {
          left: node1,
          right: node2,
        });
      } else if (node1) {
        if (node1.data.character) {
          priorityQueue.enqueue(node1.priority, {
            left: node1,
          });
        } else {
          priorityQueue.enqueue(node1.priority, node1.data);
        }

        break;
      }
    }

    const huffmanTreeWithoutCodes = priorityQueue.dequeue();

    this.assignCodesToHuffmanTree(huffmanTreeWithoutCodes);

    this.huffmanTree = huffmanTreeWithoutCodes;
  }

  private assignCodesToHuffmanTree(huffmanTree: any, currentCode: string = "") {
    if (huffmanTree.data.left) {
      this.assignCodesToHuffmanTree(huffmanTree.data.left, currentCode + "0");
    }

    if (huffmanTree.data.right) {
      this.assignCodesToHuffmanTree(huffmanTree.data.right, currentCode + "1");
    }

    if (huffmanTree.data.character) {
      huffmanTree.data.code = currentCode;
      this.characterCodeMapping[huffmanTree.data.character] = currentCode;
    }
  }
}

class PriorityQueue {
  queue: any[] = [];

  enqueue(priority: number, data: any) {
    this.queue.push({ priority, data });
    this.sort();
  }

  dequeue() {
    return this.queue.shift();
  }

  isEmpty() {
    return this.queue.length === 0;
  }

  sort() {
    let numberOfIterationsNeeded = this.queue.length - 1;

    while (numberOfIterationsNeeded !== 0) {
      for (let i = 0; i < numberOfIterationsNeeded; i++) {
        if (this.queue[i] > this.queue[i + 1]) {
          [this.queue[i], this.queue[i + 1]] = [
            this.queue[i + 1],
            this.queue[i],
          ];
        }
      }
      numberOfIterationsNeeded--;
    }
  }
}

const huffmanCoding = new HuffmanCoding(
  "Text that I want to compress so I can transport it"
);

console.log(huffmanCoding.compress());

console.log(huffmanCoding.decompress());
