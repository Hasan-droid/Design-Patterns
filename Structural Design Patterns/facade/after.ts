class Grinder {
  grindBeans() {
    console.log("Grinding beans...");
  }
}
class Boiler {
  boilWater() {
    console.log("Boiling Water...");
  }
}
class Brewer {
  brewCoffee() {
    console.log("Brewing coffee...");
  }
}

//Facade
class CoffeeMakerFacade {
  constructor(
    private boiler: Boiler,
    private grinder: Grinder,
    private brewer: Brewer
  ) {}

  makeCoffee() {
    this.grinder.grindBeans();
    this.boiler.boilWater();
    this.brewer.brewCoffee();
  }
}

//client code
const grinder = new Grinder();
const boiler = new Boiler();
const brewer = new Brewer();

const coffeeMaker = new CoffeeMakerFacade(boiler, grinder, brewer);

coffeeMaker.makeCoffee();
