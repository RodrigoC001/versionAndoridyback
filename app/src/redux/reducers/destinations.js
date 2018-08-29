const defaultStartState = {
  createdDestination: null
};

export default function origins(state = defaultStartState, action) {
  switch (action.type) {
    case "POST_DESTINATION_ATTEMPT":
      return Object.assign({}, state, {
        fetching: true
      });
    case "POST_DESTINATION_SUCCESS":
      return Object.assign({}, state, {
        fetching: false,
        createdDestination: action.payload.response
      });
    case "POST_DESTINATION_FAILURE":
      return Object.assign({}, state, {
        fetching: false,
        error: action.payload.error
      });
    default:
      return state;
  }
}
