class Singleton {
  // Step 1: Declare a private static instance
  private static instance: Singleton;

  // Step 3: Make the constructor private
  private constructor() {}

  // Step 2: Create a public static getInstance method
  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  public someMethod(): void {
    console.log("Hello, I am a singleton!");
  }
}

// Usage
const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();

instance1.someMethod(); // 'Hello, I am a singleton!'
instance2.someMethod(); // 'Hello, I am a singleton!'

console.log(instance1 === instance2); // true