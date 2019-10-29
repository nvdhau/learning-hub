const BaseModel = require('../models/BaseModel');

class User extends BaseModel {

  static get table() {
    return 'USERS';
  }

  constructor(id, username, fullName, isActive = true) {
    super();
    this.id = id;
    this.username = username;
    this.fullName = fullName;
    this.isActive = isActive;
  }

  static fromDB(row) {
    return new User(row.id, row.username, row.full_name, Boolean(row.is_active));
  }

  static get() {
    return super.get()
      .then(([rows]) => rows.map(row => this.fromDB(row)));
  }

  static findBy(propertyName, value) {
    return super.findBy(propertyName, value)
      .then(rows => this.fromDB(rows[0]));
  } 

  static update(user) {
    return super.update(user)
      .then(row => user);
  }
}

module.exports = User;
