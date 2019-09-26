import React from "react";
import { shallow } from "enzyme";

import { Application } from "./Application";
import { findByTestAtrr } from "../../../testingUtils";

describe("Application Component", () => {
  describe("render", () => {
    it("should render Filesystem app", () => {
      const wrapper = shallow(<Application id="x" application="Filesystem" />);

      expect(findByTestAtrr(wrapper, "filesystem").length).toBe(1);
    });

    it("should throw an error", () => {
      expect(() => {
        shallow(<Application id="x" application={"noapp" as any} />);
      }).toThrowError();
    });
  });
});
