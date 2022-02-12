import React from "react";

import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "styled-components";

import App from "./components/App";
import createStore from "./configureStore";
import GlobalStyle from "./theme/globalStyle";
import theme from "./theme/theme";
import history from "./utils/history";

const store = createStore();
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </PersistGate>
    </Router>
  </Provider>,
  document.getElementById("root"),
);
