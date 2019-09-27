import React from "react";
import { shallow } from "enzyme";

import ApplicationList from "./List";
import { findByTestAtrr } from "../../../../../testingUtils";

const props = {
  appWidth: 100,
  singleApps: ["1", "2", "3", "4"],
  multipleApps: { notepad: ["a", "b"], vscode: ["c", "d", "e"] }
};
const wrapper = shallow(<ApplicationList {...props} />);

describe("ToolbarApplicationList Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "list").length).toBe(1);
    });

    it("should render Application", () => {
      expect(findByTestAtrr(wrapper, "application").length).toBe(4);
    });

    it("should render SelectApplication", () => {
      expect(findByTestAtrr(wrapper, "select-application").length).toBe(2);
    });
  });
});
