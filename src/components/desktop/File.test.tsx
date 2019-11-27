import React from "react";
import { shallow } from "enzyme";

import config from "./config";
import { File } from "./File";
import { findByTestAtrr } from "../../../testingUtils";

let mockCheckForDoubleClickFn: jest.Mock;
let mockSetContextFn: jest.Mock;

const id = 1;
const createWrapper = (checkForDoubleClickResult: boolean = false) => {
  mockCheckForDoubleClickFn = jest.fn(() => checkForDoubleClickResult);
  mockSetContextFn = jest.fn();

  const props = {
    name: "MyFile",
    openWindow: jest.fn(),
    checkForDoubleClick: mockCheckForDoubleClickFn,
    startWindowName: "name",
    application: "notepad" as any,
    id: id,
    desktop: { setContext: mockSetContextFn, focusedIds: [] } as any
  };

  return shallow<File>(<File {...props} />);
};

const wrapper = createWrapper();
const instance = wrapper.instance();

describe("File Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "file").length).toBe(1);
    });
  });

  describe("getInlineStyles", () => {
    it("should return object with width, height and margin from config", () => {
      expect(instance.getInlineStyles()).toEqual({
        width: config.fileSize,
        height: config.fileSize,
        margin: config.fileMargin
      });
    });
  });

  describe("handleClick", () => {
    it("should call checkForDoubleClick", () => {
      const instance = createWrapper().instance();
      instance.handleClick();

      expect(mockCheckForDoubleClickFn.mock.calls.length).toBe(1);
    });

    it("should call setContext with own id", () => {
      const instance = createWrapper(false).instance();
      instance.handleClick();

      expect(mockSetContextFn.mock.calls.length).toBe(1);
      expect(mockSetContextFn.mock.calls[0]).toEqual([{ focusedIds: [id] }]);
    });

    it("should call setContext with empty id list", () => {
      const instance = createWrapper(true).instance();
      instance.handleClick();

      expect(mockSetContextFn.mock.calls.length).toBe(1);
      expect(mockSetContextFn.mock.calls[0]).toEqual([{ focusedIds: [] }]);
    });
  });
});
