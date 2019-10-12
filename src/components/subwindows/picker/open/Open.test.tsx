import React from "react";
import { shallow } from "enzyme";

import { Open } from "./Open";
import { FilesystemContextType } from "ContextType";
import { findByTestAtrr } from "../../../../../testingUtils";

let mockReplaceWindowFn: jest.Mock;

const createWrapper = (filesystemCtx: Partial<FilesystemContextType> = {}) => {
  mockReplaceWindowFn = jest.fn();

  const props = {
    replaceWindow: mockReplaceWindowFn,
    id: "id",
    fileType: "text" as any,
    icon: "",
    application: "notepad" as any,
    filesystem: {
      path: ["a"],
      files: [],
      ...filesystemCtx
    } as any
  };

  return shallow<Open>(<Open {...props} />);
};

const wrapper = createWrapper();

describe("Picker Open Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "form").length).toBe(1);
    });
  });

  describe("handleSave", () => {
    it("should call replaceWindow", () => {
      const instance = createWrapper({
        path: ["a"],
        files: [{ name: "abc", type: "text", content: "" }]
      }).instance();
      instance.handleOpen("abc");

      expect(mockReplaceWindowFn.mock.calls.length).toBe(1);
    });

    describe("should not work", () => {
      it("text is empty", () => {
        const instance = createWrapper({ path: ["a"] }).instance();
        instance.handleOpen("");

        expect(mockReplaceWindowFn.mock.calls.length).toBe(0);
      });

      it("path is length is 0", () => {
        const instance = createWrapper({ path: [] }).instance();
        instance.handleOpen("abc");

        expect(mockReplaceWindowFn.mock.calls.length).toBe(0);
      });

      it("file exists and is another type", () => {
        const instance = createWrapper({
          path: ["a"],
          files: [{ name: "abc", type: "folder", content: {} }]
        }).instance();
        instance.handleOpen("abc");

        expect(mockReplaceWindowFn.mock.calls.length).toBe(0);
      });
    });
  });
});
