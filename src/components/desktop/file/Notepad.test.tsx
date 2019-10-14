import React from "react";
import { shallow } from "enzyme";

import Notepad from "./Notepad";
import { findByTestAtrr } from "../../../../testingUtils";

const wrapper = shallow(<Notepad />);

describe("File Notepad Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "file").length).toBe(1);
    });
  });
});
