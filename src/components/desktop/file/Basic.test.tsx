import React from "react";
import { shallow } from "enzyme";

import Basic from "./Basic";
import { findByTestAtrr } from "../../../../testingUtils";

const app = "appname" as any;
const wrapper = shallow(<Basic app={app} />);

describe("Desktop File Basic Component", () => {
  describe("render", () => {
    it("should render without throwing an error with proper props", () => {
      const file = findByTestAtrr(wrapper, "file");

      expect(file.length).toBe(1);
      expect(file.prop("name")).toBe("Appname");
      expect(file.prop("startWindowName")).toBe("Appname");
      expect(file.prop("application")).toBe("appname");
    });
  });
});
