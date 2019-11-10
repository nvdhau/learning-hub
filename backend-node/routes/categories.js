var express = require('express');
var router = express.Router();

const Category = require('../models/Category');
const { check, validationResult } = require('express-validator');
const { isAuthenticated } = require('../middlewares/auth');

router.get('/', (req, res, next) => {
  Category.get().then(category => {
    res.status(200).json(category);
  });
});

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Category.findBy('id', id)
    .then(category => {
      res.status(200).json(category);
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
  Category.deleteBy('id', id)
    .then(_ => {
      res.status(200).json({});
    }).catch(error => {
      console.log(error);
      res.status(404).json({});
    });
});

router.put('/', isAuthenticated, [
  check('id').isLength({min: 1}),
  check('name').isLength({min: 1}),
], (req, res, next) => {
  //Forward the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const category = new Category();
  Object.assign(category, req.body);
  Category.update(category)
    .then(category => {
      res.status(200).json(category);
    }).catch(error => {
      console.log(error);
      res.status(500).json({error: error});
    });
});

router.post('/create', isAuthenticated, [
  check('name').isLength({min: 1}),
], (req, res, next) => {
  //Forward the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const category = new Category();
  Object.assign(category, req.body);
  Category.create(category)
    .then(categoryWithId => {
      res.status(201).json(categoryWithId);
    }).catch(error => {
      console.log(error);
      res.status(500).json({error: error});
    });
});

module.exports = router;
