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

  static findBy(propertyName, value) {
    return super.findBy(propertyName, value)
      .then((rows) => this.fromDB(rows[0]));
  } 
}

module.exports = User;
