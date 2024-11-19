import hash from 'hash-it';

export class HashTable<K, V> {
  private table: Map<number, V>;

  constructor() {
    this.table = new Map<number, V>();
  }

  private hash(key: K | V) {
    return hash(key);
  }

  public insert(key: K, value: V) {
    const hashedKey = this.hash(key);

    this.table.set(hashedKey, value);
  }

  public get(key: K) {
    const hashedValue = this.hash(key);

    return this.table.get(hashedValue);
  }
}
