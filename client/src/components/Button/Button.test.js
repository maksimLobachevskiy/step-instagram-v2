import React from "react";
import Button from "./Button";
import { shallow } from "enzyme";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { unmountComponentAtNode, render } from "react-dom";
import renderer from "react-test-renderer";

Enzyme.configure({ adapter: new Adapter() });

let container = null;

const testProps = {
  className: "",
  backgroundColor: "",
  onClick: jest.fn(),
  text: ""
};

beforeEach(() => {
  container = document.createElement(`div`);
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("Testing Button components", () => {
  const testClassName = "testBtn";
  const testBackgroundColor = "red";

  test("render correctly text component", () => {
    const testButtonComponent = renderer
      .create(<Button {...testProps} />)
      .toJSON();
    expect(testButtonComponent).toMatchSnapshot();
  });

  test("My first test", () => {
    expect(Math.max(1, 5, 10)).toBe(10);
  });

  test("Smoke test of Button", () => {
    render(
      <Button
        className={`${testClassName}`}
        style={{ background: testBackgroundColor }}
        onClick={() => {}}
      />,
      container
    );
  });

  test("The button is has className from props", () => {
    render(
      <Button
        className={`${testClassName}`}
        style={{ background: `${testBackgroundColor}` }}
        onClick={() => {}}
      />,
      container
    );

    const classNameBtn = document.querySelector(`.` + `${testClassName}`);
    expect(classNameBtn.className).toBe(testClassName);
  });

  test("The button is displayed in the correct color", () => {
    render(
      <Button
        className={`${testClassName}`}
        backgroundColor={`red`}
        onClick={() => {}}
        text={"Testing text"}
      />,
      container
    );
    const styleBtn = document.querySelector(`.` + `${testClassName}`);
    expect(styleBtn).toHaveStyle("background: red");
  });
});
