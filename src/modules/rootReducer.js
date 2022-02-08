import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import loginReducer from "./slices/loginSlice";
import signupReducer from "./slices/signupSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  login: loginReducer,
  signup: signupReducer,
});

export default persistReducer(persistConfig, rootReducer);
