import React from "react";
import { shallow } from "enzyme";

import { PickOptions } from "./Pick";
import { findByTestAtrr } from "../../../../../../testingUtils";

const paint: any = { options: { pickColor: "color" } };

const wrapper = shallow<PickOptions>(<PickOptions paint={paint} />);

describe("Paint ToolPickOptions component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "options").length).toBe(1);
    });
  });
});
