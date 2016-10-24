/* eslint-disable no-process-env */

import firebase from 'firebase';

const {
  FIREBASE_DATABASE_URL,
  FIREBASE_SERVICE_ACCOUNT_PROJECT_ID,
  FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL,
  FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY,
} = process.env;

firebase.initializeApp({
  serviceAccount: {
    projectId: FIREBASE_SERVICE_ACCOUNT_PROJECT_ID,
    clientEmail: FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL,
    privateKey: FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY,
  },
  databaseURL: FIREBASE_DATABASE_URL,
});

export const firebaseDB = () => firebase.database();
