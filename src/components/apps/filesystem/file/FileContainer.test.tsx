import React from "react";
import { shallow } from "enzyme";

import { FileContainer } from "./FileContainer";
import { Display } from "../context/models";
import { findByTestAtrr } from "../../../../../testingUtils";

type Context = {
  display: Display;
  renamedFile: string;
  path: string[];
  historyPosition: number;
  focused: string[];
};

let mockSetPathFn: jest.Mock;
let mockSetFocusedFn: jest.Mock;
let mockCheckForDoubleClickFn: jest.Mock;

const createWrapper = (
  ovride: Partial<Context> = {},
  fileName: string = "defualt"
) => {
  mockSetPathFn = jest.fn();
  mockSetFocusedFn = jest.fn();
  mockCheckForDoubleClickFn = jest.fn();

  const context = {
    options: {
      display: ovride.display ? ovride.display : "tiles"
    },
    renamedFile: ovride.renamedFile ? ovride.renamedFile : "renmaedFile",
    path: ovride.path ? ovride.path : [],
    historyPosition: ovride.historyPosition ? ovride.historyPosition : 0,
    focused: ovride.focused ? ovride.focused : [],
    setPath: mockSetPathFn,
    setFocused: mockSetFocusedFn
  } as any;

  const comp = (
    <FileContainer
      context={context}
      file={{ name: fileName, type: "folder" } as any}
      checkForDoubleClick={mockCheckForDoubleClickFn}
    />
  );

  return shallow<FileContainer>(comp);
};

describe("Filesystem FileContainer Component", () => {
  describe("render", () => {
    it("should render thumbnail", () => {
      const wrapper = createWrapper({ display: "thumbnails" });
      expect(findByTestAtrr(wrapper, "thumbnail").length).toBe(1);
    });

    it("should render tile", () => {
      const wrapper = createWrapper({ display: "tiles" });
      expect(findByTestAtrr(wrapper, "tile").length).toBe(1);
    });

    it("should render icon", () => {
      const wrapper = createWrapper({ display: "icons" });
      expect(findByTestAtrr(wrapper, "icon").length).toBe(1);
    });

    it("should render list", () => {
      const wrapper = createWrapper({ display: "list" });
      expect(findByTestAtrr(wrapper, "list").length).toBe(1);
    });
  });

  describe("getElementClass", () => {
    it("should return proper class", () => {
      const wrapper = createWrapper({ display: "tiles" });
      const result = wrapper.instance().getElementClass("test");
      const expected = "filesystem__file__test filesystem__file__test--tiles";

      expect(result).toBe(expected);
    });
  });

  describe("handleClick", () => {
    it("should return null", () => {
      const wrapper = createWrapper({ renamedFile: "renamed" }, "renamed");

      expect(wrapper.instance().handleClick()).toBe(null);
      expect(mockSetFocusedFn.mock.calls.length).toBe(0);
      expect(mockCheckForDoubleClickFn.mock.calls.length).toBe(0);
    });

    it("should call checkForDoublea and setFocused", () => {
      const wrapper = createWrapper({ renamedFile: "renamed" }, "another");
      wrapper.instance().handleClick();

      expect(mockSetFocusedFn.mock.calls.length).toBe(1);
      expect(mockSetFocusedFn.mock.calls[0]).toEqual([["another"]]);
      expect(mockCheckForDoubleClickFn.mock.calls.length).toBe(1);
    });
  });

  describe("onDoubleClick", () => {
    it("should call setPath", () => {
      const wrapper = createWrapper(
        { path: ["1", "2"], historyPosition: 1 },
        "3"
      );

      wrapper.instance().onDoubleClick();
      expect(mockSetPathFn.mock.calls.length).toBe(1);
      expect(mockSetPathFn.mock.calls[0]).toEqual([["1", "2", "3"], 2]);
    });
  });
});
