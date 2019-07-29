const admin = require("firebase-admin");
var serviceAccount = require("../config/firebase-sdk.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://selva-jquery-sampleanime.firebaseio.com"
  });
module.exports.db = admin.firestore();
