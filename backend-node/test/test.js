
/**
 * Load .env variables
 */

require('dotenv').config();

const supertest = require("supertest");
const should = require("should");

const server = supertest.agent(`http://localhost:${process.env.PORT}`);

const Category = require('../models/Category');
const Post = require('../models/Post');
const Tag = require('../models/Tag');

const usersCreated = [];

describe("Posts DeleteAll", () => {
  it("should delete all posts", done => {
    Post.deleteAll().then(_ => done());
  });
});

describe("Users tests", () => {
  it("should delete all the users", done => {
    server
      .delete("/api/users")
      .expect(200)
      .end((err, res) => {
        // HTTP status should be 200
        res.status.should.equal(200);
        done();
      });
  });

  describe("Creating Users", () => {
    const users = [
      { email: `user1@lh.com`, password: 'testtest', username: `user1`, fullName: 'Fabio Makepeace'},
      { email: `user2@lh.com`, password: 'testtest', username: `user2`, fullName: 'Chaunce McKirdy'},
      { email: `user3@lh.com`, password: 'testtest', username: `user3`, fullName: 'Merline Hintzer' },
      { email: `user4@lh.com`, password: 'testtest', username: `user4`, fullName: 'Louise Mitchell' },
      { email: `user5@lh.com`, password: 'testtest', username: `user5`, fullName: 'Kerwinn Menezes' },
    ];
    users.forEach((user, index) => {
      it(`should mock user ${user.email}`, done => {
        server
          .post("/api/users/create")
          .send(user)
          .expect(201)
          .end((err, res) => {
            // HTTP status should be 200
            res.status.should.equal(201);
            usersCreated.push(res.body);
            done();
          });
      });
    });
  });
});

describe("Categories tests", () => {
  it("should delete all the categories", done => {
    Category.deleteAll().then(_ => done());
  });

  describe("Creating Categories", () => {
    const categories = [
      { id:1, name:'Computer Science' },
      { id:2, name:'Information System' },
      { id:3, name:'Accounting' },
      { id:4, name:'Finance' },
      { id:5, name:'Business' },
    ];
    categories.forEach((category, index) => {
      it(`should mock category ${category.name}`, done => {
        Category.createWithId(category).then(_ => done());
      });
    });
  });
});

describe("Posts tests", () => {
  describe('Creating Posts', () => {
    const posts = [
      { 
        id: 1,
        categoryId: 1,
        title: 'title test',
        description: 'description test',
        tags: '#test1 #test2',
        createdAt: '2019-11-11 06:57:19',
        updatedAt: '2019-11-11 06:57:19',
        deleted: false,
        isBlog: true
      }
    ];
    posts.forEach((post, index) => {
      it(`should create post ${post.title}`, done => {
        post.userId = usersCreated[(Math.floor((Math.random() * usersCreated.length)))].id;
        Post.createWithId(post)
          .then(_ => Tag.checkIfAdd(post.tags))
          .then(_ => {
            done();
          });
      });
    });
  });
});
