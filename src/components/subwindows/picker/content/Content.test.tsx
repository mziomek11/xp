import React from "react";
import { shallow } from "enzyme";

import { Content } from "./Content";
import { findByTestAtrr } from "../../../../../testingUtils";

const wrapper = shallow(
  <Content {...({} as any)}>
    <p data-test="child" />
  </Content>
);

describe("Picker Content Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "provider").length).toBe(1);
    });

    it("should render Navigation component", () => {
      expect(findByTestAtrr(wrapper, "navigation").length).toBe(1);
    });

    it("should render FileList component", () => {
      expect(findByTestAtrr(wrapper, "file-list").length).toBe(1);
    });

    it("should render children", () => {
      expect(findByTestAtrr(wrapper, "child").length).toBe(1);
    });
  });
});
