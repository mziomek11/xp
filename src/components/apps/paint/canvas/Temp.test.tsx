import React from "react";
import { shallow } from "enzyme";

import { TempCanvas } from "./Temp";
import { findByTestAtrr } from "../../../../../testingUtils";

const props = { paint: { setContext: jest.fn() } } as any;

const wrapper = shallow(<TempCanvas {...props} />);

describe("Paint TempCanvas component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "canvas").length).toBe(1);
    });
  });
});
