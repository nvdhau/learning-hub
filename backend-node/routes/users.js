var express = require('express');
var router = express.Router();

const { firebaseAdmin } = require('../utils/firebase');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const { isAuthenticated } = require('../middlewares/auth');
const uploadImageService = require('../utils/uploadImageService');

/* GET users listing. */
router.get('/', isAuthenticated, (req, res, next) => {
  User.get().then(users => {
    res.status(200).json(users);
  });
});

router.put('/', isAuthenticated, [
  check('id').isLength({min: 1}),
  check('username').isLength({min: 1}),
  check('fullName').isLength({min: 1}),
  check('isActive').isLength({min: 1}),
], (req, res, next) => {
  //Forward the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const user = new User();
  Object.assign(user, req.body);
  User.update(user)
    .then(user => {
      res.status(200).json(user);
    }).catch(error => {
      console.log(error);
      res.status(500).json({error: error});
    });
});

router.get('/:uid', isAuthenticated, (req, res, next) => {
  let uid = req.params.uid;
  User.findBy('id', uid)
    .then(user => {
      res.status(200).json(user);
    }).catch(error => {
      console.log(error);
      res.status(404).json({});
    });
});

router.delete('/', (req, res, next) => {
  firebaseAdmin.auth().listUsers(30)
    .then(listUsersResult => {
      const deletePromisesArray = listUsersResult.users.map(userRecord => firebaseAdmin.auth().deleteUser(userRecord.uid));
      return Promise.all(deletePromisesArray);
    }).then(deletePromisesResult => User.deleteAll())
    .then(_ => {
      res.status(200).json({});
    }).catch(error => {
      console.log(error);
      res.status(404).json({});
    });
});

router.post('/create', uploadImageService.single('image'), [
  check('email').isEmail(),
  check('password').isLength({min: 6}),
  check('fullName').isLength({min: 1}),
  check('username').isLength({min: 1})
], (req, res, next) => {
  //Forward the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } /*else if (!req.file) {
    console.log(req.files);
    return res.status(422).json({
        message: "missing an upload file"
    });
  } */

  const userRequest = req.body;
  firebaseAdmin.auth().createUser({
    email: userRequest.email,
    password: userRequest.password,
    //photoURL: `${req.protocol}://${req.get('host')}/images/${encodeURI(req.file.filename)}`
  })
    .then(userRecord => {
      userDB = new User();
      Object.assign(userDB, {
        id: userRecord.uid,
        username: userRequest.username,
        fullName: userRequest.fullName
      });
      return User.createWithId(userDB);
    })
    .then(([rows]) => {
      res.status(201).json(userDB);
    })
    .catch(err => {
      console.error(err);
      let status = 400;
      if (err != null && err.errorInfo != null && err.errorInfo.code == 'auth/email-already-exists')
        status = 409;
      res.status(status).json({
        message: err.errorInfo.message
      });
    });
});

module.exports = router;
