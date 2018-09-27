import axios from "axios";
import { ip } from "../../config/server";


export function getTripsWithOriginAttempt() {
  return {
    type: "GET_TRIPS_WITH_ORIGIN_ATTEMPT"
  };
}

export function getTripsWithOriginSuccess(response) {
  return {
    type: "GET_TRIPS_WITH_ORIGIN_SUCCESS",
    payload: {
      response: response.data
    }
  };
}

export function getTripsWithOriginFailure(error) {
  return {
    type: "GET_TRIPS_WITH_ORIGIN_FAILURE",
    payload: {
      error
    }
  };
}

export function getTripsWithOriginRequest(originId) {
  return dispatch => {
    dispatch(getTripsWithOriginAttempt());
    return axios
      .get(`${ip}/trip/gettripswithorigin/${originId}`)
      .then(response => dispatch(getTripsWithOriginSuccess(response)))
      .catch(error => {
        console.log('eror en el trips request', error)
        return dispatch(getTripsWithOriginFailure(error))
      });
  };
}