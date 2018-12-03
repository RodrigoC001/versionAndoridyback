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

export function getTripAttempt() {
  return {
    type: "GET_TRIP_ATTEMPT"
  };
}

export function getTripSuccess(response) {
  return {
    type: "GET_TRIP_SUCCESS",
    payload: {
      response: response.data
    }
  };
}

export function getTripFailure(error) {
  return {
    type: "GET_TRIP_FAILURE",
    payload: {
      error
    }
  };
}

export function getTripRequest(id) {
  return dispatch => {
    dispatch(getTripAttempt());
    return axios
      .get(`/api/trip/${id}`)
      .then(response => dispatch(getTripSuccess(response)))
      .catch(error => {
        console.log('eror en el trips request', error)
        return dispatch(getTripFailure(error))
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

export function putTripAttempt() {
  return {
    type: "PUT_TRIP_ATTEMPT"
  };
}

export function putTripSuccess(response) {
  return {
    type: "PUT_TRIP_SUCCESS",
    payload: {
      response: response.data
    }
  };
}

export function putTripFailure(error) {
  return {
    type: "PUT_TRIP_FAILURE",
    payload: {
      error
    }
  };
}

export function putTrip(id, body, success, failure) {
  return dispatch => {
    dispatch(putTripAttempt());
    return axios
      .put(`/api/trip/${id}`, body)
      .then(response => {
        success()
        return dispatch(putTripSuccess(response));
      })
      .catch(error => {
        console.log('error', error)
        failure()
        return dispatch(putTripFailure(error))
      });
  };
}


export function deleteTripAttempt() {
  return {
    type: "DELETE_TRIP_ATTEMPT"
  };
}

export function deleteTripSuccess(response) {
  return {
    type: "DELETE_TRIP_SUCCESS",
    payload: {
      response: response.data
    }
  };
}

export function deleteTripFailure(error) {
  return {
    type: "DELETE_TRIP_FAILURE",
    payload: {
      error
    }
  };
}

export function deleteTrip(id) {
  return dispatch => {
    dispatch(deleteTripAttempt());
    return axios
      .delete(`/api/trip/${id}`)
      .then(response => {
        // success()
        return dispatch(deleteTripSuccess(response));
      })
      .catch(error => {
        console.log('error', error)
        // failure()
        return dispatch(deleteTripFailure(error))
      });
  };
}