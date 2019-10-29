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

  static findBy(propertyName, value) {
    return this.connection.execute(
      `SELECT * FROM ${this.table} WHERE ${propertyName} = ?`,
      [value]
    ).then(([rows]) => {
      if (rows.length <= 0)
        throw `Table ${this.table} with ${propertyName} = ${value} not found`;
      return rows;
    });
  }

  static update(instance) {
    let instancePropertiesArray = Object.getOwnPropertyNames(instance);
    let instancePropertiesArraySnakeCase = instancePropertiesArray.map(string => `${this.camelToSnakeCase(string)} = ?`);
    let values = Object.values(instance);
    values.push(values[0]);
    
    return this.connection.execute(
      `UPDATE ${this.table} SET ${instancePropertiesArraySnakeCase.toString()} WHERE ${instancePropertiesArraySnakeCase[0]}`,
      values
    ).then(([rows]) => {
      if (rows.affectedRows == 1)
        return rows;
      else
        throw `Table ${this.table} has more than 1 record that match ${instancePropertiesArraySnakeCase[0]}`;
    });
  }
}

module.exports = BaseModel;
