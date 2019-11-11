var express = require('express');
var router = express.Router();

const Tag = require('../models/Tag');

router.get('/', (req, res, next) => {
  Tag.get().then(tags => {
    res.status(200).json(tags);
  });
});

module.exports = router;
