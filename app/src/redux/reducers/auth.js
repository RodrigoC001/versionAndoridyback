const defaultStartState = {
  fetching: false,
  user: null,
  error: null
};

export default function auth(state = defaultStartState, action) {
  switch (action.type) {
    case "POST_LOGIN_ATTEMPT":
      return Object.assign({}, state, {
        fetching: true
      });
    case "POST_LOGIN_SUCCESS":
      return Object.assign({}, state, {
        fetching: false,
        user: action.payload.response.data
      });
    case "POST_LOGIN_FAILURE":
      return Object.assign({}, state, {
        fetching: false,
        error: action.payload.error,
        user: null
      });
    case "GET_ME_ATTEMPT":
      return Object.assign({}, state, {
        fetching: true
      });
    case "GET_ME_SUCCESS":
      return Object.assign({}, state, {
        fetching: false,
        user: action.payload.response.data
      });
    case "GET_ME_FAILURE":
      return Object.assign({}, state, {
        fetching: false,
        error: action.payload.error,
        user: null
      });
    default:
      return state;
  }
}