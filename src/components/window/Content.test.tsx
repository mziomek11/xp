import React from "react";
import { shallow } from "enzyme";

import Content from "./Content";
import { findByTestAtrr } from "../../../testingUtils";

const component = (
  <Content>
    <div data-test="child" />
  </Content>
);

const wrapper = shallow<Content>(component);

describe("WindowContent Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "content").length).toBe(1);
    });

    it("should render children", () => {
      expect(findByTestAtrr(wrapper, "child").length).toBe(1);
    });
  });

  describe("shouldComponentUpdate", () => {
    it("should return false", () => {
      const result = wrapper.instance().shouldComponentUpdate();
      expect(result).toBe(false);
    });
  });
});
