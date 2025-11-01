//CAUTION
//This implementation is differ from after.ts since here the implementation is about sequential processing of an object
//Next will see how the handlers depends on the object itself rather than they were decoupled form the object in after.ts

//Class Object to be processed
class Order {
  isValid() {
    return true;
  }

  applyDiscount(): void {
    //discount logic
  }

  ProcessPayment(): boolean {
    return true;
  }
  ship(): void {
    //ship logic
  }
}

interface Handler {
  handle(order: Order): string | null;
  setNext(handler: Handler): Handler;
}

abstract class AbstractHandler implements Handler {
  private nextHandler: Handler | null = null;

  handle(order: Order): string | null {
    if (this.nextHandler) {
      return this.nextHandler.handle(order);
    }
    return null;
  }

  setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }
}

class ValidationHandler extends AbstractHandler {
  handle(order: Order): string | null {
    if (order.isValid()) {
      //we want to proceed processing of the order is valid
      return super.handle(order);
    }

    return "Order is not valid";
  }
}

class DiscountHandler extends AbstractHandler {
  handle(order: Order): string | null {
    //applying discount logic on order
    order.applyDiscount();
    return super.handle(order);
  }
}

class PaymentHandler extends AbstractHandler {
  handle(order: Order): string | null {
    if (order.ProcessPayment()) {
      //proceed the order if the payment logic is applied truly
      return super.handle(order);
    }
    return "Payment was not processed";
  }
}

class ShipHandler extends AbstractHandler {
  handle(order: Order): string | null {
    order.ship();

    //order last process
    return "Order shipped";
  }
}

//client code

const order = new Order();

const validationHandler = new ValidationHandler();
const discountHandler = new DiscountHandler();
const paymentHandler = new PaymentHandler();
const shipHandler = new ShipHandler();

validationHandler
  .setNext(discountHandler)
  .setNext(paymentHandler)
  .setNext(shipHandler);

console.log(validationHandler.handle(order));
