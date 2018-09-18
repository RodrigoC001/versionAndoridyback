const defaultStartState = {
  createdDestination: null,
  destinations: [],
  destinationsOrderedToTable: [],
  destination: null,
  deletedDestination: null,
};

export default function destinations(state = defaultStartState, action) {
  switch (action.type) {
    case "GET_DESTINATIONS_ATTEMPT":
      return Object.assign({}, state, {
        fetching: true
      });
    case "GET_DESTINATIONS_SUCCESS":
      // order the destinations alphabetically
      let destinations = action.payload.response.data.sort((a, b) => {
          let textA = a.address.toUpperCase();
          let textB = b.address.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
        })
      return Object.assign({}, state, {
        fetching: false,
        destinations,
        destinationsOrderedToTable: action.payload.response.data.map(destination => {
          const array = [];
          array.push(destination.id.toString());
          array.push(destination.address);
          return array
        })
      });
    case "GET_DESTINATIONS_FAILURE":
      return Object.assign({}, state, {
        fetching: false,
        error: action.payload.error
      });
    case "GET_DESTINATION_ATTEMPT":
      return Object.assign({}, state, {
        fetching: true
      });
    case "GET_DESTINATION_SUCCESS":
      return Object.assign({}, state, {
        fetching: false,
        destination: action.payload.response,
      });
    case "GET_DESTINATION_FAILURE":
      return Object.assign({}, state, {
        fetching: false,
        error: action.payload.error
      });
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
    case "DELETE_DESTINATION_ATTEMPT":
      return Object.assign({}, state, {
        fetching: true
      });
    case "DELETE_DESTINATION_SUCCESS":
      return Object.assign({}, state, {
        fetching: false,
        deletedDestination: action.payload.response
      });
    case "DELETE_DESTINATION_FAILURE":
      return Object.assign({}, state, {
        fetching: false,
        error: action.payload.error
      });
    default:
      return state;
  }
}
