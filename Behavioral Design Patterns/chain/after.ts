interface Handler {
  setNext(Handler: Handler): Handler;
  handle(request: string): string | null;
}

abstract class AbstractHandler implements Handler {
  private nextHandler: Handler | null = null;

  handle(request: string): string | null {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }

  setNext(handler: Handler): Handler {
    this.nextHandler = handler;

    //to enable chaining
    return handler;
  }
}

class DogHandler extends AbstractHandler {
  handle(request: string): string | null {
    if (request === "MeatBall") {
      return `Dog: I'll eat the ${request}`;
    }
    return super.handle(request);
  }
}
class MonkeyHandler extends AbstractHandler {
  handle(request: string): string | null {
    if (request === "Banana") {
      return `Monkey: I'll eat the ${request}`;
    }
    return super.handle(request);
  }
}
class SquirrelHandler extends AbstractHandler {
  handle(request: string): string | null {
    if (request === "Nut") {
      return `Squirrel: I'll eat the ${request}`;
    }
    return super.handle(request);
  }
}

//client code

function clientCode(handler: Handler) {
  const foods = ["Nut", "Banana", "Cup Of Coffee", "MeatBall"];

  for (const food of foods) {
    console.log(`who will eat ${food}...`);
    const result = handler.handle(food);
    if (result) {
      console.log(result);
    } else {
      console.log(`${food} left untouched`);
    }
  }
}

const monkey = new MonkeyHandler();
const dog = new DogHandler();
const squirrel = new SquirrelHandler();

monkey.setNext(dog).setNext(squirrel);
clientCode(monkey);

export {};
