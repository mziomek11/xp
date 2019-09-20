import React from "react";
import { shallow } from "enzyme";

import App from "./App";
import { findByTestAtrr } from "../testingUtils";

const wrapper = shallow(<App />);

describe("App Component", () => {
  describe("render", () => {
    it("should render screen", () => {
      expect(findByTestAtrr(wrapper, "screen").length).toBe(1);
    });
  });
});
