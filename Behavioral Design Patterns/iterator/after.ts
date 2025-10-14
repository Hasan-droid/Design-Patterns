class ArrayIterator<T> {
  private position = 0;
  constructor(private collection: T[]) {}

  public next(): T {
    const result = this.collection[this.position];
    this.position += 1;
    return result;
  }

  public hasNext(): boolean {
    return this.position < this.collection.length;
  }
}

const obj_arr = [
  { name: "kameel", age: "26" },
  { name: "jumana", age: "32" },
];

const iterator = new ArrayIterator(obj_arr);

console.log(iterator.next());

const str_arr = ["hasan", "khalel"];

const iterator2 = new ArrayIterator(str_arr);

console.log(iterator2.next());

export {};
