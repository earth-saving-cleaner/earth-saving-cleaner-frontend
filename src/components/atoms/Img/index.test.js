import React from "react";
import { render, screen } from "@testing-library/react";

import Img from ".";

function Images() {
  return (
    <div>
      <Img alt="enrolled image" src="https://www.vanillacoding.co/images/team/ken.jpg" />
    </div>
  );
}

describe("Screen getByAlt Test", () => {
  it("getByAltText", () => {
    render(<Images />);

    screen.getByAltText("enrolled image");
  });
});
