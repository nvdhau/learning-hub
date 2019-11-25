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
        fullName: userRequest.fullName,
        //update default value of following and followers
        following: "[]",
        followers: "[]",
        favorites: "[]"
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



// Edit current database schema
// ALTER TABLE users ADD following TEXT;
// ALTER TABLE users ADD followers TEXT;
// UPDATE users SET following='[]';
// UPDATE users SET followers='[]';

//add unique object to a JSON array
function addUniqueUserToArray(arr, user){

  //remove
  arr = arr.filter(e => e.id != user.id);
  //add again
  arr.push({
    id: user.id,
    username: user.username,
    fullName: user.fullName
  });

  return arr;
}

//follow a user
router.put('/:current_uid/follow/:uid', 
// isAuthenticated, [
//   check('id').isLength({min: 1}),
//   check('username').isLength({min: 1}),
//   check('fullName').isLength({min: 1}),
//   check('isActive').isLength({min: 1}),
// ], 
(req, res, next) => {

  let user1Id = req.params.current_uid;
  let user2Id = req.params.uid;

  if(user1Id == user2Id) 
    return res.status(400).json({message: "2 user ids are the same!"});

  let user1, user2;
  let result = [];//updated user1 and user2

  //find user1
  User.findBy('id', user1Id)
    .then(user => { user1 = user;

      //find user2
      User.findBy('id', user2Id)
      .then(user => { user2 = user;
         
          //update user1: 
          //add user2 to following list of user1: by remove then add
          let followingOfUser1 = JSON.parse(user1.following);
          user1.following = JSON.stringify(
            addUniqueUserToArray(followingOfUser1, user2));

          //update user2: 
          //add user1 to followers list of user2: by remove then add
          let followersOfUser2 = JSON.parse(user2.followers);
          user2.followers = JSON.stringify(
            addUniqueUserToArray(followersOfUser2, user1));

          //update both user should use transaction 
          User.update(user1)
            .then(user => { result.push(user);

              //update user2
              User.update(user2)
                .then(user => { result.push(user);

                  res.status(200).json(result);
                })
            })
      }).catch(error => {
        console.log(error);
        res.status(404).json({});
      });
    }).catch(error => {
      console.log(error);
      res.status(404).json({});
  });
});

//unfollow a user (copy and edit from follow a user)
router.put('/:current_uid/unfollow/:uid', 
// isAuthenticated, [
//   check('id').isLength({min: 1}),
//   check('username').isLength({min: 1}),
//   check('fullName').isLength({min: 1}),
//   check('isActive').isLength({min: 1}),
// ], 
(req, res, next) => {

  let user1Id = req.params.current_uid;
  let user2Id = req.params.uid;

  if(user1Id == user2Id) 
    return res.status(400).json({message: "2 user ids are the same!"});

  let user1, user2;
  let result = [];

  //find user1
  User.findBy('id', user1Id)
    .then(user => { user1 = user;

      //find user2
      User.findBy('id', user2Id).then(user => { user2 = user;

          //update user1: 
          //remove user2 from following list of user1
          let followingOfUser1 = JSON.parse(user1.following);
          followingOfUser1 = followingOfUser1.filter(e => e.id != user2.id);
          user1.following = JSON.stringify(followingOfUser1);

          //update user2: 
          //remove user1 from followers list of user2
          let followersOfUser2 = JSON.parse(user2.followers);
          followersOfUser2 = followersOfUser2.filter(e => e.id != user1.id);
          user2.followers = JSON.stringify(followersOfUser2);

          //update both user should use transaction 
          User.update(user1)
            .then(user => { result.push(user);

              //update user2
              User.update(user2)
                .then(user => { result.push(user);

                  res.status(200).json(result);
                })
            })
      }).catch(error => {
        console.log(error);
        res.status(404).json({});
      });
    }).catch(error => {
      console.log(error);
      res.status(404).json({});
  });
});


// ALTER TABLE users ADD favorites TEXT;
// UPDATE users SET favorites='[]';

//favorites a post
//NOTE: front end must check, authors cannot favorite their own posts
//post.user.id != loggedInUser.id
router.put('/:uid/favorites/:pid', 
// isAuthenticated, [
//   check('id').isLength({min: 1}),
//   check('username').isLength({min: 1}),
//   check('fullName').isLength({min: 1}),
//   check('isActive').isLength({min: 1}),
// ], 
(req, res, next) => {

  let uid = req.params.uid;
  let postId = req.params.pid;

  //find user
  User.findBy('id', uid)
    .then(user => { 

      let favorites = JSON.parse(user.favorites);
      console.log(favorites);
      favorites = favorites.filter(e => e != postId);
      favorites.push(postId);
      user.favorites = JSON.stringify(favorites);

      User.update(user)
        .then( user => {
          res.status(200).json(user);
        }
      );
    
    }).catch(error => {
      console.log(error);
      res.status(404).json({});
  });

});

//unfavorites a post
router.put('/:uid/unfavorites/:pid', 
// isAuthenticated, [
//   check('id').isLength({min: 1}),
//   check('username').isLength({min: 1}),
//   check('fullName').isLength({min: 1}),
//   check('isActive').isLength({min: 1}),
// ], 
(req, res, next) => {
  let uid = req.params.uid;
  let postId = req.params.pid;

  //find user
  User.findBy('id', uid)
    .then(user => { 

      let favorites = JSON.parse(user.favorites);
      favorites = favorites.filter(e => e != postId);
      user.favorites = JSON.stringify(favorites);

      User.update(user)
        .then( user => {
          res.status(200).json(user);
        }
      );
    
    }).catch(error => {
      console.log(error);
      res.status(404).json({});
  });
});

module.exports = router;
