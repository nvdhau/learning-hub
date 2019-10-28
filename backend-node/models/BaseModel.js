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

  static camelToSnakeCase(str) {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  }

  static get() {
    return this.connection.execute(`SELECT * FROM ${this.table}`);
  }

  static create(instance) {
    let instancePropertiesArray = Object.getOwnPropertyNames(instance);
    let instancePropertiesArraySnakeCase = instancePropertiesArray.map(string => this.camelToSnakeCase(string));
    let questionMarksArray = instancePropertiesArray.map(string => '?');
    
    return this.connection.execute(
      `INSERT INTO ${this.table} (${instancePropertiesArraySnakeCase}) VALUES (${questionMarksArray})`,
      Object.values(instance)
    );
  }
}

module.exports = BaseModel;
