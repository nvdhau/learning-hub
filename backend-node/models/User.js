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
}

module.exports = User;
