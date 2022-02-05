import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";

import theme from "./theme/theme";
import GlobalStyle from "./theme/globalStyle";
import App from "./components/App";
import createStore from "./configureStore";

// const store = createStore();

ReactDOM.render(
  <BrowserRouter>
    {/* <Provider store={store}> */}
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
    {/* </Provider> */}
  </BrowserRouter>,
  document.getElementById("root"),
);
