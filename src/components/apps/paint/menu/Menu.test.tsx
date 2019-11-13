import React from "react";
import { shallow } from "enzyme";

import { PaintMenu } from "./Menu";
import { PaintContextType, WindowContextType } from "ContextType";
import { findByTestAtrr } from "../../../../../testingUtils";
import { getIcon } from "../../../../icons";

const getImageDataResult = "this is getImageData result";

let mockUpdateFn: jest.Mock;
let mockReplaceFn: jest.Mock;
let mockCloseWindowFn: jest.Mock;
let mockSetWindowContextFn: jest.Mock;
let mockSetPaintContextFn: jest.Mock;

const createWrapper = (
  paintCtx: Partial<PaintContextType> = {},
  windowCtx: Partial<WindowContextType> = {}
) => {
  mockUpdateFn = jest.fn();
  mockReplaceFn = jest.fn();
  mockSetWindowContextFn = jest.fn();
  mockSetPaintContextFn = jest.fn();
  mockCloseWindowFn = jest.fn();

  const props = {
    paint: {
      setContext: mockSetPaintContextFn,
      path: [],
      getImageData: () => getImageDataResult,
      ...paintCtx
    } as any,
    window: {
      id: "id",
      name: "name",
      disabled: false,
      focused: false,
      setContext: mockSetWindowContextFn,
      close: mockCloseWindowFn,
      ...windowCtx
    } as any,
    update: mockUpdateFn,
    replace: mockReplaceFn
  };

  return shallow<PaintMenu>(<PaintMenu {...props} />);
};

const wrapper = createWrapper();

describe("Paint Menu Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "menu").length).toBe(1);
    });

    it("should render File component", () => {
      expect(findByTestAtrr(wrapper, "file").length).toBe(1);
    });

    it("should render Edit component", () => {
      expect(findByTestAtrr(wrapper, "edit").length).toBe(1);
    });

    it("should render View component", () => {
      expect(findByTestAtrr(wrapper, "view").length).toBe(1);
    });

    it("should render Image component", () => {
      expect(findByTestAtrr(wrapper, "image").length).toBe(1);
    });
  });

  describe("handleNewClick", () => {
    it("should call replace", () => {
      const windowId = "winID";
      const wrapper = createWrapper({}, { id: windowId });
      wrapper.instance().handleNewClick();

      expect(mockReplaceFn.mock.calls.length).toBe(1);
      const [winId, window] = mockReplaceFn.mock.calls[0];
      const { id, ...rest } = window;

      expect(winId).toBe(windowId);
      expect(rest).toEqual({
        name: "Untilted Paint",
        application: "paint",
        icon: getIcon("paint"),
        minimalized: false,
        openData: { content: undefined, path: undefined }
      });
    });
  });

  describe("handleOpenClick", () => {
    it("should call setWindowContext and setPaintContext", () => {
      const wrapper = createWrapper();
      wrapper.instance().handleOpenClick();

      expect(mockSetPaintContextFn.mock.calls.length).toBe(1);
      expect(mockSetPaintContextFn.mock.calls[0]).toEqual([
        {
          isOpening: true
        }
      ]);

      expect(mockSetWindowContextFn.mock.calls.length).toBe(1);
      expect(mockSetWindowContextFn.mock.calls[0]).toEqual([
        { disabled: true }
      ]);
    });
  });

  describe("handleSaveAsClick", () => {
    it("should call setWindowContext and setPaintContext", () => {
      const wrapper = createWrapper();
      wrapper.instance().handleSaveAsClick();

      expect(mockSetPaintContextFn.mock.calls.length).toBe(1);
      expect(mockSetPaintContextFn.mock.calls[0]).toEqual([
        {
          isSaving: true
        }
      ]);

      expect(mockSetWindowContextFn.mock.calls.length).toBe(1);
      expect(mockSetWindowContextFn.mock.calls[0]).toEqual([
        { disabled: true }
      ]);
    });
  });

  describe("handleSaveClick", () => {
    it("should call saveAsClick", () => {
      const wrapper = createWrapper({ path: undefined });
      wrapper.instance().handleSaveClick();

      expect(mockSetPaintContextFn.mock.calls.length).toBe(1);
      expect(mockSetWindowContextFn.mock.calls.length).toBe(1);
    });

    it("should call update", () => {
      const path = ["a", "b"];
      const windowName = "asdasdasd";
      const wrapper = createWrapper({ path }, { name: windowName });

      wrapper.instance().handleSaveClick();

      expect(mockUpdateFn.mock.calls.length).toBe(1);
      expect(mockUpdateFn.mock.calls[0]).toEqual([
        path,
        windowName,
        getImageDataResult
      ]);
    });
  });

  describe("handleCloseClick", () => {
    it("should call window close", () => {
      const wrapper = createWrapper();
      wrapper.instance().handleCloseClick();

      expect(mockCloseWindowFn.mock.calls.length).toBe(1);
    });
  });
});
