const BaseModel = require('../models/BaseModel');

class Category extends BaseModel {

  static get table() {
    return 'CATEGORIES';
  }

  constructor() {
    super();
    this.id = -1;
    this.name = "";
  }

  static fromDB(row) {
    const category = new Category(); 
    Object.assign(category, {
      id: row.id,
      name: row.name,
    });
    return category;
  }

}

module.exports = Category;
