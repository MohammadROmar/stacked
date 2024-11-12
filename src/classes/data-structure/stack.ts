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

  isEmpty() {
    return this.items.length === 0;
  }
}
