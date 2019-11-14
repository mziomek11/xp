import React from "react";
import { shallow } from "enzyme";

import { Bar } from "./Bar";
import { findByTestAtrr } from "../../../../../testingUtils";

const createWrapper = (showToolBox: boolean = true) => {
  const props = { paint: { showToolBox } as any };

  return shallow<Bar>(<Bar {...props} />);
};

const wrapper = createWrapper();

describe("Paint ToolBar component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "bar").length).toBe(1);
    });

    it("should render 16 tools", () => {
      expect(findByTestAtrr(wrapper, "tool").length).toBe(16);
    });

    it("should render Options Component", () => {
      expect(findByTestAtrr(wrapper, "options").length).toBe(1);
    });
  });

  describe("getInlineStyles", () => {
    it("should return empty object", () => {
      const instnace = createWrapper(true).instance();

      expect(instnace.getInlineStyles()).toEqual({});
    });

    it("should return object with display none", () => {
      const instnace = createWrapper(false).instance();

      expect(instnace.getInlineStyles()).toEqual({ display: "none" });
    });
  });
});
