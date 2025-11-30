/* eslint-disable */
// @ts-nocheck

//Before Singleton
// =========================================================
// You have a Logger that needs to be used deep in your code

class Logger {
  log(message: string) {
    console.log(`[LOG]: ${message}`);
  }
}

// ❌ BAD: Passing logger through every single layer

class App {
  //The main idea is that you want the same Logger instance
  //  to be used across your entire application so that:
  //1- All logs go to the same place
  //2- Consistent logging behavior
  //3- Shared configuration/state
  private logger = new Logger();

  start() {
    // Must pass logger to next layer
    const userController = new UserController(this.logger);
    userController.handleRequest();
  }
}

class UserController {
  constructor(private logger: Logger) {} // Must accept logger

  handleRequest() {
    // Must pass logger to next layer
    const userService = new UserService(this.logger);
    userService.processUser();
  }
}

class UserService {
  constructor(private logger: Logger) {} // Must accept logger

  processUser() {
    // Must pass logger to next layer
    const userRepository = new UserRepository(this.logger);
    userRepository.saveUser();
  }
}

class UserRepository {
  constructor(private logger: Logger) {} // Must accept logger

  saveUser() {
    // Finally use the logger!
    this.logger.log("User saved to database");
  }
}

// ❌ Problems:
// 1. Logger passed through 4 layers just to be used at the end
// 2. Every class needs logger parameter in constructor
// 3. If you add new layer, you must pass logger again
// 4. Code becomes messy with unnecessary parameters

//After Singleton
// =========================================================
// ✅ GOOD: Logger as Singleton - no parameter passing needed

class Logger {
  private static instance: Logger;

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  log(message: string) {
    console.log(`[LOG]: ${message}`);
  }
}

// ✅ Clean code - no parameters needed!

class App {
  start() {
    // No logger parameter needed!
    const userController = new UserController();
    userController.handleRequest();
  }
}

class UserController {
  // No logger parameter in constructor!

  handleRequest() {
    // No logger parameter needed!
    const userService = new UserService();
    userService.processUser();
  }
}

class UserService {
  // No logger parameter in constructor!

  processUser() {
    // No logger parameter needed!
    const userRepository = new UserRepository();
    userRepository.saveUser();
  }
}

class UserRepository {
  // No logger parameter in constructor!

  saveUser() {
    // Get logger directly when needed!
    const logger = Logger.getInstance();
    logger.log("User saved to database");
  }
}

// ✅ Benefits:
// 1. No parameter passing through layers
// 2. Cleaner constructors
// 3. Easy to add new layers
// 4. Logger available anywhere instantly
