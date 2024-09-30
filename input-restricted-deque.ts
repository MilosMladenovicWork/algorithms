class InputRestrictedDeque {
  list: DoublyLinkedList;
  constructor() {
    this.list = new DoublyLinkedList();
  }

  enqueueAtEnd(value: number) {
    this.list.addToTail(value);
    return this;
  }

  dequeueFromStart() {
    const node = this.list.removeFromHead();

    if (!node) {
      return null;
    }

    return node.data;
  }

  dequeueFromEnd() {
    const node = this.list.removeFromTail();

    if (!node) {
      return null;
    }

    return node.data;
  }
}

class DoublyLinkedList {
  head: DoublyLinkedListNode | null;
  tail: DoublyLinkedListNode | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  addToTail(value: number) {
    const node = new DoublyLinkedListNode(value);

    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;
    }

    const tailNode = this.tail;

    tailNode.next = node;
    node.prev = tailNode;

    this.tail = node;

    return this;
  }

  removeFromHead() {
    if (!this.head || !this.tail) {
      return null;
    }

    const headNode = this.head;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = headNode.next!;
      this.head.prev = null;
    }

    return headNode;
  }

  removeFromTail() {
    if (!this.head || !this.tail) {
      return null;
    }

    const tailNode = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = tailNode.prev!;
      this.tail.next = null;
    }

    return tailNode;
  }
}

class DoublyLinkedListNode {
  data: number;
  prev: DoublyLinkedListNode | null;
  next: DoublyLinkedListNode | null;

  constructor(data: number) {
    this.prev = null;
    this.next = null;
    this.data = data;
  }
}

const inputRestrictedDeque = new InputRestrictedDeque();

inputRestrictedDeque
  .enqueueAtEnd(1)
  .enqueueAtEnd(2)
  .enqueueAtEnd(3)
  .enqueueAtEnd(4)
  .enqueueAtEnd(5);

console.log(inputRestrictedDeque);

console.log(inputRestrictedDeque.dequeueFromEnd());
console.log(inputRestrictedDeque.dequeueFromEnd());
console.log(inputRestrictedDeque.dequeueFromStart());
console.log(inputRestrictedDeque.dequeueFromStart());
console.log(inputRestrictedDeque.dequeueFromStart());
console.log(inputRestrictedDeque.dequeueFromStart());
