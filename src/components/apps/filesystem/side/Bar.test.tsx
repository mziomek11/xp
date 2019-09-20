import React from "react";
import { shallow } from "enzyme";

import { Bar } from "./Bar";
import { findByTestAtrr } from "../../../../../testingUtils";

const createWrapper = (width: number) => {
  const ctx = { width } as any;
  return shallow<Bar>(<Bar context={ctx} />);
};

const wrapper = createWrapper(1000);

describe("Filesystem Side Bar component", () => {
  describe("render", () => {
    it("should render", () => {
      expect(findByTestAtrr(wrapper, "container").length).toBe(1);
    });

    it("should NOT render", () => {
      const wrapper = createWrapper(10);
      expect(findByTestAtrr(wrapper, "container").length).toBe(0);
    });

    it("should render FileAndFolderTasks component", () => {
      expect(findByTestAtrr(wrapper, "tasks").length).toBe(1);
    });

    it("should render Details component", () => {
      expect(findByTestAtrr(wrapper, "details").length).toBe(1);
    });
  });

  describe("shouldComponentUpdate", () => {
    const testUpdate = (
      startWidth: number,
      newWidth: number,
      expected: boolean
    ) => {
      const wrapper = createWrapper(startWidth);
      const context = { width: newWidth } as any;
      const result = wrapper.instance().shouldComponentUpdate({ context });

      expect(result).toBe(expected);
    };
    describe("should return true", () => {
      it("was bigger and is smaller", () => {
        testUpdate(500, 300, true);
      });

      it("was smaller and is bigger", () => {
        testUpdate(300, 500, true);
      });
    });

    describe("should return false", () => {
      it("was bigger and is bigger", () => {
        testUpdate(500, 600, false);
      });

      it("was smaller and is smaller", () => {
        testUpdate(100, 200, false);
      });
    });
  });
});
