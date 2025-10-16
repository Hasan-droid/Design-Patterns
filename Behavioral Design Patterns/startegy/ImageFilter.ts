//strategy
interface FilterStrategy {
  apply(image: string): void;
}

//concrete strategy
class GrayScaleStrategy implements FilterStrategy {
  apply(image: string) {
    console.log(`apply Gray Scale filter to image ${image}`);
  }
}
//concrete strategy
/* eslint-disable @typescript-eslint/no-unused-vars */
class SepiaStrategy implements FilterStrategy {
  apply(image: string) {
    console.log(`apply Sepia filter to image ${image}`);
  }
}
//concrete strategy
class NegativeStrategy implements FilterStrategy {
  apply(image: string) {
    console.log(`apply negative filter to image ${image}`);
  }
}

//Client Code
class ImageProcessor {
  constructor(private filterStrategy: FilterStrategy) {}

  setFilterStrategy(strategy: FilterStrategy): void {
    this.filterStrategy = strategy;
  }

  applyFilter(image: string): void {
    this.filterStrategy.apply(image);
  }
}

//Client Code
const imageProcessor = new ImageProcessor(new NegativeStrategy());
imageProcessor.setFilterStrategy(new GrayScaleStrategy());
imageProcessor.applyFilter("image1");
