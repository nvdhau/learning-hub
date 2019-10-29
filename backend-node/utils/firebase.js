const admin = require("firebase-admin");
const serviceAccount = require('../service-account-file.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});


//Config for testing a js client of firebase for login token
const firebase = require("firebase");
const { firebaseConfig } = require('../firebaseConfig.js');
// Initialize Firebase
if (!firebaseConfig) {
  console.error('Include the files in which is mention in the commit in the Test Login section');
  console.error('https://github.com/quanglee/special-topic-4280/commit/32b0259c6586867a862496883dd26d47df27cc33');
} else {
  firebase.initializeApp(firebaseConfig);
}


module.exports = {
  firebaseAdmin: admin,
  firebaseClient: firebase
};
