import React from "react";
import { shallow } from "enzyme";
import Action from "./";
import { findByTestAtrr } from "../../../utils/testing";

describe("WindowAction Component", () => {
  const onClickMockFn = jest.fn();
  const comp = <Action type="exit" onClick={onClickMockFn} />;
  const wrapper = shallow(comp);

  it("should render without throwing an error", () => {
    expect(findByTestAtrr(wrapper, "action").length).toBe(1);
  });

  it("should add type to class name", () => {
    const expectedClass = "window__action window__action--exit";
    expect(findByTestAtrr(wrapper, "action").prop("className")).toBe(
      expectedClass
    );
  });

  it("should call onClick mock once", () => {
    findByTestAtrr(wrapper, "action").simulate("click");
    expect(onClickMockFn.mock.calls.length).toBe(1);
  });
});
