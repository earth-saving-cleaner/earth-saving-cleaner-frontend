import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

import rootSaga from "./modules/rootSaga";
import rootReducer from "./modules/rootReducer";
import history from "./utils/history";

const sagaMiddleware = createSagaMiddleware({
  context: {
    history,
  },
});

export default function createStore() {
  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: [logger, sagaMiddleware],
  });

  sagaMiddleware.run(rootSaga);

  return store;
}
