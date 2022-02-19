import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import Textarea from ".";

const renderComponent = ({ theme }) =>
  render(
    <ThemeProvider theme={theme}>
      <Textarea />
    </ThemeProvider>,
  );

const theme = {
  fontSizes: "base",
  colors: "black",
  width: "100%",
  background: "white",
};

describe("<Textarea />", () => {
  it("getByDisplayValue", () => {
    const { getByText } = renderComponent({ theme });
    const linkElement = getByText("Winter");
    expect(linkElement).toBeInTheDocument();
  });
});
