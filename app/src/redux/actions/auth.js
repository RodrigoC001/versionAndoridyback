import axios from "axios";

export function postLoginAttempt() {
  return {
    type: "POST_LOGIN_ATTEMPT"
  };
}

export function postLoginSuccess(response) {
  return {
    type: "POST_LOGIN_SUCCESS",
    payload: {
      response: response.data
    }
  };
}

export function postLoginFailure(error) {
  return {
    type: "POST_LOGIN_FAILURE",
    payload: {
      error
    }
  };
}

export function postLogin(body, success, failure) {
  return dispatch => {
    dispatch(postLoginAttempt());
    return axios
      .post('/api/auth/login', body)
      .then(response => {
        success()
        return dispatch(postLoginSuccess(response));
      })
      .catch(error => {
        console.log('error', error)
        failure()
        return dispatch(postLoginFailure(error))
      });
  };
}


export function getMeAttempt() {
  return {
    type: "GET_ME_ATTEMPT"
  };
}

export function getMeSuccess(response) {
  return {
    type: "GET_ME_SUCCESS",
    payload: {
      response: response.data
    }
  };
}

export function getMeFailure(error) {
  return {
    type: "GET_ME_FAILURE",
    payload: {
      error
    }
  };
}

export function getMeRequest() {
  return dispatch => {
    dispatch(getMeAttempt());
    return axios
      .get('/api/auth/me')
      .then(response => {
        return dispatch(getMeSuccess(response))
      })
      .catch(error => {
        console.log('eror en el auth request', error)
        return dispatch(getMeFailure(error))
      });
  };
}