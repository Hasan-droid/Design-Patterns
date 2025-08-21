/*eslint-disable*/
//ineffective communications between objects use case

// ======================================================================================
//before
class Header {
  updateCartCount(count: number) {
    /*.... */
  }
}

class Recommendation {
  refresh(cartItems: string[]) {
    /*...*/
  }
}

class Analytic {
  track(event: string, payload: any) {
    /*...*/
  }
}

class cart {
  private items: string[] = [];

  constructor(
    private header: Header,
    private recommendations: Recommendation,
    private analytics: Analytic
  ) {}

  addItem(item: string) {
    //cart must know everyone and call them in the right order
    this.header.updateCartCount(this.items.length);
    this.recommendations.refresh(this.items);
    this.analytics.track("cart_item_added", { item: item, count: item.length });
  }
}

// =========================================================================================

//after

interface Observer {
  update(subject: Subject): void;
}

interface Subject {
  addObserver(observer: Observer): void;
  removeObserver(observer: Observer): void;
  notifyObserver(): void;
}

class Cart implements Subject {
  private observers: Observer[] = [];
  private items: string[] = [];

  addObserver(observer: Observer) {
    //regardless the implementation details

    this.observers.push(observer);
  }

  removeObserver(observer: Observer) {
    const observerIndex = this.observers.indexOf(observer);

    this.observers.splice(observerIndex, 1);
  }

  notifyObserver() {
    this.observers.forEach((observer) => observer.update(this));
  }

  addItem(item: string) {
    this.items.push(item);
    this.notifyObserver();
  }
}

class Headers implements Observer {
  constructor(private id: number) {}
  update(subject: Subject): void {
    console.log(`Header with id ${this.id} notified`);
  }
}
class Recommendations implements Observer {
  constructor(private id: number) {}
  update(subject: Subject): void {
    console.log(`Recommendations with id ${this.id} notified`);
  }
}
class Analytics implements Observer {
  constructor(private id: number) {}
  update(subject: Subject): void {
    console.log(`Analytics with id ${this.id} notified`);
  }
}

const userCart = new Cart();

const header = new Headers(1);
const recommendation = new Recommendations(1);
const analytics = new Analytics(1);

userCart.addObserver(header);
userCart.addObserver(recommendation);
userCart.addObserver(analytics);

userCart.addItem("Cup");
userCart.addItem("Mug");

export {};
