var express = require('express');
var router = express.Router();

const Post = require('../models/Post');
const Tag = require('../models/Tag');
const { check, validationResult } = require('express-validator');
const { isAuthenticated } = require('../middlewares/auth');
const uploadImageService = require('../utils/uploadImageService');

router.get('/', isAuthenticated, (req, res, next) => {
  const filter = req.query.is_blog || '';
  const is_blog = filter == 'blog' ? 1 : 0;
  const tags = req.query.tags || '';
  const conditions = [
    {value: is_blog}, 
    {value: '%' + tags + '%'}
  ];
  Post.findByFilterAndTag(conditions).then(post => {
    const posts = post || [];
    res.status(200).json(posts);
  });
});

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Post.findBy('id', id)
    .then(post => {
      res.status(200).json(post);
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

module.exports = router;
