import { combineReducers } from "redux";

import trips from './trips';
import skyspots from './skyspots';
import origins from './origins';
import destinations from './destinations';
import auth from './auth';

export default combineReducers({
  trips,
  skyspots,
  origins,
  destinations,
  auth
});
