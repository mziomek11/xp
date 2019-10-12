import React from "react";
import { shallow } from "enzyme";

import { Folders } from "./Folders";
import { findByTestAtrr } from "../../../../../testingUtils";

const mockSetOptionsFn = jest.fn();
const ctx = { setOptions: mockSetOptionsFn } as any;
const wrapper = shallow(<Folders filesystem={ctx} />);

describe("Filesystem Folders component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "container").length).toBe(1);
    });

    it("should render List component", () => {
      expect(findByTestAtrr(wrapper, "list").length).toBe(1);
    });
  });

  describe("handleCloseClick", () => {
    it("should call setOptions", () => {
      findByTestAtrr(wrapper, "clickable").simulate("click");

      expect(mockSetOptionsFn.mock.calls.length).toBe(1);
    });
  });
});
