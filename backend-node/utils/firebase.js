const admin = require("firebase-admin");
const serviceAccount = require('../service-account-file.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

module.exports = {
  firebaseAdmin: admin
};
