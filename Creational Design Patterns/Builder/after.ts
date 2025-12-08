interface Builder {
  setPartA(): void;
  setPartB(): void;
  setPartC(): void;
}

class Product1 {
  private parts: string[] = [];

  public add(part: string): void {
    this.parts.push(part);
  }

  public listParts(): void {
    console.log(`Product parts: ${this.parts.join(", ")}`);
  }
}

class ConcreteBuilder1 implements Builder {
  private product!: Product1;

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.product = new Product1();
  }

  public setPartA(): void {
    this.product.add("PartA1");
  }

  public setPartB(): void {
    this.product.add("PartB1");
  }

  public setPartC(): void {
    this.product.add("PartC1");
  }

  public getProduct(): Product1 {
    const result = this.product;
    this.reset();
    return result;
  }
}

class Director {
  private builder!: Builder;

  public setBuilder(builder: Builder): void {
    this.builder = builder;
  }

  public buildMinimalViableProduct(): void {
    this.builder.setPartA();
  }

  public buildFullFeaturedProduct(): void {
    this.builder.setPartA();
    this.builder.setPartB();
    this.builder.setPartC();
  }
}

function clientCode(director: Director) {
  const builder = new ConcreteBuilder1();
  director.setBuilder(builder);

  console.log("Standard basic product:");
  director.buildMinimalViableProduct();
  builder.getProduct().listParts();

  //Remember, the Builder pattern can be used without director class.
  console.log("Custom product: ");
  builder.setPartA();
  builder.setPartB();
  builder.setPartC();

  builder.getProduct().listParts();
}

const director = new Director();
clientCode(director);
