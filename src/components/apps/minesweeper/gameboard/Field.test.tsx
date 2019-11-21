import React from "react";
import { shallow } from "enzyme";

import minesweeperConfig from "../config";
import { Field } from "./Field";
import { findByTestAtrr } from "../../../../../testingUtils";

type OptionalProps = {
  isBomb: boolean;
  checked: boolean;
  isGameOver: boolean;
};

const index = 0;

const createWrapper = (optProps: Partial<OptionalProps> = {}) => {
  const optionalProps: OptionalProps = {
    isBomb: false,
    checked: false,
    isGameOver: false,
    ...optProps
  };

  const field = {
    isBomb: optionalProps.isBomb,
    checked: optionalProps.checked
  };

  const props = {
    minesweeper: {
      fields: [field],
      isGameOver: optionalProps.isGameOver
    } as any,
    index: index
  };

  return shallow(<Field {...props} />);
};

describe("Minesweeper Gameboard Field Component", () => {
  describe("render", () => {
    describe("DiscoveredField component", () => {
      it("checked", () => {
        const props = { checked: true, isGameOver: false, isBomb: false };
        const wrapper = createWrapper(props);

        expect(findByTestAtrr(wrapper, "discovered").length).toBe(1);
      });

      it("isGameOver and isBomb", () => {
        const props = { checked: false, isGameOver: true, isBomb: true };
        const wrapper = createWrapper(props);

        expect(findByTestAtrr(wrapper, "discovered").length).toBe(1);
      });
    });

    describe("HiddenField component", () => {
      it("is NOT checked", () => {
        const props = { checked: false, isGameOver: false, isBomb: false };
        const wrapper = createWrapper(props);

        expect(findByTestAtrr(wrapper, "hidden").length).toBe(1);
      });
    });
  });
});
