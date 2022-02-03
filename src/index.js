import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import { ThemeProvider } from "styled-components";
import theme from "./globalstyle/theme";
import GlobalStyle from "./globalstyle/globalStyle";

import "./index.css";
import App from "./App";
import catsReducer from "./state";
import catSaga from "./catSaga";

const saga = createSagaMiddleware();
const store = configureStore({
  reducer: { cats: catsReducer },
  middleware: [saga],
});

saga.run(catSaga);

console.log("theme ====>", theme);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root"),
);
