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
    this.following = "";
    this.followers = "";
    this.favorites = "";
    this.isActive = true;
  }

  static fromDB(row) {
    const user = new User(); 
    Object.assign(user, {
      id: row.id,
      username: row.username,
      fullName: row.full_name,
      following: row.following,
      followers: row.followers,
      favorites: row.favorites,
      isActive: Boolean(row.is_active),
    });
    return user;
  }

}

module.exports = User;
