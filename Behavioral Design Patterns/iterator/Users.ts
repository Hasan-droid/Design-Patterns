//generic iterator interface
//=========================================================
//return of iterator
interface MyIteratorResult<T> {
  value: T | null;
  done: boolean;
}

interface MyIterator<T> {
  next(): MyIteratorResult<T>;
  hasNext(): boolean;
}

// to turn a collection into an iterable
interface Collection<T> {
  createIterator(): MyIterator<T>;
}

//=========================================================

class User {
  constructor(private name: string) {}
}

class UserCollection implements Collection<User> {
  constructor(private users: User[]) {}

  createIterator(): MyIterator<User> {
    return new UserIterator(this);
  }

  getItems() {
    return this.users;
  }
}

class UserIterator implements MyIterator<User> {
  private collection: UserCollection;
  private position: number = 0;

  constructor(collection: UserCollection) {
    this.collection = collection;
  }

  public hasNext(): boolean {
    return this.collection.getItems().length > this.position;
  }

  public next(): MyIteratorResult<User> {
    if (this.hasNext()) {
      return {
        value: this.collection.getItems()[this.position++],
        done: false,
      };
    } else {
      return {
        value: null,
        done: true,
      };
    }
  }
}

//client code

const users = [new User("omar"), new User("hasan"), new User("jameel")];

const userCollection = new UserCollection(users);

const iterator = userCollection.createIterator();

console.log(iterator.next());
