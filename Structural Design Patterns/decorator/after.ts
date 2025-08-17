//Component
interface Coffee {
  cost(): number;
  description(): string;
}

//Concrete Component
class SimpleCoffee implements Coffee {
  cost(): number {
    return 2;
  }

  description(): string {
    return "Simple Black Coffee";
  }
}

//Decorator
abstract class Decorator {
  constructor(protected coffee: Coffee) {}

  abstract cost(): number;
  abstract description(): string;
}

class AddMilk extends Decorator {
  constructor(coffee: Coffee) {
    super(coffee);
  }

  cost(): number {
    return this.coffee.cost() + 2;
  }

  description(): string {
    return `${this.coffee.description()}+ with Milk`;
  }
}

class AddCream extends Decorator {
  constructor(coffee: Coffee) {
    super(coffee);
  }

  cost(): number {
    return this.coffee.cost() + 3;
  }

  description(): string {
    return `${this.coffee.description()}+ with Whapped Cream`;
  }
}

class AddSugar extends Decorator {
  constructor(coffee: Coffee) {
    super(coffee);
  }

  description(): string {
    return `${this.coffee.description()}+ with Sugar`;
  }

  cost(): number {
    return this.coffee.cost() + 1;
  }
}

//client code
let coffee = new SimpleCoffee();

//add milk
coffee = new AddMilk(coffee);

coffee = new AddCream(coffee);

coffee = new AddSugar(coffee);

console.log(coffee.description());
console.log(coffee.cost());

export {};
