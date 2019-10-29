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
firebase.initializeApp(firebaseConfig);


module.exports = {
  firebaseAdmin: admin,
  firebaseClient: firebase
};
