import React from "react";
import { shallow } from "enzyme";

import Button from "./Button";
import { findByTestAtrr } from "../../../../testingUtils";

const createWrapper = (isRed: boolean = false) => {
  return shallow(
    <Button isRed={isRed} onClick={jest.fn()}>
      <p data-test="child" />
    </Button>
  );
};

const wrapper = createWrapper();
const btn = findByTestAtrr(wrapper, "btn");

describe("Calculator Button Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(btn.length).toBe(1);
    });

    it("should render children", () => {
      expect(findByTestAtrr(wrapper, "child").length).toBe(1);
    });
  });

  describe("style", () => {
    it("should has style color red", () => {
      const wrapper = createWrapper(true);
      expect(findByTestAtrr(wrapper, "btn").prop("style")).toEqual({
        color: "red"
      });
    });

    it("should has style color blue", () => {
      const wrapper = createWrapper(false);
      expect(findByTestAtrr(wrapper, "btn").prop("style")).toEqual({
        color: "blue"
      });
    });
  });
});
