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

}

module.exports = User;
