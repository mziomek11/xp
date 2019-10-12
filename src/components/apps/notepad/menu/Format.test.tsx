import React from "react";
import { shallow } from "enzyme";

import { Format } from "./Format";
import { findByTestAtrr } from "../../../../../testingUtils";

const mockSetContextFn = jest.fn();
const props = {
  notepad: { wordWrap: false, setContext: mockSetContextFn } as any
};

const wrapper = shallow<Format>(<Format {...props} />);

describe("Notepad Menu Format Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "format").length).toBe(1);
    });
  });

  describe("toggleWordWrap", () => {
    it("should call setContext is proper args", () => {
      wrapper.instance().toggleWordWrap();

      expect(mockSetContextFn.mock.calls.length).toBe(1);
      expect(mockSetContextFn.mock.calls[0]).toEqual([{ wordWrap: true }]);
    });
  });
});
