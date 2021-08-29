import React from "react";
import { render, screen } from "@testing-library/react";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import Navbar from "./Navbar";
import * as reactRedux from "react-redux";

const mockStore = configureMockStore([thunk]);

const testProps = {
  username: "testUser",
  history: "",
  dispatch: ""
};

describe("Navbar component", () => {
  const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
  const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });

  it("Render Navbar component", () => {
    useSelectorMock.mockReturnValue({ mockStore });

    render(
      <BrowserRouter>
        <Navbar {...testProps} />
      </BrowserRouter>
    );
    screen.debug();
  });
});
