abstract class PaymentProcessor {
  constructor(protected amount: number, protected type: string) {}

  abstract processPayment(): void;
}

class PayPal extends PaymentProcessor {
  processPayment(): void {
    console.log(`this is ${this.type} GateWay ${this.amount}`);
  }
}

class CreditCard extends PaymentProcessor {
  processPayment(): void {
    console.log(`this is ${this.type} GateWay ${this.amount}`);
  }
}

class factory {
  static createProcessor(amount: number, type: string) {
    switch (type) {
      case "PayPal":
        return new PayPal(amount, type);
      case "CreditCard":
        return new CreditCard(amount, type);
      default:
        throw new Error("Undefined Payment Gateway");
    }
  }
}

factory.createProcessor(100, "PayPal").processPayment();
factory.createProcessor(500, "CreditCard").processPayment();

export {};
