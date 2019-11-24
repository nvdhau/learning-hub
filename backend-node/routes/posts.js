var express = require('express');
var router = express.Router();

const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Tag = require('../models/Tag');
const { check, validationResult } = require('express-validator');
const { isAuthenticated } = require('../middlewares/auth');
const uploadImageService = require('../utils/uploadImageService');

router.get('/', isAuthenticated, (req, res, next) => {
// router.get('/', (req, res, next) => {
  const filter = req.query.is_blog || '';
  const is_blog = filter == 'blog' ? 1 : 0;
  const tags = req.query.tags || '';
  const search = req.query.search || '';

  const conditions = [
    {value: is_blog}, 
    {value: '%' + tags + '%'}
  ];
  let postClosure = post => {
    const posts = post || [];
    res.status(200).json(posts);
  };

  if (filter === '' && tags === '') {
    Post.get().then(postClosure);
  } else if(search != ''){
    Post.searchByTitleAndTags( 
      {
        "isBlog": is_blog,
        "search": search
      }
    ).then(postClosure);
  }
  else {
    Post.findByFilterAndTag(conditions).then(postClosure);
  }
});

//get all posts by userId
// router.get('/user/:uid', isAuthenticated, (req, res, next) => {
router.get('/user/:uid', (req, res, next) => {
  Post.findPostsOfUser(req.params.uid, req.query.is_blog)
    .then( posts => {
      res.status(200).json(posts);
    });
});

//add new comment
router.post('/:id/comment', (req, res, next) => {

  const newComment = new Comment();
  let commentWithId;
  const { content, authorId, authorFullName} = req.body;
  Object.assign(newComment, {
      post_id: req.params.id,
      comment: JSON.stringify(
        {
          createdAt: Math.round((new Date()).getTime() / 1000),
			    content: content,
			    authorId: authorId,
          authorFullName: authorFullName
        }
      ),
      replies: "[]"
  });

  Comment.create(newComment)
    .then(commentWithId => {
      res.status(201).json(commentWithId);
    }).catch(error => {
      console.log(error);
      res.status(500).json({error: error});
  });

});

//update comment: add new reply for a comment
router.put('/comment/:comment_id/reply', (req, res, next) => {
  const { content, authorId, authorFullName, 
                  receiverId, receiveFullName} = req.body;

  var replyDetails = {
    "id": req.params.comment_id,
    "content": content,
    "authorId": authorId,
    "authorFullName": authorFullName,
    "receiverId": receiverId,
    "receiveFullName": receiveFullName,
  };

  Comment.addReplyToComment(replyDetails);

  res.status(201).json(replyDetails);

});

router.get('/:id/comments', (req, res, next) => {
  Comment.getCommentsOfPost(req.params.id)
    .then(comments => {
      const newComments = comments.map((value, index) => {
        let comment = {};
        comment = JSON.parse(value.comment);
        return {
          id: value.id,
          post_id: value.post_id,
          comment: comment,
          replies: {'commentId': value.id, 'data': JSON.parse(value.replies)}
        }
      })
      console.log(newComments);
      res.status(201).json(newComments);
    }).catch(error => {

      console.log(error);
      res.status(404).json({});
    }) 
});

// router.get('/:id', (req, res, next) => {
//   let id = req.params.id;
//   Post.findBy('id', id)
//     .then(post => {
//       res.status(200).json(post);
//     }).catch(error => {
//       console.log(error);
//       res.status(404).json({});
//     });
// });

//Post with related posts by tags
//update posts tags
//update posts set tags = '#bctax #nicepicture' where id=2;
//update posts set tags = '#supplychain #computer #nicepicture' where id=6;
router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  let postDetails;// final returned post

  let postClosure = post => {
    const posts = post || [];

    postDetails.relatedPosts = posts;

    res.status(200).json(postDetails);
  };

  Post.findBy('id', id)
    .then(post => {

      postDetails = post;
      //get all post details (related posts)
      Post.findRelatedPosts(post).then(postClosure);

    }).catch(error => {
      console.log(error);
      res.status(404).json({});
    });
});

