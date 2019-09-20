import React from "react";
import { shallow } from "enzyme";

import Window from "./Window";
import { findByTestAtrr } from "../../../testingUtils";

const wrapper = shallow(
  <Window
    className="window"
    inlineStyles={{}}
    children={null}
    onMouseDown={jest.fn()}
  />
);

describe("Window Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "window").length).toBe(1);
    });

    it("should render content div", () => {
      expect(findByTestAtrr(wrapper, "content").length).toBe(1);
    });

    it("should render Bar Component", () => {
      expect(findByTestAtrr(wrapper, "bar").length).toBe(1);
    });

    it("should render ResizerList Component", () => {
      expect(findByTestAtrr(wrapper, "resizers").length).toBe(1);
    });

    it("should render Content Component", () => {
      expect(findByTestAtrr(wrapper, "content").length).toBe(1);
    });
  });
});
