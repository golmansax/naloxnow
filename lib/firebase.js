import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
} from 'babel-plugin-dotenv';

export const firebaseApp = firebase.initializeApp({
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
});

// Anonymous sign in so we can have access to database
firebaseApp.auth().signInAnonymously().catch((err) => alert(err.message));
