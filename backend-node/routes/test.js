var express = require('express');
var router = express.Router();

const { firebaseClient } = require('../utils/firebase');
const { check, validationResult } = require('express-validator');

//Method for simulating the client
router.post('/login', [
  check('email').isEmail(),
  check('password').isLength({min: 6}),
], (req, res, next) => {
  //Forward the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const email = req.body.email;
  const password = req.body.password;
  
  let user, credentials;
  firebaseClient.auth().signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      user = firebaseClient.auth().currentUser;
      credentials = userCredential;
      return user.getIdToken(/* forceRefresh */ true);
    })
    .then(idToken => {
      res.status(200).json({
        userCredential: credentials,
        user: user,
        idToken: idToken
      });
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
