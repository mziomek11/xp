import React from "react";
import { shallow } from "enzyme";

import { findByTestAtrr } from "../../../../../testingUtils";
import { Folders } from "./Folders";

const mockSetOptionFn = jest.fn();
const context = {
  options: { showFolders: false },
  setOptions: mockSetOptionFn
} as any;
const wrapper = shallow(<Folders context={context} />);

describe("Window Action Folders Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "container").length).toBe(1);
    });
  });

  describe("handleClick", () => {
    it("should call setOption", () => {
      findByTestAtrr(wrapper, "clickable").simulate("click");

      expect(mockSetOptionFn.mock.calls.length).toBe(1);
      expect(mockSetOptionFn.mock.calls[0]).toEqual([{ showFolders: true }]);
    });
  });
});
