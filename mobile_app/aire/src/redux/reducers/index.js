import { combineReducers } from "redux";
import origins from "./origins";
import destinations from "./destinations";
import trips from "./trips";

export default combineReducers({
  origins,
  destinations,
  trips
});