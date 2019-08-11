import React from "react";
import { shallow } from "enzyme";

import { ExitAction } from "./";
import { findByTestAtrr } from "../../../../utils/testing";

describe("ExitAction Component", () => {
  const mockCloseWindowFn = jest.fn();
  const comp = <ExitAction id="sdfpsd" closeWindow={mockCloseWindowFn} />;
  const wrapper = shallow(comp);

  it("should render without throwing an error", () => {
    expect(findByTestAtrr(wrapper, "action").length).toBe(1);
  });

  it("should have exit type", () => {
    expect(findByTestAtrr(wrapper, "action").prop("type")).toBe("exit");
  });

  it("should emit closeWindow on click", () => {
    findByTestAtrr(wrapper, "action").simulate("click");

    expect(mockCloseWindowFn.mock.calls.length).toBe(1);
  });
});
