import React from "react";
import { shallow } from "enzyme";

import { MinimalizeAction } from "./";
import { findByTestAtrr } from "../../../../utils/testing";

describe("ExitAction Component", () => {
  const mockMinimalizeWindowFn = jest.fn();
  const comp = (
    <MinimalizeAction id="sdfpsd" minimalize={mockMinimalizeWindowFn} />
  );
  const wrapper = shallow(comp);

  it("should render without throwing an error", () => {
    expect(findByTestAtrr(wrapper, "action").length).toBe(1);
  });

  it("should have minimalize type", () => {
    expect(findByTestAtrr(wrapper, "action").prop("type")).toBe("minimalize");
  });

  it("should emit closeWindow on click", () => {
    findByTestAtrr(wrapper, "action").simulate("click");

    expect(mockMinimalizeWindowFn.mock.calls.length).toBe(1);
  });
});
