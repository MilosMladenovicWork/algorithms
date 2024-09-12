class SinglyLinkedList {
  head: SinglyLinkedListNode | null;
  constructor() {
    this.head = null;
  }

  insertAtStart(value: number) {
    const node = new SinglyLinkedListNode(value);

    node.next = this.head;

    this.head = node;

    return this;
  }

  insertAtEnd(value: number) {
    let lastNode = this.head;

    this.traverse((currentNode) => {
      if (currentNode.next === null) {
        lastNode = currentNode;
      }
    });

    const node = new SinglyLinkedListNode(value);

    if (lastNode === null) {
      this.head = node;
    } else {
      lastNode.next = node;
    }

    return this;
  }

  removeFromStart() {
    let nodeToBeRemoved = this.head;

    if (nodeToBeRemoved !== null) {
      this.head = nodeToBeRemoved.next;
    }

    return nodeToBeRemoved;
  }

  removeFromEnd() {
    let nodeBeforeNodeToBeRemoved: SinglyLinkedListNode | null = null;
    let nodeToBeRemoved = this.head;

    this.traverse((node) => {
      if (node.next === null) {
        nodeToBeRemoved = node;
      } else {
        nodeBeforeNodeToBeRemoved = node;
      }
    });

    if (nodeToBeRemoved === null) {
      return null;
    }

    if (nodeToBeRemoved === this.head) {
      this.head = null;
    } else {
      (nodeBeforeNodeToBeRemoved as unknown as SinglyLinkedListNode).next =
        null;
    }

    return nodeToBeRemoved;
  }

  traverse(callback: (node: SinglyLinkedListNode) => void) {
    let currentNode = this.head;
    while (currentNode) {
      callback(currentNode);

      currentNode = currentNode.next;
    }
  }
}

class SinglyLinkedListNode {
  next: SinglyLinkedListNode | null;
  value: number;

  constructor(value: number) {
    this.next = null;
    this.value = value;
  }
}

const linkedList = new SinglyLinkedList();

linkedList.insertAtStart(100);
console.log(linkedList);
linkedList.insertAtEnd(0);
linkedList.insertAtEnd(1);
linkedList.insertAtEnd(2);
console.log(linkedList);
linkedList.insertAtStart(10);
console.log(linkedList);
console.log(linkedList.removeFromEnd());
console.log(linkedList.removeFromEnd());
console.log(linkedList.removeFromEnd());
console.log(linkedList.removeFromEnd());
console.log(linkedList.removeFromEnd());
