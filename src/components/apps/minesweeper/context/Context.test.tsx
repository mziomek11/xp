import React from "react";
import { shallow } from "enzyme";

import { ContextProvider } from "./Context";
import { findByTestAtrr } from "../../../../../testingUtils";

const wrapper = shallow<ContextProvider>(
  <ContextProvider>
    <p data-test="child" />
  </ContextProvider>
);
const instance = wrapper.instance();

describe("Minesweeper Context Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "context").length).toBe(1);
    });

    it("should render children", () => {
      expect(findByTestAtrr(wrapper, "child").length).toBe(1);
    });
  });

  describe("onGameOver", () => {
    it("should update state", () => {
      const index = 123;
      instance.setState({ isGameOver: false, destroyedBombIndex: 0 });
      instance.onGameOver(index);

      expect(instance.state.isGameOver).toBe(true);
      expect(instance.state.destroyedBombIndex).toBe(index);
    });
  });

  describe("checkField", () => {
    it("should update state", () => {
      instance.checkField(0);

      expect(instance.state.fields[0].checked).toBe(true);
    });
  });
});
