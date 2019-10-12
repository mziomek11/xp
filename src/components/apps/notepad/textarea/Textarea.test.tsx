import React from "react";
import { shallow } from "enzyme";

import { TextArea } from "./Textarea";
import { findByTestAtrr } from "../../../../../testingUtils";

const mockSetContextFn = jest.fn();
const props = {
  notepad: {
    text: "text",
    wordWrap: false,
    setContext: mockSetContextFn
  } as any
};

const wrapper = shallow<TextArea>(<TextArea {...props} />);

describe("Notepad TextArea Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      const textarea = findByTestAtrr(wrapper, "textarea");

      expect(textarea.length).toBe(1);
      expect(textarea.prop("value")).toBe("text");
    });
  });

  describe("handleChange", () => {
    it("should call setContext with proper args", () => {
      const newText = "new text";
      wrapper.instance().handleChange({ target: { value: newText } } as any);

      expect(mockSetContextFn.mock.calls.length).toBe(1);
      expect(mockSetContextFn.mock.calls[0]).toEqual([{ text: newText }]);
    });
  });
});
