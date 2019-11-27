import React from "react";
import { shallow } from "enzyme";

import { App } from "./App";
import { findByTestAtrr } from "../testingUtils";

const createWrapper = (on: boolean) => shallow(<App powerOn={on} />);

describe("App Component", () => {
  describe("render", () => {
    it("should render screen", () => {
      const wrapper = createWrapper(true);
      expect(findByTestAtrr(wrapper, "screen").length).toBe(1);
    });

    it("should render off", () => {
      const wrapper = createWrapper(false);
      expect(findByTestAtrr(wrapper, "off").length).toBe(1);
    });
  });
});
