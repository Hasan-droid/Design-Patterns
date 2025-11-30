/*eslint-disable*/
// @ts-nocheck

class Logger {
  private static instance: Logger;

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public log(message: string): void {
    const timestamp = new Date();
    console.log(`[${timestamp.toLocaleString()}] - ${message}`);
  }
}

class Application {
  private logger: Logger;

  constructor() {
    this.logger = Logger.getInstance();
  }

  run(): void {
    this.logger.log("Application is starting");
    // other logic
    this.logger.log("Application is shutting down");
  }
}

// Usage
const app = new Application();
app.run();

/*
In this example, the Application class is tightly coupled to the Logger class. Here's why:

1- The Application class directly references the Logger class. 
This makes it difficult to replace the Logger with a different logger,
such as a ConsoleLogger or FileLogger,
without changing the Application code.

2- If we want to test the Application class independently of the Logger,
we would have to modify the Logger class, perhaps by adding a method
to change the instance variable, which violates the principle of 
the singleton.

3- If we change the interface of the Logger class 
(for example, by renaming log to write), 
we would also have to change the Application class.
*/

/*
This tight coupling is a common drawback when using singletons
and global state in general. One way to mitigate this is to use 
dependency injection, where the Logger instance would be passed 
into the Application as a parameter, allowing us to easily substitute it
with a different implementation or a mock object for testing.
However, this would mean giving up on using the Logger as a singleton,
so there is a trade-off to consider.
*/

//trad off signleton
// ✅ LOOSE COUPLING - Application accepts ANY logger that implements the interface

interface ILogger {
  log(message: string): void;
}

class ConsoleLogger implements ILogger {
  log(message: string): void {
    console.log(`[CONSOLE] ${message}`);
  }
}

class FileLogger implements ILogger {
  log(message: string): void {
    // Write to file
    console.log(`[FILE] Writing to file: ${message}`);
  }
}

class MockLogger implements ILogger {
  public messages: string[] = [];

  log(message: string): void {
    this.messages.push(message); // For testing
  }
}

class Application {
  constructor(private logger: ILogger) {} // ✅ Inject dependency

  run(): void {
    this.logger.log("Application is starting");
    this.logger.log("Application is shutting down");
  }
}

// ✅ Now you can easily swap loggers:
const app1 = new Application(new ConsoleLogger());
const app2 = new Application(new FileLogger());
const app3 = new Application(new MockLogger()); // For testing

app1.run(); // Logs to console
app2.run(); // Logs to file
app3.run(); // Logs to mock for testing

export {};
