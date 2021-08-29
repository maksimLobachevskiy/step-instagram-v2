import React from "react";
import Footer from "./Footer";
import { render, screen } from "@testing-library/react";

describe("Footer component", () => {
  it("Render Footer component", () => {
    const { container } = render(<Footer />);
    // screen.debug()
    expect(container.firstChild).toHaveClass("container");
  });
});
