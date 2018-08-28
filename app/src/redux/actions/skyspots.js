import axios from "axios";

export function getSkyspotsAttempt() {
  return {
    type: "GET_SKYSPOTS_ATTEMPT"
  };
}

export function getSkyspotsSuccess(response) {
  return {
    type: "GET_SKYSPOTS_SUCCESS",
    payload: {
      response: response.data
    }
  };
}

export function getSkyspotsFailure(error) {
  return {
    type: "GET_SKYSPOTS_FAILURE",
    payload: {
      error
    }
  };
}

export function getSkyspotsRequest() {
  return dispatch => {
    dispatch(getSkyspotsAttempt());
    return axios
      .get('/api/skyspot/')
      .then(response => dispatch(getSkyspotsSuccess(response)))
      .catch(error => {
        console.log('eror en el trips request', error)
        return dispatch(getSkyspotsFailure(error))
      });
  };
}
