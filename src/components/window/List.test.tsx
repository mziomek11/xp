import React from "react";
import { shallow } from "enzyme";

import { List } from "./List";
import { findByTestAtrr } from "../../../testingUtils";

describe("WindowList Component", () => {
  describe("render", () => {
    it("should render windows", () => {
      const wrapper = shallow(<List windowsIds={["1", "2", "3"]} />);

      expect(findByTestAtrr(wrapper, "window").length).toBe(3);
    });

    it("should not render windows", () => {
      const wrapper = shallow(<List windowsIds={[]} />);

      expect(findByTestAtrr(wrapper, "window").length).toBe(0);
    });
  });
});
