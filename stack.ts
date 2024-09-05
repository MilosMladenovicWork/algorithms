class Stack {
  private list: any[] = [];
  constructor() {}

  push(data: any) {
    return this.list.push(data);
  }

  pop() {
    return this.list.pop();
  }

  peek() {
    return this.list[this.list.length - 1];
  }

  isEmpty() {
    return this.list.length === 0;
  }
}

const stack = new Stack();

stack.push(10);
stack.push(9);
stack.push(100);

console.log(stack.pop());
console.log(stack.peek());
