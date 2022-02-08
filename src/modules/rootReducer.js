import { combineReducers } from "redux";
import feedSliceReducer from "./slices/feedSlice";

const rootReducer = combineReducers({
  feed: feedSliceReducer,
});

export default rootReducer;
