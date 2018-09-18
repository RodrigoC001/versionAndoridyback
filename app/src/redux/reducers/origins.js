const defaultStartState = {
  createdOrigin: null,
  origins: [],
  originsOrderedToTable: [],
  origin: null,
  deletedOrigin: null,
  modifiedOrigin: {}
};

export default function origins(state = defaultStartState, action) {
  switch (action.type) {
    case "GET_ORIGINS_ATTEMPT":
      return Object.assign({}, state, {
        fetching: true
      });
    case "GET_ORIGINS_SUCCESS":
      // order the origins alphabetically
      let origins = action.payload.response.data.sort((a, b) => {
          let textA = a.address.toUpperCase();
          let textB = b.address.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
        })
      return Object.assign({}, state, {
        fetching: false,
        origins,
        originsOrderedToTable: action.payload.response.data.map(origin => {
          const array = [];
          array.push(origin.id.toString());
          array.push(origin.address);
          return array
        })
      });
    case "GET_ORIGINS_FAILURE":
      return Object.assign({}, state, {
        fetching: false,
        error: action.payload.error
      });
    case "GET_ORIGIN_ATTEMPT":
      return Object.assign({}, state, {
        fetching: true
      });
    case "GET_ORIGIN_SUCCESS":
      return Object.assign({}, state, {
        fetching: false,
        origin: action.payload.response,
      });
    case "GET_ORIGIN_FAILURE":
      return Object.assign({}, state, {
        fetching: false,
        error: action.payload.error
      });
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
    case "DELETE_ORIGIN_ATTEMPT":
      return Object.assign({}, state, {
        fetching: true
      });
    case "DELETE_ORIGIN_SUCCESS":
      return Object.assign({}, state, {
        fetching: false,
        deletedOrigin: action.payload.response
      });
    case "DELETE_ORIGIN_FAILURE":
      return Object.assign({}, state, {
        fetching: false,
        error: action.payload.error
      });
    case "PUT_ORIGIN_ATTEMPT":
      return Object.assign({}, state, {
        fetching: true
      });
    case "PUT_ORIGIN_SUCCESS":
      return Object.assign({}, state, {
        fetching: false,
        modifiedOrigin: action.payload.response
      });
    case "PUT_ORIGIN_FAILURE":
      return Object.assign({}, state, {
        fetching: false,
        error: action.payload.error
      });
    default:
      return state;
  }
}
