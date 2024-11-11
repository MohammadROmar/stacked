import { Node } from './node';

export class Edge<T> {
  from: Node<T>;
  to?: Node<T>;
  weight: number;

  constructor(from: Node<T>, to?: Node<T>, weight = 1) {
    this.from = from;
    this.to = to;
    this.weight = weight;
  }
}
