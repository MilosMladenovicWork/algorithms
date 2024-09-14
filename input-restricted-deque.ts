class InputRestrictedDeque {
  doublyLinkedList: DoublyLinkedList;

  constructor() {
    this.doublyLinkedList = new DoublyLinkedList();
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

  dequeueFromEnd() {
    if (this.doublyLinkedList.isEmpty()) {
      throw new Error("Deque is empty");
    }

    const removedNode = this.doublyLinkedList.removeFromTail()!;

    return removedNode.data;
  }

  isEmpty() {
    return this.doublyLinkedList.isEmpty();
  }
}

class DoublyLinkedList {
  head: DoublyLinkedListNode | null;
  tail: DoublyLinkedListNode | null;
  size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  addToTail(value: any) {
    const node = new DoublyLinkedListNode(value);

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

class DoublyLinkedListNode {
  data: any;
  prev: DoublyLinkedListNode | null;
  next: DoublyLinkedListNode | null;

  constructor(data: any) {
    this.data = data;
    this.next = null;
    this.prev = null;
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
