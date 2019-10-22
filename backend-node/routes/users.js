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
  check('password').isLength({min: 6})
], (req, res, next) => {
  //Forward the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const user = req.body;
  firebaseAdmin.auth().createUser(user)
    .then(userRecord => {
      delete user.password;
      user.uid = userRecord.uid;
      return new Promise((resolve, reject) => resolve()); //User.saveUser(user);
    })
    .then(resultData => {
      res.status(201).json(user);
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
