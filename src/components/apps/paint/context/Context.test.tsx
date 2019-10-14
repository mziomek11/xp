import React from "react";
import { shallow } from "enzyme";

import { Provider } from "./Context";
import { findByTestAtrr } from "../../../../../testingUtils";

const wrapper = shallow(<Provider />);

describe("Paint ContextProvider component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "context").length).toBe(1);
    });
  });
});
