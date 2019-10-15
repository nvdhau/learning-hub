const BaseModel = require('../models/BaseModel');

class User extends BaseModel {
  static table = 'users';
}

module.exports = User;
