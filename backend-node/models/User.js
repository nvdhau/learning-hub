const BaseModel = require('../models/BaseModel');

class User extends BaseModel {
  static get table() {
    return 'users';
  }
}

module.exports = User;
