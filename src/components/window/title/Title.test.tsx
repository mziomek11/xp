import React from "react";
import { shallow } from "enzyme";

import Title from "./Title";
import { findByTestAtrr } from "../../../../testingUtils";

const text = "example text";
const wrapper = shallow(<Title text={text} />);
const title = findByTestAtrr(wrapper, "title");

describe("Window Title Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(title.length).toBe(1);
      expect(title.text()).toBe(text);
    });
  });
});
