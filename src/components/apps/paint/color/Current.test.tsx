import React from "react";
import { shallow } from "enzyme";

import { Current } from "./Current";
import { findByTestAtrr } from "../../../../../testingUtils";

const ctx = { primaryColor: "#aaaaaa", secondaryColor: "#bbbbbb" } as any;
const wrapper = shallow(<Current paint={ctx} />);

describe("Paint CurrentColors component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "container").length).toBe(1);
    });

    it("should render primary color", () => {
      const primary = findByTestAtrr(wrapper, "primary");

      expect(primary.length).toBe(1);
      expect(primary.prop("style")).toEqual({ background: ctx.primaryColor });
    });

    it("should render secondary color", () => {
      const secondary = findByTestAtrr(wrapper, "secondary");

      expect(secondary.length).toBe(1);
      expect(secondary.prop("style")).toEqual({
        background: ctx.secondaryColor
      });
    });
  });
});
