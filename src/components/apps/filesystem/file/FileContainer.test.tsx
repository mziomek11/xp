import React from "react";
import { shallow } from "enzyme";

import { FileContainer } from "./FileContainer";
import { Display } from "../context/models";
import { findByTestAtrr } from "../../../../../testingUtils";
import { File } from "../../../../store/filesystem/models";

type Context = {
  display: Display;
  renamedFile: string;
  path: string[];
  historyPosition: number;
  focused: string[];
};

let mockOpenFn: jest.Mock;
let mockSetPathFn: jest.Mock;
let mockSetFocusedFn: jest.Mock;
let mockCheckForDoubleClickFn: jest.Mock;

const createWrapper = (
  ovride: Partial<Context> = {},
  file: Partial<File> = {},
  isFilePicker: boolean = false
) => {
  mockOpenFn = jest.fn();
  mockSetPathFn = jest.fn();
  mockSetFocusedFn = jest.fn();
  mockCheckForDoubleClickFn = jest.fn();

  const props = {
    filesystem: {
      options: {
        display: ovride.display ? ovride.display : "tiles"
      },
      renamedFile: ovride.renamedFile ? ovride.renamedFile : "renmaedFile",
      path: ovride.path ? ovride.path : [],
      historyPosition: ovride.historyPosition ? ovride.historyPosition : 0,
      focused: ovride.focused ? ovride.focused : [],
      setPath: mockSetPathFn,
      setFocused: mockSetFocusedFn
    } as any,
    file: { name: "default", type: "folder", ...file } as any,
    checkForDoubleClick: mockCheckForDoubleClickFn,
    open: mockOpenFn,
    isFilePicker
  };

  return shallow<FileContainer>(<FileContainer {...props} />);
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
      const ctx = { renamedFile: "renamed" };
      const file = { name: "renamed" };
      const wrapper = createWrapper(ctx, file);

      expect(wrapper.instance().handleClick()).toBe(null);
      expect(mockSetFocusedFn.mock.calls.length).toBe(0);
      expect(mockCheckForDoubleClickFn.mock.calls.length).toBe(0);
    });

    it("should call checkForDoublea and setFocused", () => {
      const ctx = { renamedFile: "renamed" };
      const file = { name: "another" };
      const wrapper = createWrapper(ctx, file);

      wrapper.instance().handleClick();

      expect(mockSetFocusedFn.mock.calls.length).toBe(1);
      expect(mockSetFocusedFn.mock.calls[0]).toEqual([["another"]]);
      expect(mockCheckForDoubleClickFn.mock.calls.length).toBe(1);
    });
  });

  describe("onDoubleClick", () => {
    describe("notepad or paint", () => {
      it("should call open when is NOT picker", () => {
        const wrapper = createWrapper({}, { type: "text" }, false);
        wrapper.instance().onDoubleClick()();

        expect(mockOpenFn.mock.calls.length).toBe(1);
      });

      it("shoult NOT call open when is picker", () => {
        const wrapper = createWrapper({}, { type: "text" }, true);
        wrapper.instance().onDoubleClick()();

        expect(mockOpenFn.mock.calls.length).toBe(0);
      });
    });

    describe("folder like", () => {
      it("should call setPath", () => {
        const ctx = { path: ["1", "2"], historyPosition: 1 };
        const file = { name: "3", type: "folder" as any };
        const wrapper = createWrapper(ctx, file);

        wrapper.instance().onDoubleClick()();
        expect(mockSetPathFn.mock.calls.length).toBe(1);
        expect(mockSetPathFn.mock.calls[0]).toEqual([["1", "2", "3"], 2]);
      });
    });
  });
});
