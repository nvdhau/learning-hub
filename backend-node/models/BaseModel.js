const mysql = require('mysql2');

class BaseModel {

  static get table() { 
    return 'base_model';
  }

  static get connection() {
    return mysql.createPool({
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
    }).promise();
  }

  static get() {
    return this.connection.execute(`SELECT * FROM ${this.table}`);
  }

}

module.exports = BaseModel;
