class LeastRecentlyUsedCache {
  doublyLinkedList: DoublyLinkedList;
  capacity: number;
  currentCapacity: number;
  hashMap: Record<any, any> = {};

  constructor(capacity: number) {
    this.capacity = capacity;
    this.currentCapacity = 0;
    this.doublyLinkedList = new DoublyLinkedList();
  }

  get(key: any) {
    if (!this.hashMap.hasOwnProperty(key)) {
      return undefined;
    }

    const node = this.hashMap[key];

    this.doublyLinkedList.remove(node);

    const newNode = this.doublyLinkedList.addToTail(node.key, node.data);

    this.hashMap[key] = newNode;

    return this.hashMap[key];
  }

  set(key: any, value: any) {
    if (this.hashMap.hasOwnProperty(key)) {
      const node = this.hashMap[key];

      node.value = value;

      this.doublyLinkedList.remove(node);

      const newNode = this.doublyLinkedList.addToTail(node.key, node.value);

      this.hashMap[key] = newNode;

      return this;
    }

    if (this.isFull()) {
      this.doublyLinkedList.removeHead();
      this.currentCapacity -= 1;
    }

    const node = this.doublyLinkedList.addToTail(key, value);

    this.hashMap[key] = node;

    this.currentCapacity += 1;

    return this;
  }

  private isFull() {
    return this.capacity === this.currentCapacity;
  }
}

class DoublyLinkedListNode {
  key: string;
  data: any;
  prev: DoublyLinkedListNode | undefined;
  next: DoublyLinkedListNode | undefined;

  constructor(key: string, data: any) {
    this.key = key;
    this.data = data;
  }
}

class DoublyLinkedList {
  head: DoublyLinkedListNode | undefined;
  tail: DoublyLinkedListNode | undefined;

  addToTail(key: string, data: any) {
    const newNode = new DoublyLinkedListNode(key, data);

    if (!this.tail) {
      this.head = newNode;
      this.tail = newNode;
      return newNode;
    }

    this.tail.next = newNode;
    newNode.prev = this.tail;
    this.tail = newNode;

    return newNode;
  }

  remove(node: DoublyLinkedListNode) {
    if (node === this.head) {
      this.head = node.next;
    }

    if (node === this.tail) {
      this.tail = node.prev;
    }

    if (node.prev) {
      node.prev.next = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev;
    }

    node.prev = undefined;
    node.next = undefined;

    return node;
  }

  removeHead() {
    if (this.head) {
      if (this.head === this.tail) {
        const node = this.head;
        this.head = undefined;
        this.tail = undefined;
        return node;
      }

      const node = this.head;
      if (node.next) {
        node.next.prev = undefined;
        this.head = node.next;
      }

      return node;
    }

    return undefined;
  }
}

const lru = new LeastRecentlyUsedCache(4);

lru.set("a", { a: 1 });
console.log(lru.doublyLinkedList);
console.log(lru.currentCapacity);
lru.set("b", { b: 1 });
console.log(lru.doublyLinkedList);
console.log(lru.currentCapacity);
lru.set("c", { c: 1 });
console.log(lru.doublyLinkedList);
console.log(lru.currentCapacity);
lru.set("d", { d: 1 });
console.log(lru.doublyLinkedList);
console.log(lru.currentCapacity);
lru.set("e", { e: 1 });
console.log(lru.doublyLinkedList);
console.log(lru.currentCapacity);
console.log(lru.get("b"));
console.log(lru.doublyLinkedList);
