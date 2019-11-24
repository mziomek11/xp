import React from "react";
import { shallow } from "enzyme";

import CalculatorView from "./CalculatorView";
import { findByTestAtrr } from "../../../../testingUtils";

const createWrapper = (memory: string | null = null) => {
  return shallow(<CalculatorView {...({ memory } as any)} />);
};

const wrapper = createWrapper();

describe("CalculatorView Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "calculator").length).toBe(1);
    });

    describe("memory", () => {
      it("should be rendered", () => {
        expect(findByTestAtrr(wrapper, "memory").length).toBe(1);
      });

      it("should have 'M' text", () => {
        const wrapper = createWrapper("123");
        expect(findByTestAtrr(wrapper, "memory").text()).toBe("M");
      });

      it("should NOT have any text", () => {
        const wrapper = createWrapper(null);
        expect(findByTestAtrr(wrapper, "memory").text()).toBe("");
      });
    });
  });
});
