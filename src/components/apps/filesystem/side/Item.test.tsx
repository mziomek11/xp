import React from "react";
import { shallow } from "enzyme";

import Item from "./Item";
import { findByTestAtrr } from "../../../../../testingUtils";

const wrapper = shallow(<Item title="title" />);

describe("Filesystem Side Item component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "container").length).toBe(1);
    });

    it("should render content", () => {
      expect(findByTestAtrr(wrapper, "content").length).toBe(1);
      findByTestAtrr(wrapper, "clickable").simulate("click");
      findByTestAtrr(wrapper, "clickable").simulate("click");
      expect(findByTestAtrr(wrapper, "content").length).toBe(1);
    });

    it("should NOT render content", () => {
      findByTestAtrr(wrapper, "clickable").simulate("click");
      expect(findByTestAtrr(wrapper, "content").length).toBe(0);
    });
  });
});
