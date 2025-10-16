//strategy
interface Strategy {
  pay(amount: number): void;
}

//concrete strategy
class Paypal implements Strategy {
  pay(amount: number): void {
    console.log(`paid amount ${amount} with Paypal`);
  }
}

//concrete strategy
class CreditCard implements Strategy {
  pay(amount: number): void {
    console.log(`paid amount ${amount} with CreditCard`);
  }
}

//concrete strategy
class BitCoin implements Strategy {
  pay(amount: number): void {
    console.log(`paid amount ${amount} with BitCoin`);
  }
}

//context
class ShoppingCart {
  private amount: number = 0;

  constructor(private strategy: Strategy) {}

  addToCart(amount: number) {
    this.amount = amount;
  }

  checkout() {
    this.strategy.pay(this.amount);
    this.amount = 0;
  }

  setPaymentStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }
}

//client code
const cart = new ShoppingCart(new Paypal());
cart.addToCart(20);
cart.addToCart(40);
cart.checkout();

cart.setPaymentStrategy(new CreditCard());
cart.addToCart(10);
cart.addToCart(10);
cart.checkout();
