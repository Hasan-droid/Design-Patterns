/* eslint-disable */
// @ts-nocheck
interface ICar {
  model: string;
  productionYear: number;
  displayCarInfo(): void;
}

class Sedan implements ICar {
  model: string = "";
  productionYear: number = 0;

  constructor(model: string, public factoryName: string) {
    this.model = model;
  }

  displayCarInfo(): void {
    console.log(
      `This is Sedan Car, model: ${this.model}, Production Year: ${this.productionYear}`
    );
  }
}

class SUV implements ICar {
  model: string;
  productionYear: number = 1;

  constructor(model: string) {
    this.model = model;
  }

  displayCarInfo(): void {
    console.log(
      `This is SUV Car, model: ${this.model}, Production Year: ${this.productionYear}`
    );
  }
}

class CarFactory {
  public createCar(type: string, model: string, productionYear: number): ICar {
    switch (type) {
      case "Sedan":
        return new Sedan(model, "US");
      case "SUV":
        return new SUV(model);
      default:
        throw new Error("Invalid car type");
    }
  }
}

const carFactory = new CarFactory();

carFactory.createCar("Sedan", "2015", 2013).displayCarInfo();
