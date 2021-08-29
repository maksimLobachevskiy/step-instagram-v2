import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import User from "./User";

const testProps = {
  userName: "testUserName",
  sizePic: true,
  alt: "testAlt",
  photoUser: "testPhotoUser"
};

describe("User", () => {
  it("Render User component", () => {
    render(
      <BrowserRouter>
        <User {...testProps} />
      </BrowserRouter>
    );
  });

  it("userName in render document", () => {
    render(
      <BrowserRouter>
        <User {...testProps} />
      </BrowserRouter>
    );

    expect(screen.getByText(/testUserName/i)).toBeInTheDocument();
  });

  it("img in render document", () => {
    render(
      <BrowserRouter>
        <User {...testProps} />
      </BrowserRouter>
    );

    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("link in render document", () => {
    render(
      <BrowserRouter>
        <User {...testProps} />
      </BrowserRouter>
    );

    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  it("className: `user min` in render document", () => {
    render(
      <BrowserRouter>
        <User {...testProps} />
      </BrowserRouter>
    );
    expect(screen.getByRole("link")).toHaveClass("user min");
  });

  it("className: `user` in render document", () => {
    render(
      <BrowserRouter>
        <User {...testProps} sizePic={false} />
      </BrowserRouter>
    );
    expect(screen.getByRole("link")).toHaveClass("user");
  });
});
