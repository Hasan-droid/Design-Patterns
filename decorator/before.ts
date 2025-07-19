/* eslint-disable @typescript-eslint/no-unused-vars */
//disable unused vars for ease of use

// Before implementing Decorator Design Pattern
// This shows a rigid inheritance-based approach

// Base Coffee class
abstract class Coffee {
  abstract cost(): number;
  abstract description(): string;
}

// All possible combinations must be created as separate classes
class SimpleCoffee extends Coffee {
  cost(): number {
    return 2;
  }

  description(): string {
    return "Simple Black Coffee";
  }
}

class CoffeeWithMilk extends Coffee {
  cost(): number {
    return 2 + 2; // base coffee + milk
  }

  description(): string {
    return "Coffee with Milk";
  }
}

class CoffeeWithSugar extends Coffee {
  cost(): number {
    return 2 + 1; // base coffee + sugar
  }

  description(): string {
    return "Coffee with Sugar";
  }
}

class CoffeeWithWhip extends Coffee {
  cost(): number {
    return 2 + 3; // base coffee + whip
  }

  description(): string {
    return "Coffee with Whipped Cream";
  }
}

// Now we need separate classes for ALL possible combinations!
class CoffeeWithMilkAndSugar extends Coffee {
  cost(): number {
    return 2 + 2 + 1; // base + milk + sugar
  }

  description(): string {
    return "Coffee with Milk and Sugar";
  }
}

class CoffeeWithMilkAndWhip extends Coffee {
  cost(): number {
    return 2 + 2 + 3; // base + milk + whip
  }

  description(): string {
    return "Coffee with Milk and Whipped Cream";
  }
}

class CoffeeWithSugarAndWhip extends Coffee {
  cost(): number {
    return 2 + 1 + 3; // base + sugar + whip
  }

  description(): string {
    return "Coffee with Sugar and Whipped Cream";
  }
}

class CoffeeWithMilkSugarAndWhip extends Coffee {
  cost(): number {
    return 2 + 2 + 1 + 3; // base + milk + sugar + whip
  }

  description(): string {
    return "Coffee with Milk, Sugar and Whipped Cream";
  }
}

// Problems with this approach:
// 1. Class explosion - for n add-ons, you need 2^n classes
// 2. Code duplication - each class repeats similar logic
// 3. Hard to maintain - adding a new add-on requires creating many new classes
// 4. Violates Open/Closed Principle - must modify existing code to add features
// 5. Not flexible - can't dynamically add/remove add-ons at runtime

// Usage - must know exact class for desired combination
const simpleCoffee = new SimpleCoffee();
console.log(`${simpleCoffee.description()} - $${simpleCoffee.cost()}`);

const coffeeWithMilk = new CoffeeWithMilk();
console.log(`${coffeeWithMilk.description()} - $${coffeeWithMilk.cost()}`);

const fancyCoffee = new CoffeeWithMilkSugarAndWhip();
console.log(`${fancyCoffee.description()} - $${fancyCoffee.cost()}`);

// What if we want to add Vanilla? We'd need:
// - CoffeeWithVanilla
// - CoffeeWithMilkAndVanilla
// - CoffeeWithSugarAndVanilla
// - CoffeeWithWhipAndVanilla
// - CoffeeWithMilkSugarAndVanilla
// - CoffeeWithMilkWhipAndVanilla
// - CoffeeWithSugarWhipAndVanilla
// - CoffeeWithMilkSugarWhipAndVanilla
// That's 8 more classes for just one new add-on!

export {};
