import axios from "axios";

export function postDestinationAttempt() {
  return {
    type: "POST_DESTINATION_ATTEMPT"
  };
}

export function postDestinationSuccess(response) {
  return {
    type: "POST_DESTINATION_SUCCESS",
    payload: {
      response: response.data
    }
  };
}

export function postDestinationFailure(error) {
  return {
    type: "POST_DESTINATION_FAILURE",
    payload: {
      error
    }
  };
}

export function postDestination(body) {
  return dispatch => {
    dispatch(postDestinationAttempt());
    return axios
      .post('/api/destination/', body)
      .then(response => {
        return dispatch(postDestinationSuccess(response));
      })
      .catch(error => {
        return dispatch(postDestinationFailure(error))
      });
  };
}

export function getDestinationsAttempt() {
  return {
    type: "GET_DESTINATIONS_ATTEMPT"
  };
}

export function getDestinationsSuccess(response) {
  return {
    type: "GET_DESTINATIONS_SUCCESS",
    payload: {
      response: response.data
    }
  };
}

export function getDestinationsFailure(error) {
  return {
    type: "GET_DESTINATIONS_FAILURE",
    payload: {
      error
    }
  };
}

export function getDestinationsRequest() {
  return dispatch => {
    dispatch(getDestinationsAttempt());
    return axios
      .get('/api/destination/')
      .then(response => dispatch(getDestinationsSuccess(response)))
      .catch(error => {
        console.log('eror en el destinations request', error)
        return dispatch(getDestinationsFailure(error))
      });
  };
}

export function getDestinationAttempt() {
  return {
    type: "GET_DESTINATION_ATTEMPT"
  };
}

export function getDestinationSuccess(response) {
  return {
    type: "GET_DESTINATION_SUCCESS",
    payload: {
      response: response.data
    }
  };
}

export function getDestinationFailure(error) {
  return {
    type: "GET_DESTINATION_FAILURE",
    payload: {
      error
    }
  };
}

export function getDestinationRequest(id) {
  return dispatch => {
    dispatch(getDestinationAttempt());
    return axios
      .get(`/api/destination/${id}`)
      .then(response => dispatch(getDestinationSuccess(response)))
      .catch(error => {
        console.log('eror en el destination request', error)
        return dispatch(getDestinationFailure(error))
      });
  };
}

export function deleteDestinationAttempt() {
  return {
    type: "DELETE_DESTINATION_ATTEMPT"
  };
}

export function deleteDestinationSuccess(response) {
  return {
    type: "DELETE_DESTINATION_SUCCESS",
    payload: {
      response: response.data
    }
  };
}

export function deleteDestinationFailure(error) {
  return {
    type: "DELETE_DESTINATION_FAILURE",
    payload: {
      error
    }
  };
}

export function deleteDestination(id) {
  return dispatch => {
    dispatch(deleteDestinationAttempt());
    return axios
      .delete(`/api/destination/${id}`)
      .then(response => {
        // success()
        return dispatch(deleteDestinationSuccess(response));
      })
      .catch(error => {
        console.log('error', error)
        // failure()
        return dispatch(deleteDestinationFailure(error))
      });
  };
}

export function putDestinationAttempt() {
  return {
    type: "PUT_DESTINATION_ATTEMPT"
  };
}

export function putDestinationSuccess(response) {
  return {
    type: "PUT_DESTINATION_SUCCESS",
    payload: {
      response: response.data
    }
  };
}

export function putDestinationFailure(error) {
  return {
    type: "PUT_DESTINATION_FAILURE",
    payload: {
      error
    }
  };
}

export function putDestination(id, body, success, failure) {
  return dispatch => {
    dispatch(putDestinationAttempt());
    return axios
      .put(`/api/destination/${id}`, body)
      .then(response => {
        // success()
        return dispatch(putDestinationSuccess(response));
      })
      .catch(error => {
        console.log('error', error)
        // failure()
        return dispatch(putDestinationFailure(error))
      });
  };
}

