import React from "react";
import { shallow } from "enzyme";

import { MainCanvas } from "./Main";
import { findByTestAtrr } from "../../../../../testingUtils";

const props = { paint: { setContext: jest.fn() } } as any;

const wrapper = shallow(<MainCanvas {...props} />);

describe("Paint MainCanvas component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "canvas").length).toBe(1);
    });
  });
});
