class OutputRestrictedDeque {
  doublyLinkedList: ORDDoublyLinkedList;

  constructor() {
    this.doublyLinkedList = new ORDDoublyLinkedList();
  }

  enqueueAtStart(value: any) {
    this.doublyLinkedList.addToHead(value);

    return this;
  }

  enqueueAtEnd(value: any) {
    this.doublyLinkedList.addToTail(value);

    return this;
  }

  dequeueFromStart() {
    if (this.doublyLinkedList.isEmpty()) {
      throw new Error("Deque is empty");
    }

    const removedNode = this.doublyLinkedList.removeFromHead()!;

    return removedNode.data;
  }

  isEmpty() {
    return this.doublyLinkedList.isEmpty();
  }
}

class ORDDoublyLinkedList {
  head: ORDDoublyLinkedListNode | null;
  tail: ORDDoublyLinkedListNode | null;
  size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  addToTail(value: any) {
    const node = new ORDDoublyLinkedListNode(value);

    if (this.tail) {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    } else {
      this.head = node;
      this.tail = node;
    }

    this.size++;

    return this;
  }

  addToHead(value: any) {
    const node = new ORDDoublyLinkedListNode(value);

    if (this.head) {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    } else {
      this.head = node;
      this.tail = node;
    }

    this.size++;

    return this;
  }

  removeFromHead() {
    if (this.isEmpty()) {
      throw new Error("Doubly linked list empty");
    }

    const node = this.head;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head!.next!.prev = null;

      this.head = this.head!.next;
    }

    this.size--;

    return node;
  }

  removeFromTail() {
    if (this.isEmpty()) {
      throw new Error("Doubly linked list empty");
    }

    const node = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail!.prev!.next = null;

      this.tail = this.tail!.prev;
    }

    this.size--;

    return node;
  }

  isEmpty() {
    return this.size === 0;
  }
}

class ORDDoublyLinkedListNode {
  data: any;
  prev: ORDDoublyLinkedListNode | null;
  next: ORDDoublyLinkedListNode | null;

  constructor(data: any) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

const outputRestrictedDeque = new OutputRestrictedDeque();

outputRestrictedDeque
  .enqueueAtStart(1)
  .enqueueAtStart(2)
  .enqueueAtStart(3)
  .enqueueAtEnd(4)
  .enqueueAtEnd(5);

console.log(outputRestrictedDeque);

console.log(outputRestrictedDeque.dequeueFromStart());
console.log(outputRestrictedDeque.dequeueFromStart());
console.log(outputRestrictedDeque.dequeueFromStart());
console.log(outputRestrictedDeque.dequeueFromStart());
console.log(outputRestrictedDeque.dequeueFromStart());
console.log(outputRestrictedDeque.dequeueFromStart());
