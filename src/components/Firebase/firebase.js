import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.facebook = new app.auth.FacebookAuthProvider();
    this.google = new app.auth.GoogleAuthProvider();
    this.db = app.database();
  }

  doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebook);

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.google);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) => this.auth.currentUser.updatePassword(password);

  user = (uid) => this.db.ref(`users/${uid}`);

  users = () => this.db.ref("users");

  session = (uid) => this.db.ref(`sessions/${uid}`);

  sessions = () => this.db.ref("sessions");
}

export default Firebase;
