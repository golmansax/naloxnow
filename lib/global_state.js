import { firebaseApp } from './firebase';

const state = {
  user: {}, //firebaseApp.auth().currentUser,
};

firebaseApp.auth().onAuthStateChanged((user) => {
  if (user) {
    state.user = user;
  }
});

export function getGlobalState(key) {
  if (!state[key]) {
    // throw new Error(`Key not found on state: ${key}`);
  }

  return state[key];
}
