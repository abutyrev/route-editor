import React from "react";
import { shallow, mount } from "enzyme";

import Input from "./Input";

describe("Input component tests", () => {
  const initialState = {
    value: "",
    invalidInput: false
  };
  it("should render correctly", () => {
    const InputComponent = shallow(<Input />);
    expect(InputComponent).toMatchSnapshot();
  });

  it("should render correctly with initial state", () => {
    const InputComponent = shallow(<Input />);
    expect(InputComponent.state()).toEqual(initialState);
  });

  it("check onChange callback", () => {
    const inputComponent = shallow(<Input />);
    inputComponent.find("input").simulate("change", {
      target: {
        value: "aaa"
      }
    });
    expect(inputComponent.state().value).toEqual("aaa");
  });

  /*   it("check onSubmit callback", () => {
    const state = {
      value: 'Петрозаводск',
      invalidInput: false
    },
    addPoint = jest.fn(),
    props = {
      addPoint
    },
    inputComponent = shallow(<Input />);

    inputComponent.setState(state);
    inputComponent.find("form").simulate("submit", {
        preventDefault: () => {}
    });
    expect(inputComponent.submitHandler).toHaveBeenCalledTimes(1);
  }); */

  it("should have error class in error issue", () => {
    const testState = {
        value: "",
        invalidInput: true,
        isMapReady: true
      },
      inputComponent = shallow(<Input />);
    inputComponent.setState(testState);
    expect(inputComponent.find("input").hasClass("invalid")).toEqual(true);
  });

  it("should have disabled attribute while map not ready", () => {
    const testProps = {
        value: "",
        invalidInput: false,
        isMapReady: false
      },
      inputComponent = mount(<Input {...testProps} />);
    expect(inputComponent.find("input").getDOMNode().disabled).toEqual(true);
  });
});
