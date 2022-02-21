import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import Text from ".";

const renderComponent = ({ theme, text }) =>
  render(
    <ThemeProvider theme={theme}>
      <Text text={text} />
    </ThemeProvider>,
  );

const theme = {
  fontSizes: "base",
  colors: "black",
};

describe("<Text />", () => {
  it("has text", () => {
    const { getByText } = renderComponent({ theme, text: "Winter is coming" });
    getByText("Winter is coming");
  });
});
