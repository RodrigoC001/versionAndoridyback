const defaultStartState = {
  possibleDestinations: [],
  fetching: false,
  error: null
};

export default function trips(state = defaultStartState, action) {
  switch (action.type) {
    case "GET_TRIPS_WITH_ORIGIN_ATTEMPT":
      return Object.assign({}, state, {
        fetching: true
      });
    case "GET_TRIPS_WITH_ORIGIN_SUCCESS":
      return Object.assign({}, state, {
        fetching: false,
        possibleDestinations: action.payload.response
      });
    case "GET_TRIPS_WITH_ORIGIN_FAILURE":
      return Object.assign({}, state, {
        fetching: false,
        error: action.payload.error
      });
    default:
      return state;
  }
}
