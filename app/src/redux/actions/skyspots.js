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

export function postSkyspotAttempt() {
  return {
    type: "POST_SKYSPOT_ATTEMPT"
  };
}

export function postSkyspotSuccess(response) {
  return {
    type: "POST_SKYSPOT_SUCCESS",
    payload: {
      response: response.data
    }
  };
}

export function postSkyspotFailure(error) {
  return {
    type: "POST_SKYSPOT_FAILURE",
    payload: {
      error
    }
  };
}

export function postSkyspot(body, success, failure) {
  return dispatch => {
    dispatch(postSkyspotAttempt());
    return axios
      .post('/api/skyspot/', body)
      .then(response => {
        success()
        return dispatch(postSkyspotSuccess(response));
      })
      .catch(error => {
        failure()
        return dispatch(postSkyspotFailure(error))
      });
  };
}

export function deleteSkyspotAttempt() {
  return {
    type: "DELETE_SKYSPOT_ATTEMPT"
  };
}

export function deleteSkyspotSuccess(response) {
  return {
    type: "DELETE_SKYSPOT_SUCCESS",
    payload: {
      response: response.data
    }
  };
}

export function deleteSkyspotFailure(error) {
  return {
    type: "DELETE_SKYSPOT_FAILURE",
    payload: {
      error
    }
  };
}

export function deleteSkyspot(id) {
  return dispatch => {
    dispatch(deleteSkyspotAttempt());
    return axios
      .delete(`/api/skyspot/${id}`)
      .then(response => {
        // success()
        return dispatch(deleteSkyspotSuccess(response));
      })
      .catch(error => {
        console.log('error', error)
        // failure()
        return dispatch(deleteSkyspotFailure(error))
      });
  };
}