class HashMap{
  private balanceFactor = Infinity;
  private numberOfValues = 0;
  private numberOfBuckets = 4;
  private buckets = Array.from({length: this.numberOfBuckets}, () => new LinkedList())

  set(key: string, value: any){
    const bucketIndex = this.hash(key);

    const existingKeyNode = this.buckets[bucketIndex].find(key);

    if(existingKeyNode){
      this.buckets[bucketIndex].update(existingKeyNode, key, value);
    }else{
      this.buckets[bucketIndex] = this.buckets[bucketIndex].add(key, value);

      this.numberOfValues++;
  
      this.balanceFactor = this.numberOfValues / this.numberOfBuckets;

      if(this.balanceFactor > 0.7){
        this.rehash();
      }
    }

    return this;
  }

  get(key: string){
    const hashValue = this.hash(key);

    return this.buckets[hashValue].find(key)?.data.data;
  }

  delete(key: string){
    const hashValue = this.hash(key);

    this.balanceFactor = this.numberOfValues / this.numberOfBuckets;

    const removedNode = this.buckets[hashValue].remove(key);

    if(removedNode){
      this.numberOfValues--;
    }

    return removedNode?.data.data;
  }

  private rehash(){
    const bucketItems: LinkedListNode[] = [];

    this.buckets.forEach((linkedList, index) => {
      linkedList.traverse((linkedListNode) => {
        bucketItems.push(linkedListNode)
      })
    })

    this.numberOfBuckets = this.numberOfBuckets * 2;

    this.numberOfValues = 0;

    this.balanceFactor = Infinity;

    this.buckets = Array.from({length: this.numberOfBuckets}, () => new LinkedList())

    bucketItems.forEach(bucketItem => {
      this.set(bucketItem.data.key, bucketItem.data.data)
    })

    return;
  }

  private hash(value: string){
    let hashValue = 0;

    for(let i = 0; i < value.length; i++){
      hashValue += value.charCodeAt(i);
    }

    return hashValue % this.numberOfBuckets;
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

  update(node: LinkedListNode, key: any, value: any){
    node.data.key = key;
    node.data.data = value;
  }

  traverse(callback: (node: LinkedListNode) => void){
    let currentNode = this.head;

    while(currentNode){
      callback(currentNode);

      currentNode = currentNode.next;
    }
  }
}

const hashMap = new HashMap();

hashMap.set("a", 123);
hashMap.set("b", 456);
hashMap.set("ab", 789);
hashMap.set("abc", 100);
hashMap.set("abcd", 1000);
console.log(hashMap);
hashMap.set("abcde", 10000);
hashMap.set("abcde", 100000);
console.log(hashMap);
console.log(hashMap.get("a"));
console.log(hashMap.get("b"));
console.log(hashMap.get("ab"));
console.log(hashMap.get("abc"));
console.log(hashMap.get("abcde"))
hashMap.delete("a");
console.log(hashMap.get("a"));
