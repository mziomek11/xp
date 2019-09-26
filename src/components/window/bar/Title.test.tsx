import React from "react";
import { shallow } from "enzyme";

import { Title } from "./Title";
import { findByTestAtrr } from "../../../../testingUtils";

const name = "THIS IS TITLE";
const wrapper = shallow(<Title context={{ name } as any} />);

describe("Window Bar Title Component", () => {
  describe("render", () => {
    it("should render title", () => {
      const titleElement = findByTestAtrr(wrapper, "title");

      expect(titleElement.length).toBe(1);
      expect(titleElement.text()).toBe(name);
    });
  });
});
