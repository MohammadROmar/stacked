export class Stack<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  push(item: T) {
    this.items.push(item);
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  size() {
    return this.items.length;
  }
}