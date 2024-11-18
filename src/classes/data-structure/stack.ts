export class Stack<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  public push(item: T) {
    this.items.push(item);
  }

  public pop() {
    return this.items.pop();
  }

  public peek() {
    return this.items[this.items.length - 1];
  }

  public isEmpty() {
    return this.items.length === 0;
  }
}
