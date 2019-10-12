import React from "react";
import { shallow } from "enzyme";

import { FileAndFolderTasks } from "./FileAndFolderTasks";
import { findByTestAtrr } from "../../../../../../testingUtils";

const createWrapper = (path: string[] = [], focused: string[] = []) => {
  const ctx = { path, focused } as any;
  return shallow(<FileAndFolderTasks filesystem={ctx} />);
};

describe("Filesystem Side FileAndFolderTasks component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      const wrapper = createWrapper(["1"]);
      expect(findByTestAtrr(wrapper, "container").length).toBe(1);
    });

    it("should render NoFocusedOptions component", () => {
      const wrapper = createWrapper(["1"], []);
      expect(findByTestAtrr(wrapper, "no").length).toBe(1);
    });

    it("should render OneFocusedOptions component", () => {
      const wrapper = createWrapper(["1"], ["1"]);
      expect(findByTestAtrr(wrapper, "one").length).toBe(1);
    });

    it("should render ManyFocusedOptions component", () => {
      const wrapper = createWrapper(["1"], ["1", "2"]);
      expect(findByTestAtrr(wrapper, "many").length).toBe(1);
    });

    it("should render NOT render", () => {
      const wrapper = createWrapper();
      expect(findByTestAtrr(wrapper, "container").length).toBe(0);
    });
  });
});
