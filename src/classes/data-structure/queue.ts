export class Queue<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  public enqueue(item: T) {
    this.items.push(item);
  }

  public dequeue() {
    return this.items.shift();
  }

  public isEmpty() {
    return this.items.length === 0;
  }
}
