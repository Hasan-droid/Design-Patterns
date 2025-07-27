//adapted **old Legacy**
class MySQLDatabase {
  connectToMySQL(url: string) {
    console.log(`Connect to MySQL ${url}`);
  }

  executeMySQLQuery(query: string) {
    console.log(`Execute mySql query ${query}`);
  }
}

//(to be adapted) **new legacy**
class PostgresSQLDataBase {
  connectToPostgres(url: string) {
    console.log(`Connect to Postgres ${url}`);
  }

  executePostgresQuery(query: string) {
    console.log(`Execute Postgres query ${query}`);
  }
}

//adapter
class DataBaseAdapter {
  constructor(private dataBase: PostgresSQLDataBase) {}

  connectToMySQL(url: string) {
    this.dataBase.connectToPostgres(url);
  }

  executeMySQLQuery(query: string) {
    this.dataBase.executePostgresQuery(query);
  }
}

/**
 * The Problem:
You want to use Postgres, but your old code only knows how to talk to MySQL.
You do not want to maintain a real MySQL implementation **old legacy**.
You do not want to rewrite all the old code to use Postgres method names.
* solution
You write an adapter (DataBaseAdapter) that:
Looks like a MySQL database to the old code ,Under the hood, it uses postgresSQL
 */

//Code **new legacy**
const postgresSql = new PostgresSQLDataBase();

//Code **old legacy**
// const mySqlDataBase = new MySQLDatabase();

//adapter interface
const mySqlDataBase = new DataBaseAdapter(postgresSql);

//existing user code never changes
mySqlDataBase.connectToMySQL("sql://localhost:3300");
mySqlDataBase.executeMySQLQuery("select * from users");

/**switch between old legacy code and new legacy code
implementation won't change because of the adapter

*
The Adapter (DataBaseAdapter) "translates" the MySQL method calls 
into Postgres method calls.
This way, you can use your Postgres database without changing the old code.
**/
