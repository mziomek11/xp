import React from "react";
import { shallow } from "enzyme";

import { TitleContainer } from "./TitleContainer";
import { findByTestAtrr } from "../../../../testingUtils";
import { Application } from "../../../store/models";

const application: Application = "Filesystem";
const context = { application } as any;
const wrapper = shallow(<TitleContainer context={context} />);

describe("Window TitleContainer Component", () => {
  describe("render", () => {
    it("should render Filesystem Title component", () => {
      expect(findByTestAtrr(wrapper, "filesystem").length).toBe(1);
    });

    it("should throw an error", () => {
      const context = { application: "unknown app" } as any;
      expect(() =>
        shallow(<TitleContainer context={context} />)
      ).toThrowError();
    });
  });
});
