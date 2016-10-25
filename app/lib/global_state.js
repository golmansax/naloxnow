const state = {
  user: {},
  pushToken: {},
};

export function getGlobalState(key) {
  if (!state[key]) {
    throw new Error(`Key not found on state: ${key}`);
  }

  return state[key];
}

export function setGlobalState(key, value) {
  console.log('SET', key, value);
  state[key] = value;
}
