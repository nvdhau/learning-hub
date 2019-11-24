const BaseModel = require('../models/BaseModel');
const User = require('../models/User');
const Category = require('../models/Category');
const connection = require('../utils/db');

class Post extends BaseModel {

  static get table() {
    return 'POSTS';
  }

  static get connection() {
    return connection;
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

  static async findByFilterAndTag(conditions) {
    const queryConditions = conditions.map((data, index) => {
      return data.value
    })
    return await this.connection.execute(
        `SELECT * 
        FROM ${this.table} 
        WHERE is_blog = ? AND tags LIKE ?;`,
        [...queryConditions]
      ).then(([rows]) => rows.map(row => this.fromDB(row)))
       .then(values => {
          if (Object.prototype.toString.call(values[0]) === "[object Promise]")
            return Promise.all(values);
          else
            return values;
        });
  }

  static async searchByTitleAndTags(conditions){
    // console.log(conditions);

    //select * from posts where deleted=0 and is_blog=1 and 
    //(title like '%Mobile Dev%' or tags like '%Mobile%' or tags like '%Dev%');
    return await this.connection.execute(
      `SELECT * 
      FROM ${this.table}  
      WHERE deleted=0 AND is_blog=${conditions.isBlog} AND 
      (title LIKE ${"'%" + conditions.search + "%'"} OR
      ${conditions.search.split(" ")
        .map((e) => "tags LIKE '%" + e + "%'")
        .join(" OR ")}
      );`
    ).then(([rows]) => rows.map(row => this.fromDB(row)))
    .then(values => {
        console.log(values);
       if (Object.prototype.toString.call(values[0]) === "[object Promise]")
         return Promise.all(values);
       else
         return values;
     });
  }

  static async findRelatedPosts(post) {

    //Query sample: 
    // select * 
    // from posts 
    // where deleted=0 and is_blog=1 and id<>1 and 
    // (tags like '%#computer%' or tags like '%#nicepicture%');

    return await this.connection.execute(
        `SELECT * 
        FROM ${this.table}  
        WHERE deleted=0 AND is_blog=${post.isBlog? 1:0} AND id<>${post.id} AND (
        ${post.tags.split(" ")
          .map((e) => "tags LIKE '%" + e + "%'")
          .join(" OR ")}
        );`
      ).then(([rows]) => rows.map(row => this.fromDB(row)))
      .then(values => {
         if (Object.prototype.toString.call(values[0]) === "[object Promise]")
           return Promise.all(values);
         else
           return values;
       });
  }

  static async findPostsOfUser(uid) {

    //Query sample: 
    //select * from posts where deleted=0 and user_id='lh4kA3NG88WTJHVfztpVyzsn81v1';

    return await this.connection.execute(
        `SELECT * 
        FROM ${this.table}  
        WHERE deleted=0 AND user_id='${uid}';`
      ).then(([rows]) => rows.map(row => this.fromDB(row)))
      .then(values => {
         if (Object.prototype.toString.call(values[0]) === "[object Promise]")
           return Promise.all(values);
         else
           return values;
       });
  }
}

module.exports = Post;
