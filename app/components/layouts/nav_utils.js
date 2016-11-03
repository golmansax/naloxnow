export function stateHasBackButton(state) {
  return !(state.index === 0 && (!state.parentIndex || state.parentIndex === 0));
}
