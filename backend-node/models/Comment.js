const BaseModel = require('../models/BaseModel');
const User = require('../models/User');
const Category = require('../models/Category');
const connection = require('../utils/db');

class Comment extends BaseModel {

  static get table() {
    return 'COMMENTS';
  }

  static get connection() {
    return connection;
  }

  constructor() {
    super();
    this.id = -1;
    this.post_id = -1;
    this.comment = "";
    this.replies = "";
  }

  static async fromDB(row) {
    const commentDetails = new Comment(); 

    Object.assign(commentDetails, {
      post_id: row.post_id,
      comment: row.comment,
      replies: row.replies
    });
    
    return commentDetails;
  }

  
//   static async findRelatedPosts(post) {

    //Query sample: 
    // select * 
    // from posts 
    // where deleted=0 and is_blog=1 and id<>1 and 
    // (tags like '%#computer%' or tags like '%#nicepicture%');

    // return await this.connection.execute(
    //     `SELECT * 
    //     FROM ${this.table}  
    //     WHERE deleted=0 AND is_blog=${post.isBlog? 1:0} AND id<>${post.id} AND (
    //     ${post.tags.split(" ")
    //       .map((e) => "tags LIKE '%" + e + "%'")
    //       .join(" OR ")}
    //     );`
    //   ).then(([rows]) => rows.map(row => this.fromDB(row)))
    //   .then(values => {
    //      if (Object.prototype.toString.call(values[0]) === "[object Promise]")
    //        return Promise.all(values);
    //      else
    //        return values;
    //    });
//   }
}

module.exports = Comment;
