import { combineReducers } from "redux";

import trips from './trips';
import skyspots from './skyspots';

export default combineReducers({
  trips,
  skyspots
});
