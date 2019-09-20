import React from "react";
import { shallow } from "enzyme";

import HistoryArrowDropDown from "./HistoryArrowDropDown";
import { findByTestAtrr } from "../../../../../../testingUtils";

const option = { name: "x", onClick: jest.fn() };
const options = [option, option, option];
const wrapper = shallow(<HistoryArrowDropDown options={options} />);

describe("Filesystem Action HistoryArrowDropDown Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "dropdown").length).toBe(1);
    });

    it("should render DrowdownOptions", () => {
      expect(findByTestAtrr(wrapper, "option").length).toBe(options.length);
    });
  });
});
