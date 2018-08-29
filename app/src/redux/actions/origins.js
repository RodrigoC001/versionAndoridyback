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