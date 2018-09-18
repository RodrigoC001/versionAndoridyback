import axios from "axios";

export function postOriginAttempt() {
  return {
    type: "POST_ORIGIN_ATTEMPT"
  };
}

export function postOriginSuccess(response) {
  return {
    type: "POST_ORIGIN_SUCCESS",
    payload: {
      response: response.data
    }
  };
}

export function postOriginFailure(error) {
  return {
    type: "POST_ORIGIN_FAILURE",
    payload: {
      error
    }
  };
}

export function postOrigin(body) {
  return dispatch => {
    dispatch(postOriginAttempt());
    return axios
      .post('/api/origin/', body)
      .then(response => {
        return dispatch(postOriginSuccess(response));
      })
      .catch(error => {
        return dispatch(postOriginFailure(error))
      });
  };
}

export function getOriginsAttempt() {
  return {
    type: "GET_ORIGINS_ATTEMPT"
  };
}

export function getOriginsSuccess(response) {
  return {
    type: "GET_ORIGINS_SUCCESS",
    payload: {
      response: response.data
    }
  };
}

export function getOriginsFailure(error) {
  return {
    type: "GET_ORIGINS_FAILURE",
    payload: {
      error
    }
  };
}

export function getOriginsRequest() {
  return dispatch => {
    dispatch(getOriginsAttempt());
    return axios
      .get('/api/origin/')
      .then(response => dispatch(getOriginsSuccess(response)))
      .catch(error => {
        console.log('eror en el Origins request', error)
        return dispatch(getOriginsFailure(error))
      });
  };
}

export function getOriginAttempt() {
  return {
    type: "GET_ORIGIN_ATTEMPT"
  };
}

export function getOriginSuccess(response) {
  return {
    type: "GET_ORIGIN_SUCCESS",
    payload: {
      response: response.data
    }
  };
}

export function getOriginFailure(error) {
  return {
    type: "GET_ORIGIN_FAILURE",
    payload: {
      error
    }
  };
}

export function getOriginRequest(id) {
  return dispatch => {
    dispatch(getOriginAttempt());
    return axios
      .get(`/api/origin/${id}`)
      .then(response => dispatch(getOriginSuccess(response)))
      .catch(error => {
        console.log('eror en el origin request', error)
        return dispatch(getOriginFailure(error))
      });
  };
}

export function deleteOriginAttempt() {
  return {
    type: "DELETE_ORIGIN_ATTEMPT"
  };
}

export function deleteOriginSuccess(response) {
  return {
    type: "DELETE_ORIGIN_SUCCESS",
    payload: {
      response: response.data
    }
  };
}

export function deleteOriginFailure(error) {
  return {
    type: "DELETE_ORIGIN_FAILURE",
    payload: {
      error
    }
  };
}

export function deleteOrigin(id) {
  return dispatch => {
    dispatch(deleteOriginAttempt());
    return axios
      .delete(`/api/origin/${id}`)
      .then(response => {
        // success()
        return dispatch(deleteOriginSuccess(response));
      })
      .catch(error => {
        console.log('error', error)
        // failure()
        return dispatch(deleteOriginFailure(error))
      });
  };
}