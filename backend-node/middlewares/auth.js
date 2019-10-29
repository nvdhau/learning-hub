const { firebaseAdmin } = require('../utils/firebase');
const User = require('../models/user');

const isAuthenticated = (req, res, next) => {
  if (req.get("Authorization") == null) {
    sendUnauthorize("You need to provide the jwt token in the Authorization field in the header", res);
    return;
  }

  const token = req.get("Authorization");
  firebaseAdmin.auth().verifyIdToken(token)
    .then(decodedToken => {
      let uid = decodedToken.uid;
      return User.findBy('id', uid);
    }).then(user => {
      req.user = user; 
      console.debug(user);
      next();
    }).catch(function(error) {
      console.error(error);
      sendUnauthorize("Invalid token", res);
    });
};

function sendUnauthorize(errorMessage, res) {
  res.status(401).json({
    message: errorMessage
  });
}

module.exports = {
  isAuthenticated
};
