import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import feedSliceReducer from "./slices/feedSlice";
import loginReducer from "./slices/loginSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: loginReducer,
  feed: feedSliceReducer,
});

export default persistReducer(persistConfig, rootReducer);
