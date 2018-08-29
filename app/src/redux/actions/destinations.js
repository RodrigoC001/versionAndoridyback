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