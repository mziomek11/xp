import React from "react";
import { shallow } from "enzyme";

import Picker from "./Picker";
import { findByTestAtrr } from "../../../../../testingUtils";

const props = { id: "", filetype: "text" };
const wrapper = shallow(<Picker {...(props as any)} />);

describe("Open Picker Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "picker").length).toBe(1);
    });
  });
});
