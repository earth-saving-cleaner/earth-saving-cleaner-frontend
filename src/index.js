import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import theme from "./theme/theme";
import GlobalStyle from "./theme/globalStyle";
import App from "./components/App";
import createStore from "./configureStore";

const store = createStore();
const persistor = persistStore(store);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root"),
);
