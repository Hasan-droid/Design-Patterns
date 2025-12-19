interface IProductA {
  operationA(): string;
}

interface IProductB {
  operationB(): string;
  combinedOperation(collaborate: IProductA): string;
}

interface IFactory {
  createOperationA(): IProductA;
  createOperationB(): IProductB;
}

class ProductA implements IProductA {
  operationA(): string {
    return "create Operation A";
  }
}

class ProductB implements IProductB {
  operationB(): string {
    return "create Operation B";
  }

  combinedOperation(collaborate: IProductA): string {
    return `${collaborate.operationA()} collaborated with operation B`;
  }
}

class Factory implements IFactory {
  createOperationA(): IProductA {
    return new ProductA();
  }

  createOperationB(): IProductB {
    return new ProductB();
  }
}

function client(factory: IFactory): string {
  const operationA = factory.createOperationA();
  return factory.createOperationB().combinedOperation(operationA);
}

const factory = new Factory();

console.log(client(factory));

export {};
