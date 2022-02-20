import React from "react";
import { render, screen } from "@testing-library/react";

import Avatar from "./";

describe("<Avatar />", () => {
  it("has the theme width", () => {
    render(<Avatar size="sm" alt="avatar" />);

    const image = screen.getByAltText("avatar");

    expect(image.src).toBe("https://lh3.googleusercontent.com/a/AATXAJzdJ5gTfflTC1--vXDDRH1n-wX7NQ9mJRViLtgc=s96-c");
    expect(getComputedStyle(image).width).toBe("3.5rem");
  });
});
