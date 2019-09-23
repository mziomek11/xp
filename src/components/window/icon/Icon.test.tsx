import React from "react";
import { shallow } from "enzyme";

import Icon from "./Icon";
import { findByTestAtrr } from "../../../../testingUtils";

const src = "asdgoinshodig";
const wrapper = shallow(<Icon src={src} />);

describe("Window Icon Component", () => {
  describe("render", () => {
    it("should render without without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "container").length).toBe(1);
    });

    it("should render icon", () => {
      const icon = findByTestAtrr(wrapper, "container");

      expect(icon.length).toBe(1);
    });
  });
});
