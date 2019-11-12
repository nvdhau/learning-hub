const BaseModel = require('../models/BaseModel');
const User = require('../models/User');
const Category = require('../models/Category');

class Post extends BaseModel {

  static get table() {
    return 'POSTS';
  }

  constructor() {
    super();
    this.id = -1;
    this.userId = "";
    this.categoryId = -1;
    this.title = "";
    this.description = "";
    this.tags = "";
    this.imageUrl = "";
    this.createdAt = (new Date()).toISOString().slice(0, 19).replace('T', ' ');
    this.updatedAt = (new Date()).toISOString().slice(0, 19).replace('T', ' ');
    this.deleted = false;
    this.isBlog = false;
  }

  static async fromDB(row) {
    const post = new Post(); 
    Object.assign(post, {
      id: row.id,
      userId: row.user_id,
      categoryId: row.category_id,
      title: row.title,
      description: row.description,
      tags: row.tags,
      imageUrl: row.image_url,
      createdAt: row.created_at.toISOString().slice(0, 19).replace('T', ' '),
      updatedAt: row.updated_at.toISOString().slice(0, 19).replace('T', ' '),
      deleted: Boolean(row.deleted),
      isBlog: Boolean(row.is_blog),
    });
    post.user = await User.findBy('id', post.userId);
    post.category = await Category.findBy('id', post.categoryId);
    return post;
  }

}

module.exports = Post;
