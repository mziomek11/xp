import React from "react";
import { shallow } from "enzyme";

import { IconContainer } from "./IconContainer";
import { findByTestAtrr } from "../../../../testingUtils";
import { Application } from "../../../store/models";

const application: Application = "Filesystem";
const context = { application } as any;
const wrapper = shallow(<IconContainer context={context} />);

describe("Window IconContainer Component", () => {
  describe("render", () => {
    it("should render Filesystem Icon component", () => {
      expect(findByTestAtrr(wrapper, "filesystem").length).toBe(1);
    });

    it("should throw an error", () => {
      const context = { application: "unknown app" } as any;
      expect(() => shallow(<IconContainer context={context} />)).toThrowError();
    });
  });
});
