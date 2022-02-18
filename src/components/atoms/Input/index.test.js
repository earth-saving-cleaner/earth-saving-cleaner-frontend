import React from "react";
import { render } from "@testing-library/react";

import Input from ".";

describe("<Input />", () => {
  it("has input", () => {
    const { getByPlaceholderText } = render(<Input />);
    getByPlaceholderText("write here...");
  });
});
