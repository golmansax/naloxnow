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

        auth.signInAnonymously();
        signInAttempted = true;
      }
    });
  });
}
