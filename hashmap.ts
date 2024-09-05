class HashMap {
  capacity = 10;
  buckets: (LinkedList | undefined)[] = Array(this.capacity).fill(undefined);

  get(key: string) {
    const hash = this.getHash(key);

    if (!this.buckets[hash]) {
      return;
    }

    return this.buckets[hash]?.find(key)?.data?.data;
  }

  set(key: string, value: any) {
    const hash = this.getHash(key);

    if (!this.buckets[hash]) {
      this.buckets[hash] = new LinkedList().add(key, value);
    } else {
      this.buckets[hash]?.add(key, value);
    }

    return this;
  }

  delete(key: string) {
    const hash = this.getHash(key);

    if (!this.buckets[hash]) {
      return;
    }

    return this.buckets[hash]?.remove(key);
  }

  private getHash(key: string) {
    return key.length % this.capacity;
  }
}

class LinkedListNode {
  data: { key: any; data: any };
  next: LinkedListNode | undefined;

  constructor(data: { key: any; data: any }) {
    this.data = data;
  }
}

class LinkedList {
  head: LinkedListNode | undefined;
  tail: LinkedListNode | undefined;

  add(key: any, data: any) {
    const node = new LinkedListNode({ key, data });

    if (!this.tail) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }

    return this;
  }

  remove(key: any) {
    let prevNode: LinkedListNode | undefined = undefined;
    let node = this.head;
    let foundNode: LinkedListNode | undefined = undefined;

    while (node && !foundNode) {
      if (node.data.key === key) {
        foundNode = node;
      }
      prevNode = node;
      node = node.next;
    }

    if (!foundNode) {
      return;
    }

    if (foundNode === this.head) {
      this.head = this.head.next;
    }

    if (foundNode === this.tail) {
      this.tail = prevNode;
    }

    if (prevNode) {
      prevNode.next = foundNode.next;
    }

    return foundNode;
  }

  find(key: any) {
    let node = this.head;
    let foundNode: LinkedListNode | undefined = undefined;

    while (node && !foundNode) {
      if (node.data.key === key) {
        foundNode = node;
      }
      node = node.next;
    }

    return foundNode;
  }
}

const hashMap = new HashMap();

hashMap.set("a", 123);
hashMap.set("b", 456);
hashMap.set("ab", 789);
console.log(hashMap);
console.log(hashMap.get("a"));
console.log(hashMap.get("b"));
console.log(hashMap.get("ab"));
hashMap.delete("a");
console.log(hashMap.get("a"));
