class ListNode<T> {
  data: T | null;
  next: ListNode<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

class SinglyLinkedList<T> {
  head: ListNode<T> | null = null;
  tail: ListNode<T> | null = null;

  insertAtBeginning(data: T) {
    const newNode = new ListNode(data);

    if (this.head && this.tail) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      this.head = newNode;
      this.tail = newNode;
    }

    return this;
  }

  insertAtEnd(data: T) {
    const newNode = new ListNode(data);

    if (this.head && this.tail) {
      this.tail.next = newNode;
      this.tail = newNode;
    } else {
      this.head = newNode;
      this.tail = newNode;
    }

    return this;
  }

  insertBeforeNode(node: ListNode<T>, data: T) {
    let beforeNode: ListNode<T> | null = null;
    let currentNode = this.head;
    let foundNode: ListNode<T> | null = null;

    while (foundNode === null && currentNode !== null) {
      if (node === currentNode) {
        foundNode = currentNode;
        break;
      }

      beforeNode = currentNode;
      currentNode = currentNode.next;
    }

    if (foundNode) {
      const newNode = new ListNode(data);

      newNode.next = foundNode;

      if (beforeNode) {
        beforeNode.next = newNode;
      }

      if (foundNode === this.head) {
        this.head = newNode;
      }
    }

    return this;
  }

  insertAfterNode(node: ListNode<T>, data: T) {
    let foundNode: ListNode<T> | null = null;
    let currentNode = this.head;

    while (foundNode === null && currentNode !== null) {
      if (node.data === currentNode.data) {
        foundNode = currentNode;
      }

      currentNode = currentNode.next;
    }

    if (!foundNode) {
      return null;
    }

    const newNode = new ListNode(data);

    newNode.next = foundNode.next;
    foundNode.next = newNode;

    if (foundNode === this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  insertAtIndex(index: number, data: T) {
    if (index < 0) {
      return null;
    }

    let currentNode: ListNode<T> | null = this.head;
    let prevNode: ListNode<T> | null = null;
    let currentIndex = 0;
    let visitedEachElement = false;

    while (visitedEachElement === false) {
      if (currentNode === null) {
        visitedEachElement = true;
        break;
      }

      if (currentIndex === index) {
        visitedEachElement = true;
        break;
      }

      currentIndex++;
      prevNode = currentNode;
      currentNode = currentNode.next;
    }

    const newNode = new ListNode(data);

    if (prevNode) {
      prevNode.next = newNode;
    }

    newNode.next = currentNode;

    if (this.head === currentNode) {
      this.head = newNode;
    }

    if (this.tail === currentNode) {
      this.tail = newNode;
    }

    return this;
  }
}

const linkedList = new SinglyLinkedList();

linkedList.insertAtEnd(0);
linkedList.insertAtEnd(1);
linkedList.insertAtEnd(2);

console.log(linkedList);
