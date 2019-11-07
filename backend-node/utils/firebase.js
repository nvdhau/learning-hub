const admin = require("firebase-admin");
const serviceAccount = require('../service-account-file.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

//Config for testing a js client of firebase for login token
let firebase = null;
try {
  firebase = require("firebase");
  const { firebaseConfig } = require('../firebaseConfig.js');
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
} catch(error) {
  firebase = null;
  console.error('If you want to test the login follow the instructions in the commit:');
  console.error('\thttps://github.com/quanglee/special-topic-4280/commit/32b0259c6586867a862496883dd26d47df27cc33');
}

module.exports = {
  firebaseAdmin: admin,
  firebaseClient: firebase
};
