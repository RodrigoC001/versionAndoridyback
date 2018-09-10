const defaultStartState = {
  skyspots: [],
  fetching: false,
  error: null,
  skyspotsOrderedToTable: [],
  createdSkyspot: null,
};

export default function skyspots(state = defaultStartState, action) {
  switch (action.type) {
    case "GET_SKYSPOTS_ATTEMPT":
      return Object.assign({}, state, {
        fetching: true
      });
    case "GET_SKYSPOTS_SUCCESS":
      let skyspots = action.payload.response.data.sort((a, b) => {
          let textA = a.name.toUpperCase();
          let textB = b.name.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
        })
      return Object.assign({}, state, {
        // order the skyspots alphabetically
        fetching: false,
        skyspots,
        skyspotsOrderedToTable: action.payload.response.data.map(skyspot => {
          const array = [];
          array.push(skyspot.id.toString());
          array.push(skyspot.name);
          skyspot.latitude ? array.push(skyspot.latitude.toString()) : ' ';
          skyspot.longitude ? array.push(skyspot.longitude.toString()) : ' ';
          array.push(skyspot.data);
          return array
        })
      });
    case "GET_SKYSPOTS_FAILURE":
      return Object.assign({}, state, {
        fetching: false,
        error: action.payload.error
      });
    case "POST_SKYSPOT_ATTEMPT":
      return Object.assign({}, state, {
        fetching: true
      });
    case "POST_SKYSPOT_SUCCESS":
      return Object.assign({}, state, {
        fetching: false,
        createdSkyspot: action.payload.response
      });
    case "POST_SKYSPOT_FAILURE":
      return Object.assign({}, state, {
        fetching: false,
        error: action.payload.error
      });
    default:
      return state;
  }
}
