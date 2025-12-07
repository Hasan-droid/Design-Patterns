interface ShapeProperties {
  color: string;
  x: number;
  y: number;
}

abstract class Shape {
  public properties: ShapeProperties;

  constructor(properties: ShapeProperties) {
    this.properties = properties;
  }

  abstract clone(): Shape;
}

class Rectangle extends Shape {
  constructor(
    shape: ShapeProperties,
    private width: number,
    private height: number
  ) {
    super(shape);
  }

  clone(): Shape {
    const clone: Shape = Object.create(this);
    clone.properties = { ...this.properties };
    return new Rectangle(clone.properties, this.width, this.height);
  }
}

class Circle extends Shape {
  constructor(shape: ShapeProperties, public radius: number) {
    super(shape);
  }

  clone(): Shape {
    return new Circle({ ...this.properties }, this.radius);
  }
}

/**
 * client code
 */

const circle = new Circle({ color: "Blue", x: 0, y: 0 }, 12);
const circle2 = circle.clone();
circle2.properties.color = "green";

const rectangle = new Rectangle({ color: "Green", x: 0, y: 0 }, 12, 4);
const rectangle2 = rectangle.clone();
rectangle2.properties.color = "Yellow";

console.log("rectangle", rectangle);
console.log("rectangle2", rectangle2);

if (rectangle.properties === rectangle2.properties) {
  console.log("rectangles are the same");
} else {
  console.log("rectangles are NOT the same");
}

console.log("circle 2 properties", circle2);

export {};
