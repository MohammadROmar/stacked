import { Node } from './node';
import { Edge } from './edge';

export class Graph<T> {
  private adjacencyList: Map<Node<T>, Edge<T>[]>;

  constructor() {
    this.adjacencyList = new Map();
  }

  addNode(item: T) {
    const node = new Node(item);

    this.adjacencyList.set(node, []);
  }

  addEdge(from: Node<T>, to: Node<T>, weight = 1) {
    const edge = new Edge(from, to, weight);

    this.adjacencyList.get(from)?.push(edge);
  }
}
