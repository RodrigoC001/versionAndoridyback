const defaultStartState = {
  createdOrigin: null
};

export default function origins(state = defaultStartState, action) {
  switch (action.type) {
    case "POST_ORIGIN_ATTEMPT":
      return Object.assign({}, state, {
        fetching: true
      });
    case "POST_ORIGIN_SUCCESS":
      return Object.assign({}, state, {
        fetching: false,
        createdOrigin: action.payload.response
      });
    case "POST_ORIGIN_FAILURE":
      return Object.assign({}, state, {
        fetching: false,
        error: action.payload.error
      });
    default:
      return state;
  }
}
