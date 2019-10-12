import React from "react";
import { shallow } from "enzyme";

import { List } from "./List";
import { findByTestAtrr } from "../../../testingUtils";

describe("WindowList Component", () => {
  describe("render", () => {
    it("should render apps", () => {
      const wrapper = shallow(<List windowsIds={["1", "2", "3"]} />);

      expect(findByTestAtrr(wrapper, "app").length).toBe(3);
    });

    it("should not render apps", () => {
      const wrapper = shallow(<List windowsIds={[]} />);

      expect(findByTestAtrr(wrapper, "app").length).toBe(0);
    });
  });
});
