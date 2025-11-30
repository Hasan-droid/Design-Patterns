/* eslint-disable */
// @ts-nocheck

//Before Singleton
// =========================================================
// ❌ BAD: Non-uniform access to database configuration

class DatabaseConfig {
  host = "localhost";
  port = 3306;
  username = "admin";

  constructor() {
    console.log("Creating new database config...");
  }
}

// Different parts of the system access it DIFFERENTLY:

// Team A creates new instance every time
class UserService {
  getUsers() {
    const config = new DatabaseConfig(); // Creates new instance
    console.log(`Connecting to ${config.host}:${config.port}`);
  }
}

// Team B passes it as parameter
class OrderService {
  constructor(private dbConfig: DatabaseConfig) {} // Needs it passed in

  getOrders() {
    console.log(`Connecting to ${this.dbConfig.host}:${this.dbConfig.port}`);
  }
}

// Team C uses a global variable
let globalDbConfig = new DatabaseConfig(); // Global approach

class ProductService {
  getProducts() {
    console.log(`Connecting to ${globalDbConfig.host}:${globalDbConfig.port}`);
  }
}

// ❌ PROBLEMS:
// 1. Multiple instances created unnecessarily
// 2. Inconsistent ways to access same data
// 3. Hard to maintain - if you change config, you need to update everywhere
// 4. Some teams might forget to initialize it

// Usage shows the chaos:
const userService = new UserService();
const orderService = new OrderService(new DatabaseConfig()); // Must remember to pass it
const productService = new ProductService(); // Uses global

userService.getUsers(); // Creates new config
orderService.getOrders(); // Uses passed config
productService.getProducts(); // Uses global config

//After Singleton
// =========================================================
// ✅ GOOD: Uniform access using Singleton

class DatabaseConfig {
  private static instance: DatabaseConfig;
  private host = "localhost";
  private port = 3306;
  private username = "admin";

  private constructor() {
    console.log("Creating database config...");
  }

  static getInstance(): DatabaseConfig {
    if (!DatabaseConfig.instance) {
      DatabaseConfig.instance = new DatabaseConfig();
    }
    return DatabaseConfig.instance;
  }

  getHost() {
    return this.host;
  }
  getPort() {
    return this.port;
  }
  getUsername() {
    return this.username;
  }
}

// Now EVERYONE accesses it the SAME way:

class UserService {
  getUsers() {
    const config = DatabaseConfig.getInstance(); // ✅ Same way
    console.log(`Connecting to ${config.getHost()}:${config.getPort()}`);
  }
}

class OrderService {
  getOrders() {
    const config = DatabaseConfig.getInstance(); // ✅ Same way
    console.log(`Connecting to ${config.getHost()}:${config.getPort()}`);
  }
}

class ProductService {
  getProducts() {
    const config = DatabaseConfig.getInstance(); // ✅ Same way
    console.log(`Connecting to ${config.getHost()}:${config.getPort()}`);
  }
}

// ✅ BENEFITS:
// 1. Everyone uses the SAME method to access config
// 2. Only ONE instance ever created
// 3. Predictable and consistent across the entire system
// 4. Easy to maintain and update

// Usage is now uniform:
const userService = new UserService();
const orderService = new OrderService(); // No parameters needed
const productService = new ProductService();

userService.getUsers(); // Same access pattern
orderService.getOrders(); // Same access pattern
productService.getProducts(); // Same access pattern
