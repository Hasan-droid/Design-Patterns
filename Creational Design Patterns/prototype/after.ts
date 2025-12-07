interface UserDetails {
  name: string;
  age: number;
  email: string;
}

interface Prototype {
  clone(): Prototype;

  getUserDetails(): UserDetails;
}

/**
 * Concrete Prototype
 */
class ConcretePrototype implements Prototype {
  constructor(private user: UserDetails) {}

  public clone(): ConcretePrototype {
    //Deep copy
    const clone = Object.create(this);
    clone.user = { ...this.user };
    return clone;
  }

  public getUserDetails(): UserDetails {
    return this.user;
  }
}

/**
 * client
 */

function clientCode() {
  const p1 = new ConcretePrototype({
    name: "john",
    age: 30,
    email: "john@example.com",
  });

  const p2 = p1.clone();

  if (p1.getUserDetails() === p2.getUserDetails()) {
    console.log("Objects are the same");
  } else {
    console.log("Objects are not the same");
  }
}
//f the clone operation works correctly,
// the two objects should not be the same instance even though they have
// the same data.

clientCode();
