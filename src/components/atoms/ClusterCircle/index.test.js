import React from "react";
import { getByTestId, render, screen } from "@testing-library/react";

import ClusterCircle from ".";

describe("<ClusterCircle/>", () => {
  it("has width", () => {
    render(<ClusterCircle data-testid="cluster" size={3} />);
    const cluster = screen.getByTestId("cluster");

    expect(getComputedStyle(cluster).width).toBe("9rem");
    expect(cluster).toBeInTheDocument();
  });
});
