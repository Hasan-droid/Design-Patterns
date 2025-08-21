interface Observer {
  update(subject: Subject): void;
}

class concertObserver implements Observer {
  constructor(protected id: number) {}
  update(subject: Subject): void {
    console.log(
      `Observer with id ${this.id} updated for Subject ${subject.getState()}`
    );
  }
}

interface Subject {
  addObserver(observer: Observer): void;
  removeObserver(observer: Observer): void;
  notifyObserver(): void;
  setState(number: number): void;
  getState(): number;
}

class ConcertSubject implements Subject {
  private observers: Observer[] = [];
  private state = 0;

  addObserver(observer: Observer): void {
    const observerExits = this.observers.includes(observer);

    if (observerExits) {
      console.log(`observer has attached already`);
      return;
    }

    this.observers.push(observer);
    console.log(`Observer Attached`);
  }

  removeObserver(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);

    if (observerIndex == -1) {
      console.log("observer is already detached");
      return;
    }

    this.observers.splice(observerIndex, 1);
  }

  notifyObserver(): void {
    this.observers.forEach((observer) => observer.update(this));
  }

  setState(number: number): void {
    console.log("... setting state");
    this.state = number;
    this.notifyObserver();
  }
  getState(): number {
    return this.state;
  }
}

const subject1 = new ConcertSubject();

const observer1 = new concertObserver(1);
const observer2 = new concertObserver(3);

subject1.addObserver(observer1);
subject1.addObserver(observer2);

subject1.setState(123);

export {};
