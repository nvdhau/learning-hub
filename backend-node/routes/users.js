var express = require('express');
var router = express.Router();

const { firebaseAdmin } = require('../utils/firebase');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');

  User.get().then(([rows,fields]) => {
    console.log(rows);
  });

});

router.post('/create', [
  check('email').isEmail(),
  check('password').isLength({min: 6}),
  check('fullName').isLength({min: 1}),
  check('username').isLength({min: 1})
], (req, res, next) => {
  //Forward the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const userRequest = req.body;
  let userDB;
  firebaseAdmin.auth().createUser(userRequest)
    .then(userRecord => {
      userDB = new User(userRecord.uid, userRequest.username, userRequest.fullName);
      return User.create(userDB);
    })
    .then(([rows]) => {
      res.status(201).json(userDB);
    })
    .catch(err => {
      console.log(err);
      let status = 400;
      if (err != null && err.errorInfo != null && err.errorInfo.code == 'auth/email-already-exists')
        status = 409;
      res.status(status).json({
        message: err.errorInfo.message
      });
    });
});

module.exports = router;
