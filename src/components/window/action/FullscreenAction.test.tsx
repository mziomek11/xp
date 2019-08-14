import React from "react";
import { shallow } from "enzyme";

import { FullscreenAction } from "./FulscreenAction";
import { findByTestAtrr } from "../../../../testingUtils";

const mockFullscreenFn = jest.fn();
const comp = <FullscreenAction id="id" toggleFullscreen={mockFullscreenFn} />;
const wrapper = shallow(comp);

describe("FullscreenComponent Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "action").length).toBe(1);
    });

    it("should have fullscreen type", () => {
      expect(findByTestAtrr(wrapper, "action").prop("type")).toBe("fullscreen");
    });
  });

  describe("onClick", () => {
    it("should emit closeWindow", () => {
      findByTestAtrr(wrapper, "action").simulate("click");

      expect(mockFullscreenFn.mock.calls.length).toBe(1);
    });
  });
});
