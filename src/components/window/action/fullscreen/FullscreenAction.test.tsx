import React from "react";
import { shallow } from "enzyme";

import { FullscreenAction } from "./";
import { findByTestAtrr } from "../../../../utils/testing";

describe("ExitAction Component", () => {
  const mockFulscreenWindowFn = jest.fn();
  const comp = (
    <FullscreenAction id="sdfpsd" fullscreenWindow={mockFulscreenWindowFn} />
  );
  const wrapper = shallow(comp);

  it("should render without throwing an error", () => {
    expect(findByTestAtrr(wrapper, "action").length).toBe(1);
  });

  it("should have fullscreen type", () => {
    expect(findByTestAtrr(wrapper, "action").prop("type")).toBe("fullscreen");
  });

  it("should emit closeWindow on click", () => {
    findByTestAtrr(wrapper, "action").simulate("click");

    expect(mockFulscreenWindowFn.mock.calls.length).toBe(1);
  });
});
