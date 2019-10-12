import React from "react";
import { shallow } from "enzyme";

import { Form } from "./Form";
import { FilesystemContextType } from "ContextType";
import { findByTestAtrr } from "../../../../../../testingUtils";

let mockWindowCloseFn: jest.Mock;
let mockOnSubmitFn: jest.Mock;

const createWrapper = (filesystemCtx: Partial<FilesystemContextType> = {}) => {
  mockWindowCloseFn = jest.fn();
  mockOnSubmitFn = jest.fn();

  const props = {
    acceptText: "Accept",
    startText: "startTExt",
    fileType: "text" as any,
    onSubmit: mockOnSubmitFn,
    filesystem: {
      path: ["a"],
      files: [],
      focused: [],
      ...filesystemCtx
    } as any,
    window: {
      close: mockWindowCloseFn
    } as any
  };

  return shallow<Form>(<Form {...props} />);
};

const wrapper = createWrapper();

describe("Picker Form Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "form").length).toBe(1);
    });

    it("should render Input component", () => {
      expect(findByTestAtrr(wrapper, "input").length).toBe(1);
    });

    it("should render submit Button component", () => {
      expect(findByTestAtrr(wrapper, "submit-btn").length).toBe(1);
    });

    it("should render cancel Button component", () => {
      expect(findByTestAtrr(wrapper, "cancel-btn").length).toBe(1);
    });
  });

  describe("setText", () => {
    it("should update state", () => {
      const newText: string = "changed text";
      wrapper.instance().setState({ text: newText });

      expect(wrapper.instance().state.text).toBe(newText);
    });
  });

  describe("handleSubmit", () => {
    it("should call onSubmit", () => {
      wrapper.instance().handleSubmit({ preventDefault: jest.fn() } as any);
      expect(mockOnSubmitFn.mock.calls.length).toBe(1);
    });
  });
});
