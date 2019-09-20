import React from "react";
import { shallow } from "enzyme";

import Shortcut from "./Shortcut";
import { findByTestAtrr } from "../../../../../testingUtils";

const createWrapper = (s: string[] = []) => shallow(<Shortcut shortcut={s} />);

describe("DropdownShortcut Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      const shorcut = findByTestAtrr(createWrapper(), "shortcut");

      expect(shorcut.length).toBe(1);
    });
  });

  describe("getShortcut", () => {
    it("should return shortcut", () => {
      const wrapper1 = createWrapper(["Ctrl", "A"]);
      expect(findByTestAtrr(wrapper1, "shortcut").text()).toBe("Ctrl+A");

      const wrapper2 = createWrapper(["Ctrl", "A", "Z"]);
      expect(findByTestAtrr(wrapper2, "shortcut").text()).toBe("Ctrl+A+Z");

      const wrapper3 = createWrapper(["Ctrl"]);
      expect(findByTestAtrr(wrapper3, "shortcut").text()).toBe("Ctrl");
    });

    it("should return empty string", () => {
      const wrapper = createWrapper([]);
      expect(findByTestAtrr(wrapper, "shortcut").text()).toBe("");
    });
  });
});
