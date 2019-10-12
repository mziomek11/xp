import React from "react";
import { shallow } from "enzyme";

import { ViewsDropDown } from "./ViewsDropDown";
import { findByTestAtrr } from "../../../../../testingUtils";

const context = { options: { display: "Tiles" }, setOptions: jest.fn() } as any;
const comp = <ViewsDropDown filesystem={context} />;
const wrapper = shallow(comp);

describe("Filesystem Action ViewsDropDown Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "dropdown").length).toBe(1);
    });

    it("should render RadioGroup", () => {
      expect(findByTestAtrr(wrapper, "radio-group").length).toBe(1);
    });
  });
});
