import React from "react";
import { shallow } from "enzyme";

import { Bar } from "./Bar";
import { findByTestAtrr } from "../../../../testingUtils";

const wrapper = shallow(<Bar onMouseDown={jest.fn()} onClick={jest.fn()} />);

describe("WindowBar Component", () => {
  describe("render", () => {
    it("should render Title component", () => {
      expect(findByTestAtrr(wrapper, "title").length).toBe(1);
    });

    it("should render Icon component", () => {
      expect(findByTestAtrr(wrapper, "icon").length).toBe(1);
    });

    it("should render actions", () => {
      expect(findByTestAtrr(wrapper, "actions").length).toBe(1);
      expect(findByTestAtrr(wrapper, "action-minimalize").length).toBe(1);
      expect(findByTestAtrr(wrapper, "action-exit").length).toBe(1);
      expect(findByTestAtrr(wrapper, "action-fullscreen").length).toBe(1);
    });
  });
});
