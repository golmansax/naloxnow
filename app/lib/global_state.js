const state = new Map([
  ['user', {}],
  ['pushToken', {}],
  ['cachedStatus', null],
]);

export function getGlobalState(key) {
  if (!state.has(key)) {
    throw new Error(`Key not found on state: ${key}`);
  }

  return state.get(key);
}

export function setGlobalState(key, value) {
  state.set(key, value);
}
