import React from "react";
import { shallow } from "enzyme";

import { StartApplication } from "./Application";
import { findByTestAtrr } from "../../../../../../testingUtils";

const startWindowName = "this is start window name";
const application = "calculator" as any;
const name = "application name";
const openWindow = jest.fn();
const props = { startWindowName, application, name, openWindow };

const wrapper = shallow(<StartApplication {...props} />);
const container = findByTestAtrr(wrapper, "app");

describe("StartApplication Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(container.length).toBe(1);
    });
  });

  describe("onClick", () => {
    it("should call openWindow", () => {
      container.simulate("click");

      expect(openWindow.mock.calls.length).toBe(1);
    });
  });
});
