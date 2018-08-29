import axios from "axios";

export function getTripsAttempt() {
  return {
    type: "GET_TRIPS_ATTEMPT"
  };
}

export function getTripsSuccess(response) {
  return {
    type: "GET_TRIPS_SUCCESS",
    payload: {
      response: response.data
    }
  };
}

export function getTripsFailure(error) {
  return {
    type: "GET_TRIPS_FAILURE",
    payload: {
      error
    }
  };
}

export function getTripsRequest() {
  return dispatch => {
    dispatch(getTripsAttempt());
    return axios
      .get('/api/trip/')
      .then(response => dispatch(getTripsSuccess(response)))
      .catch(error => {
        console.log('eror en el trips request', error)
        return dispatch(getTripsFailure(error))
      });
  };
}

export function postTripAttempt() {
  return {
    type: "POST_TRIP_ATTEMPT"
  };
}

export function postTripSuccess(response) {
  return {
    type: "POST_TRIP_SUCCESS",
    payload: {
      response: response.data
    }
  };
}

export function postTripFailure(error) {
  return {
    type: "POST_TRIP_FAILURE",
    payload: {
      error
    }
  };
}

export function postTrip(body, success, failure) {
  return dispatch => {
    dispatch(postTripAttempt());
    return axios
      .post('/api/trip/', body)
      .then(response => {
        // success()
        return dispatch(postTripSuccess(response));
      })
      .catch(error => {
        console.log('error', error)
        // failure()
        return dispatch(postTripFailure(error))
      });
  };
}