import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./modules/rootSaga";
import rootReducer from "./modules/rootReducer";

const sagaMiddleware = createSagaMiddleware();

export default function createStore() {
  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: [sagaMiddleware],
  });

  sagaMiddleware.run(rootSaga);

  return store;
}
