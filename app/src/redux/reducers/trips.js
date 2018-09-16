const defaultStartState = {
  trip: {},
  trips: [],
  fetching: false,
  error: null,
  tripsOrderedToTable: [],
  createdTrip: null,
  modifiedTrip: {},
  deletedTrip: null
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
          // push string of skyspots id separated by a comma
          array.push(trip.skyspots.map(skyspot => skyspot.id).join(', '))
          return array
        })
      });
    case "GET_TRIPS_FAILURE":
      return Object.assign({}, state, {
        fetching: false,
        error: action.payload.error
      });
    case "GET_TRIP_ATTEMPT":
      return Object.assign({}, state, {
        fetching: true
      });
    case "GET_TRIP_SUCCESS":
      return Object.assign({}, state, {
        fetching: false,
        trip: action.payload.response,
      });
    case "GET_TRIP_FAILURE":
      return Object.assign({}, state, {
        fetching: false,
        error: action.payload.error
      });
    case "POST_TRIP_ATTEMPT":
      return Object.assign({}, state, {
        fetching: true
      });
    case "POST_TRIP_SUCCESS":
      return Object.assign({}, state, {
        fetching: false,
        createdTrip: action.payload.response
      });
    case "POST_TRIP_FAILURE":
      return Object.assign({}, state, {
        fetching: false,
        error: action.payload.error
      });
    case "PUT_TRIP_ATTEMPT":
      return Object.assign({}, state, {
        fetching: true
      });
    case "PUT_TRIP_SUCCESS":
      return Object.assign({}, state, {
        fetching: false,
        modifiedTrip: action.payload.response
      });
    case "PUT_TRIP_FAILURE":
      return Object.assign({}, state, {
        fetching: false,
        error: action.payload.error
      });
    case "DELETE_TRIP_ATTEMPT":
      return Object.assign({}, state, {
        fetching: true
      });
    case "DELETE_TRIP_SUCCESS":
      return Object.assign({}, state, {
        fetching: false,
        deletedTrip: action.payload.response
      });
    case "DELETE_TRIP_FAILURE":
      return Object.assign({}, state, {
        fetching: false,
        error: action.payload.error
      });    
    default:
      return state;
  }
}
