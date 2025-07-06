interface DataBase {
  connect(): void;
  query(sql: string): any;
  close(): void;
}

abstract class DataBaseServices {
  constructor(protected database: DataBase) {}

  abstract fetchData(query: string): any;
}

class PostgreSQLDatabase implements DataBase {
  connect(): void {
    console.log("Connect PostgreSQL DataBase");
  }

  close(): void {
    console.log("Close PostgreSQL DataBase");
  }

  query(sql: string) {
    if (sql == "1")
      return {
        name: "hasan baydoun",
        position: "SoftwareEngineer",
      };
  }
}

class MongoDatabase implements DataBase {
  connect(): void {
    console.log("Connect Mongo DataBase");
  }

  close(): void {
    console.log("Close Mongo DataBase");
  }

  query(sql: string) {
    if (sql == "1")
      return {
        name: "Omar baydoun",
        position: "SoftwareEngineer",
      };
  }
}

class ClientDataBaseService extends DataBaseServices {
  fetchData(query: string) {
    this.database.connect();
    const result = this.database.query(query);
    this.database.close();
    return result;
  }
}

/**
 * The challenge was deciding where to draw the line. You had to ask:

"What is the high-level concept I want to de-couple?"
Your answer: The service logic for fetching data (ClientDataBaseService).

"What is the underlying implementation that can change?"
Your answer: The actual database being used (MongoDatabase or PostgreSQLDatabase).
 */

// Another Abstraction Example

class OrderDataService extends DataBaseServices {
  fetchData(query: string) {
    //some different logic
    console.log(`order data from dataBase ${this.database.constructor.name}`);
    this.database.query(query);
  }
}

class CustomerDataService extends DataBaseServices {
  fetchData(query: string) {
    //some different logic
    console.log(`customers ${this.database.connect()}`);
    this.database.query(query);
  }
}

const mongoDataBAse = new MongoDatabase();
const dataBaseService = new ClientDataBaseService(mongoDataBAse);
console.log(dataBaseService.fetchData("1"));

const orderingDataBase = new OrderDataService(mongoDataBAse);

orderingDataBase.fetchData("1");
