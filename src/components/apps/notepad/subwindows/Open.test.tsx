import React from "react";
import { shallow } from "enzyme";

import { NotepadOpen } from "./Open";
import { findByTestAtrr } from "../../../../../testingUtils";

const mockSetWindowContextFn = jest.fn();
const mockSetNotepadContextFn = jest.fn();
const props = {
  window: {
    setContext: mockSetWindowContextFn,
    getSubWindowProps: jest.fn()
  } as any,
  notepad: { setContext: mockSetNotepadContextFn } as any
};

const wrapper = shallow<NotepadOpen>(<NotepadOpen {...props} />);

describe("Notepad Open Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "picker").length).toBe(1);
    });
  });

  describe("closeOpening", () => {
    it("should call setContext with proper args", () => {
      wrapper.instance().closeOpening();

      expect(mockSetWindowContextFn.mock.calls.length).toBe(1);
      expect(mockSetWindowContextFn.mock.calls[0]).toEqual([
        { disabled: false }
      ]);

      expect(mockSetNotepadContextFn.mock.calls.length).toBe(1);
      expect(mockSetNotepadContextFn.mock.calls[0]).toEqual([
        { isOpening: false }
      ]);
    });
  });
});
