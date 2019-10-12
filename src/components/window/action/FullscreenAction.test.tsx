import React from "react";
import { shallow } from "enzyme";

import { testContextData } from "../Context.test";
import { FullscreenAction } from "./FullscreenAction";
import { findByTestAtrr } from "../../../../testingUtils";

const mockSetContext = jest.fn();
const context = { ...testContextData, setContext: mockSetContext };
const wrapper = shallow(<FullscreenAction window={context} />);

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

      expect(mockSetContext.mock.calls.length).toBe(1);
    });
  });
});
