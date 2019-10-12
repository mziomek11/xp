import React from "react";
import { shallow } from "enzyme";

import { PickerLocation } from "./Location";
import { findByTestAtrr } from "../../../../../../testingUtils";

const filesystem = { path: [], setPath: jest.fn(), historyPosition: 0 } as any;
const wrapper = shallow(<PickerLocation filesystem={filesystem} />);

describe("Picker Location Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "location").length).toBe(1);
    });
  });
});
