import React from "react";
import { shallow } from "enzyme";

import { Current } from "./Current";
import { findByTestAtrr } from "../../../../../../testingUtils";
import { Tool } from "../../models";

const testRenderedOptions = (expectedOptions: string, tools: Tool[]) => {
  tools.forEach(tool => {
    const wrapper = shallow(<Current paint={{ selectedTool: tool } as any} />);
    expect(findByTestAtrr(wrapper, expectedOptions).length).toBe(1);
  });
};

describe("Paint ToolCurrentOptions component", () => {
  describe("render", () => {
    it("should render shape options", () => {
      const tools: Tool[] = ["circle", "poly", "rounded", "rect"];
      testRenderedOptions("shape", tools);
    });

    it("should render line options", () => {
      const tools: Tool[] = ["line", "curve"];
      testRenderedOptions("line", tools);
    });

    it("should render transparency options", () => {
      const tools: Tool[] = ["anySelect", "rectSelect", "text"];
      testRenderedOptions("transparency", tools);
    });

    it("should render rubber options", () => {
      const tools: Tool[] = ["rubber"];
      testRenderedOptions("rubber", tools);
    });

    it("should render zoom options", () => {
      const tools: Tool[] = ["zoom"];
      testRenderedOptions("zoom", tools);
    });

    it("should render brush options", () => {
      const tools: Tool[] = ["brush"];
      testRenderedOptions("brush", tools);
    });

    it("should render aero options", () => {
      const tools: Tool[] = ["aero"];
      testRenderedOptions("aero", tools);
    });

    it("should render default options", () => {
      const tools: Tool[] = ["pencil", "fill", "pick"];
      testRenderedOptions("default", tools);
    });
  });
});
