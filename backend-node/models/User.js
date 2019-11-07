const BaseModel = require('../models/BaseModel');

class User extends BaseModel {

  static get table() {
    return 'USERS';
  }

  constructor() {
    super();
    this.id = -1;
    this.username = "";
    this.fullName = "";
    this.isActive = true;
  }

  static fromDB(row) {
    const user = new User(); 
    Object.assign(user, {
      id: row.id,
      username: row.username,
      fullName: row.full_name,
      isActive: Boolean(row.is_active),
    });
    return user;
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
