import React from "react";
import { shallow } from "enzyme";

import { testContextData } from "../Context.test";
import { ExitAction } from "./ExitAction";
import { findByTestAtrr } from "../../../../testingUtils";

const mockCloseWindowFn = jest.fn();
const context = { ...testContextData, close: mockCloseWindowFn };
const wrapper = shallow(<ExitAction window={context} />);

describe("ExitAction Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "action").length).toBe(1);
    });

    it("should have exit type", () => {
      expect(findByTestAtrr(wrapper, "action").prop("type")).toBe("exit");
    });
  });

  describe("onClick", () => {
    it("should emit closeWindow", () => {
      findByTestAtrr(wrapper, "action").simulate("click");

      expect(mockCloseWindowFn.mock.calls.length).toBe(1);
    });
  });
});
