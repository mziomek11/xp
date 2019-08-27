import React from "react";
import { shallow } from "enzyme";

import { Bar } from "./Bar";
import { findByTestAtrr } from "../../../../testingUtils";

const wrapper = shallow(<Bar name="Program" onMouseDown={jest.fn()} />);

describe("WindowBar Component", () => {
  describe("render", () => {
    it("should render title", () => {
      expect(findByTestAtrr(wrapper, "title").length).toBe(1);
      expect(findByTestAtrr(wrapper, "title").contains("Program")).toBe(true);
    });

    it("should render actions", () => {
      expect(findByTestAtrr(wrapper, "actions").length).toBe(1);
      expect(findByTestAtrr(wrapper, "action-minimalize").length).toBe(1);
      expect(findByTestAtrr(wrapper, "action-exit").length).toBe(1);
      expect(findByTestAtrr(wrapper, "action-fullscreen").length).toBe(1);
    });
  });
});
