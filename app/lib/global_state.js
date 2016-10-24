import { firebaseAuth } from './firebase';

const state = {
  user: {},
};

firebaseAuth().onAuthStateChanged((user) => {
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
