import React from "react";
import { shallow } from "enzyme";

import { Picker } from "./Picker";
import { findByTestAtrr } from "../../../../testingUtils";

const wrapper = shallow(<Picker {...({} as any)} />);

describe("Subwindow Picker Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "container").length).toBe(1);
    });
  });
});
