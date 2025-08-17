class Rectangle {
  constructor(private width: number, private height: number) {}

  public getWidth() {
    return this.width;
  }

  public getHeight() {
    return this.height;
  }

  public area() {
    return this.width * this.height;
  }
}

class Square {
  constructor(private side: number) {}

  public getSide() {
    return this.side;
  }

  public area() {
    return this.side * this.side;
  }
}

//Adapter

class SquareToRectangle {
  constructor(private square: Square) {}

  public getWidth() {
    return this.square.getSide();
  }

  public getHeight() {
    return this.square.getSide();
  }

  public area() {
    return this.square.getSide() * this.square.getSide();
  }
}

const square = new Square(5);
const rectangle = new SquareToRectangle(square);

console.log(rectangle.area());
