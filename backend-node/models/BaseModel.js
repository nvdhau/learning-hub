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

  static fromDB(row) {
    const baseModel = new BaseModel(); 
    return baseModel;
  }

  static camelToSnakeCase(str) {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  }

  static get() {
    return this.connection.execute(`SELECT * FROM ${this.table}`)
      .then(([rows]) => rows.map(row => this.fromDB(row)))
      .then(values => {
        if (Object.prototype.toString.call(values[0]) === "[object Promise]")
          return Promise.all(values);
        else 
          return values;
      });
  }

  static createWithId(instance) {
    let instancePropertiesArray = Object.getOwnPropertyNames(instance);
    let instancePropertiesArraySnakeCase = instancePropertiesArray.map(string => this.camelToSnakeCase(string));
    let questionMarksArray = instancePropertiesArray.map(string => '?');
    
    return this.connection.execute(
      `INSERT INTO ${this.table} (${instancePropertiesArraySnakeCase}) VALUES (${questionMarksArray})`,
      Object.values(instance)
    ).catch(error => {
      console.debug(error);
    });
  }

  static create(instance) {
    let instancePropertiesArray = Object.getOwnPropertyNames(instance);
    instancePropertiesArray.shift();
    let instancePropertiesArraySnakeCase = instancePropertiesArray.map(string => this.camelToSnakeCase(string));
    let questionMarksArray = instancePropertiesArray.map(string => '?');
    let valuesWithoutId = Object.values(instance);
    valuesWithoutId.shift();
    
    return this.connection.execute(
      `INSERT INTO ${this.table} (${instancePropertiesArraySnakeCase}) VALUES (${questionMarksArray})`,
      valuesWithoutId
    ).then(([rows,fields]) => {
      instance.id = rows.insertId;
      return instance;
    });
  }

  static findBy(propertyName, value) {
    return this.connection.execute(
      `SELECT * FROM ${this.table} WHERE ${propertyName} = ?`,
      [value]
    ).then(([rows]) => {
      if (rows.length <= 0)
        throw `Table ${this.table} with ${propertyName} = ${value} not found`;
      return rows;
    }).then(rows => this.fromDB(rows[0]));
  }

  static findByNoException(propertyName, value) {
    return this.findBy(propertyName, value)
      .then(instance => instance)
      .catch(error => null);
  }

  static deleteBy(propertyName, value) {
    return this.connection.execute(
      `DELETE FROM ${this.table} WHERE ${propertyName} = ?`,
      [value]
    ).then(([rows]) => {
      if (rows.affectedRows <= 0)
        throw `Table ${this.table} with ${propertyName} = ${value} not deleted`;
      return rows;
    });
  }

  static deleteAll() {
    return this.connection.execute(
      `DELETE FROM ${this.table}`
    ).then(([rows]) => {
      if (rows.length <= 0)
        throw `Table ${this.table} with ${propertyName} = ${value} not deleted`;
      console.log(rows);
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
    }).then(row => instance);
  }
}

module.exports = BaseModel;
