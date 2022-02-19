import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import Button from "./";

describe("<Button />", () => {
  const onClick = jest.fn();

  it("call funtion on click", () => {
    render(<Button title="click" onClick={onClick} />);

    const button = screen.getByText("click");
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalled();
  });
});
