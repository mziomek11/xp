import React from "react";
import { shallow } from "enzyme";

import Display from "./Display";
import { findByTestAtrr } from "../../../../testingUtils";

const createWrapper = (text: string, triedToDivideByZero: boolean = false) => {
  const props = { text, triedToDivideByZero };
  return shallow(<Display {...props} />);
};

const wrapper = createWrapper("a");

describe("Calculator Display Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "display").length).toBe(1);
    });

    it("should display exact text", () => {
      const text = "1234567890";
      const wrapper = createWrapper(text);

      expect(findByTestAtrr(wrapper, "display").text()).toBe(text);
    });

    it("should convert text . into ,", () => {
      const text = "123.456";
      const wrapper = createWrapper(text);

      expect(findByTestAtrr(wrapper, "display").text()).toBe("123,456");
    });

    it("should convert text into exponential", () => {
      const text = "123456789123234234234234.234234234234234234234234";
      const wrapper = createWrapper(text);

      expect(findByTestAtrr(wrapper, "display").text()).toBe(
        parseFloat(text)
          .toExponential()
          .replace(".", ",")
      );
    });

    it("should have text 'Cannot be divided by zero'", () => {
      const wrapper = createWrapper("123", true);

      expect(findByTestAtrr(wrapper, "display").text()).toBe(
        "Cannot be divided by zero"
      );
    });
  });
});
