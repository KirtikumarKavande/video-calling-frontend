function streamReducerFunction(state, action) {
  switch (action.type) {
    case "ADD_USER_STREAM":
      return [...state, state.payload.stream];
      return state;
    case "REMOVE_USER_STREAM":
      return { state };
    default:
      return { state };
  }
}
export default streamReducerFunction;
