const defaultStartState = {
  trips: [],
  fetching: false,
  error: null,
  tripsOrderedToTable: []
};

export default function trips(state = defaultStartState, action) {
  switch (action.type) {
    case "GET_TRIPS_ATTEMPT":
      return Object.assign({}, state, {
        fetching: true
      });
    case "GET_TRIPS_SUCCESS":
      return Object.assign({}, state, {
        fetching: false,
        trips: action.payload.response,
        tripsOrderedToTable: action.payload.response.data.map(trip => {
          const array = [];
          array.push(trip.id.toString());
          array.push(trip.name);
          trip.origin ? array.push(trip.origin.address) : array.push(' ')
          trip.destination ? array.push(trip.destination.address) : array.push(' ')
          return array
        })
      });
    case "GET_TRIPS_FAILURE":
      return Object.assign({}, state, {
        fetching: false,
        error: action.payload.error
      });
    default:
      return state;
  }
}
