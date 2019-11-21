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
           id: row.id,
      post_id: row.post_id,
      comment: row.comment,
      replies: row.replies
    });
    
    return commentDetails;
  }

  static async getCommentsOfPost(postId){

    console.log(`postId = ${postId}`);

    return await this.connection.execute(
        `SELECT * 
        FROM ${this.table}  
        WHERE post_id=${postId};`
      )
      .then(([rows]) => 
        rows.map(row => this.fromDB(row)))
      .then(values => {
         if (Object.prototype.toString.call(values[0]) === "[object Promise]")
           return Promise.all(values);
         else
           return values;
       });
  }
  
  static async addReplyToComment(replyDetails) {

    // console.log(replyDetails);

    //get the comment by id
    this.findBy('id', replyDetails.id)
    .then(// add reply to the comment
        (comment) => {

            //append new reply to replies array
            let replies = JSON.parse(comment.replies);

            replies.push({
                createdAt: Math.round((new Date()).getTime() / 1000),
                content: replyDetails.content,
                authorId: replyDetails.authorId,
                authorFullName: replyDetails.authorFullName,
                receiverId: replyDetails.receiverId,
                receiveFullName: replyDetails.receiveFullName,
            });

            // console.log(replies);

            this.connection.execute(
                `UPDATE ${this.table} SET replies='${JSON.stringify(replies)}' 
                    WHERE id=${replyDetails.id}`,
                    function(err, results, fields) {
                        if(results.affectedRows == 1)
                            return true;//success add reply
                        else
                            return false;
                    }
            )
        }
    )
    
  }
}

module.exports = Comment;
