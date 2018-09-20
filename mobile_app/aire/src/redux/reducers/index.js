import { combineReducers } from "redux";
import origins from "./origins";
import destinations from "./destinations";

export default combineReducers({
  origins,
  destinations
});