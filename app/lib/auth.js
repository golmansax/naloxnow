import { FIREBASE_USER_EMAIL, FIREBASE_USER_PASSWORD } from 'babel-plugin-dotenv';
import { firebaseAuth } from './firebase';

export async function getSignedInUserAsync() {
  const auth = firebaseAuth();
  let removeListener;
  let signInAttempted = false;

  return new Promise((resolve) => {
    removeListener = auth.onAuthStateChanged((user) => {
      if (user) {
        if (removeListener) {
          removeListener();
        }

        resolve(user);
      } else {
        if (signInAttempted) {
          throw new Error('Should not attempt to sign in more than once');
        }

        if (FIREBASE_USER_EMAIL && FIREBASE_USER_PASSWORD) {
          auth.signInWithEmailAndPassword(FIREBASE_USER_EMAIL, FIREBASE_USER_PASSWORD);
        } else {
          auth.signInAnonymously();
        }

        signInAttempted = true;
      }
    });
  });
}
