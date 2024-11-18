import hash from 'hash-it';

export class HashTable<T> {
  private table: Map<number, T>;

  constructor() {
    this.table = new Map<number, T>();
  }

  private hash(value: T) {
    return hash(value);
  }

  public insert(value: T) {
    // Using the returned hashed value as a key.
    const hashedValue = this.hash(value);

    this.table.set(hashedValue, value);
  }

  public get(value: T) {
    const hashedValue = this.hash(value);

    return this.table.get(hashedValue);
  }
}
