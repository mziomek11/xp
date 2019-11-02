import React from "react";
import { shallow } from "enzyme";

import { NotepadSave } from "./Save";
import { findByTestAtrr } from "../../../../../testingUtils";

const mockSetWindowContextFn = jest.fn();
const mockSetNotepadContextFn = jest.fn();
const props = {
  window: {
    setContext: mockSetWindowContextFn
  } as any,
  notepad: { setContext: mockSetNotepadContextFn } as any
};

const wrapper = shallow<NotepadSave>(<NotepadSave {...props} />);

describe("Notepad Save Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "picker").length).toBe(1);
    });
  });

  describe("closeOpening", () => {
    it("should call setContext with proper args", () => {
      wrapper.instance().closeSaveAs();

      expect(mockSetWindowContextFn.mock.calls.length).toBe(1);
      expect(mockSetWindowContextFn.mock.calls[0]).toEqual([
        { disabled: false }
      ]);

      expect(mockSetNotepadContextFn.mock.calls.length).toBe(1);
      expect(mockSetNotepadContextFn.mock.calls[0]).toEqual([
        { isSaving: false }
      ]);
    });
  });

  describe("setPath", () => {
    it("should be called with proper args", () => {
      const path = ["a", "b", "c"];
      wrapper.instance().setPath(path);

      expect(mockSetNotepadContextFn.mock.calls.length).toBe(2);
      expect(mockSetNotepadContextFn.mock.calls[1]).toEqual([{ path }]);
    });
  });
});
