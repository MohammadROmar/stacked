import { Queue } from './queue';

class PriorityQueueItem<T> {
  public item: T;
  public priority: number;

  constructor(item: T, priority: number) {
    this.item = item;
    this.priority = priority;
  }
}

export class PriorityQueue<T> extends Queue<PriorityQueueItem<T>> {
  constructor() {
    super();

    this.items = [];
  }

  public enqueue(item: PriorityQueueItem<T>) {
    let contain = false;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > item.priority) {
        this.items.splice(i, 0, item);
        contain = true;
        break;
      }
    }

    if (!contain) {
      super.enqueue(item);
    }
  }
}
