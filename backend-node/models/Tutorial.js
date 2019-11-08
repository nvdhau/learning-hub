const BaseModel = require('../models/BaseModel');

class Tutorial extends BaseModel {

  static get table() {
    return 'POSTS';
  }

  constructor() {
    super();
    this.author = "";
    this.category_id = "";
    this.title = true;
    this.description = "";
    this.tags = "";
    this.created_at = (new Date()).toISOString().slice(0, 19).replace('T', ' ');
    this.updated_at = (new Date()).toISOString().slice(0, 19).replace('T', ' ');
    this.deleted = 0;
  }

  static fromDB(row) {
    const tutorial = new Tutorial(); 
    Object.assign(tutorial, {
        author: row.author,
        category_id: row.category_id,
        title: row.title,
        description: row.description,
        tags: row.tags
    });
    return tutorial;
  }

  static get() {
    return super.get()
      .then(([rows]) => rows.map(row => this.fromDB(row)));
  }

  static findBy(propertyName, value) {
    return super.findBy(propertyName, value)
      .then(rows => this.fromDB(rows[0]));
  } 

  static update(tutorial) {
    return super.update(tutorial)
      .then(row => tutorial);
  }
}

module.exports = Tutorial;
