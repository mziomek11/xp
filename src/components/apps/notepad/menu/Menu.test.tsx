import React from "react";
import { shallow } from "enzyme";

import { NotepadMenu } from "./Menu";
import { NotepadContextType, WindowContextType } from "ContextType";
import { findByTestAtrr } from "../../../../../testingUtils";
import { getIcon } from "../../../../icons";

let mockUpdateFn: jest.Mock;
let mockReplaceFn: jest.Mock;
let mockCloseWindowFn: jest.Mock;
let mockSetWindowContextFn: jest.Mock;
let mockSetNotepadContextFn: jest.Mock;

const createWrapper = (
  notepadCtx: Partial<NotepadContextType> = {},
  windowCtx: Partial<WindowContextType> = {}
) => {
  mockUpdateFn = jest.fn();
  mockReplaceFn = jest.fn();
  mockSetWindowContextFn = jest.fn();
  mockSetNotepadContextFn = jest.fn();
  mockCloseWindowFn = jest.fn();

  const props = {
    notepad: {
      setContext: mockSetNotepadContextFn,
      path: [],
      text: "",
      ...notepadCtx
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

  return shallow<NotepadMenu>(<NotepadMenu {...props} />);
};

const wrapper = createWrapper();

describe("Notepad Menu Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "menu").length).toBe(1);
    });

    it("should render File component", () => {
      expect(findByTestAtrr(wrapper, "file").length).toBe(1);
    });

    it("should render Format component", () => {
      expect(findByTestAtrr(wrapper, "format").length).toBe(1);
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
        name: "Untilted Notepad",
        application: "notepad",
        icon: getIcon("notepad"),
        minimalized: false,
        openData: { content: "", path: undefined }
      });
    });
  });

  describe("handleOpenClick", () => {
    it("should call setWindowState and setNotepadState", () => {
      const wrapper = createWrapper();
      wrapper.instance().handleOpenClick();

      expect(mockSetNotepadContextFn.mock.calls.length).toBe(1);
      expect(mockSetNotepadContextFn.mock.calls[0]).toEqual([
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
    it("should call setWindowState and setNotepadState", () => {
      const wrapper = createWrapper();
      wrapper.instance().handleSaveAsClick();

      expect(mockSetNotepadContextFn.mock.calls.length).toBe(1);
      expect(mockSetNotepadContextFn.mock.calls[0]).toEqual([
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

      expect(mockSetNotepadContextFn.mock.calls.length).toBe(1);
      expect(mockSetWindowContextFn.mock.calls.length).toBe(1);
    });

    it("should call update", () => {
      const notepadPath = ["a", "b"];
      const notepadText = "WWWWWW";
      const windowName = "asdasdasd";
      const wrapper = createWrapper(
        { path: notepadPath, text: notepadText },
        { name: windowName }
      );

      wrapper.instance().handleSaveClick();

      expect(mockUpdateFn.mock.calls.length).toBe(1);
      expect(mockUpdateFn.mock.calls[0]).toEqual([
        notepadPath,
        windowName,
        notepadText
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
