var express = require('express');
var router = express.Router();
const User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');

  User.get().then(([rows,fields]) => {
    console.log(rows);
  });

});

module.exports = router;