router.delete('/:id', isAuthenticated, [
  check('id').isLength({min: 1}),
], (req, res, next) => {
  //Forward the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let id = req.params.id;
  Post.findBy('id', id)
    .then(post => {
      post.deleted = true;
      return Post.update(post);
    }).then(post => {
      res.status(200).json(post);
    }).catch(error => {
      console.log(error);
      res.status(404).json({});
    });
});

router.put('/', uploadImageService.single('image'), isAuthenticated, [
  check('id').isLength({min: 1}),
  check('userId').isLength({min: 1}),
  check('categoryId').isLength({min: 1}),
  check('title').isLength({min: 1}),
  check('description').isLength({min: 1}),
  check('tags').isLength({min: 1}),
  check('createdAt').isLength({min: 1}),
  check('isBlog').isLength({min: 1}),
], (req, res, next) => {
  //Forward the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const post = new Post();
  const { id, userId, categoryId, title, description, tags, createdAt, isBlog } = req.body;
  Object.assign(post, {
    id: id,
    userId: userId,
    categoryId: categoryId,
    title: title,
    description: description,
    tags: tags,
    createdAt: createdAt,
    isBlog: isBlog
  });
  let postResult;
  Post.update(post)
    .then(postTemp => {
      postResult = postTemp;
      return Tag.checkIfAdd(tags)
    }).then(_ => {
      res.status(200).json(postResult);
    }).catch(error => {
      console.log(error);
      res.status(500).json({error: error});
    });
});

router.post('/create', uploadImageService.single('image'), isAuthenticated, [
  check('categoryId').isLength({min: 1}),
  check('title').isLength({min: 1}),
  check('description').isLength({min: 1}),
  check('tags').isLength({min: 1}),
  check('isBlog').isLength({min: 1}),
], (req, res, next) => {
  //Forward the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else if (!req.file) {
    console.log(req.files);
    return res.status(422).json({
        message: "missing an upload file"
    });
  }
  
  req.body.imageURLs = process.env.UPLOAD_IMAGE_FOLDER + req.file.filename;
  const post = new Post();
  let postWithId;
  const { categoryId, title, description, tags, isBlog, imageURLs } = req.body;
  Object.assign(post, {
    userId: req.user.id,
    categoryId: categoryId,
    title: title,
    description: description,
    tags: tags,
    isBlog: isBlog,
    imageUrl: imageURLs
  });
  Post.create(post)
    .then(postWithIdTemp => {
      postWithId = postWithIdTemp;
      return Tag.checkIfAdd(tags);
    }).then(_ => {
      res.status(201).json(postWithId);
    }).catch(error => {
      console.log(error);
      res.status(500).json({error: error});
    });
});

router.post('/video-upload', uploadImageService.single('video'), (req, res, next) => {
  // return url file name
  const imageURLs = process.env.UPLOAD_VIDEO_FOLDER + req.file.filename;
  res.status(200).json({
    url: imageURLs,
    file: req.file
  });
});

router.post('/create-video', isAuthenticated, [
  check('categoryId').isLength({min: 1}),
  check('title').isLength({min: 1}),
  check('tags').isLength({min: 1}),
  check('isBlog').isLength({min: 1}),
  check('videourl').isLength({min: 1}),
], (req, res, next) => {

  const post = new Post();
  let postWithId;
  const { categoryId, title, description, tags, isBlog, videourl } = req.body;
  Object.assign(post, {
    userId: req.user.id,
    categoryId: categoryId,
    title: title,
    description: description,
    tags: tags,
    isBlog: isBlog,
    imageUrl: videourl
  });
  Post.create(post)
    .then(postWithIdTemp => {
      postWithId = postWithIdTemp;
      return Tag.checkIfAdd(tags);
    }).then(_ => {
      res.status(201).json(postWithId);
    }).catch(error => {
      console.log(error);
      res.status(500).json({error: error});
    });
});

module.exports = router;