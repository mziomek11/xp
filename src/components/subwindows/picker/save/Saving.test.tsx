import React from "react";
import { shallow } from "enzyme";

import { Saving } from "./Saving";
import { FilesystemContextType } from "ContextType";
import { findByTestAtrr } from "../../../../../testingUtils";

let mockRenameWindowFn: jest.Mock;
let mockWindowCloseFn: jest.Mock;
let mockUpdateContentFn: jest.Mock;
let mockCreateFn: jest.Mock;
let mockSetFilePathFn: jest.Mock;

const createWrapper = (
  filesystemCtx: Partial<FilesystemContextType> = {},
  content: any = "content"
) => {
  mockRenameWindowFn = jest.fn();
  mockWindowCloseFn = jest.fn();
  mockUpdateContentFn = jest.fn();
  mockCreateFn = jest.fn();
  mockSetFilePathFn = jest.fn();

  const props = {
    id: "id",
    windowName: "windowNAme",
    fileType: "text" as any,
    content,
    setFilePath: mockSetFilePathFn,
    renameWindow: mockRenameWindowFn,
    updateContent: mockUpdateContentFn,
    create: mockCreateFn,
    filesystem: {
      path: ["a"],
      files: [],
      ...filesystemCtx
    } as any,
    window: {
      close: mockWindowCloseFn
    } as any
  };

  return shallow<Saving>(<Saving {...props} />);
};

const wrapper = createWrapper();

describe("Save Saving Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "form").length).toBe(1);
    });
  });

  describe("handleSave", () => {
    it("should call renameWindow, setFilePath and close", () => {
      const instance = createWrapper().instance();
      instance.handleSave("asdasdas");

      expect(mockRenameWindowFn.mock.calls.length).toBe(1);
      expect(mockSetFilePathFn.mock.calls.length).toBe(1);
      expect(mockWindowCloseFn.mock.calls.length).toBe(1);
    });

    describe("should not work", () => {
      it("text is empty", () => {
        const instance = createWrapper({ path: ["a"] }).instance();
        instance.handleSave("");

        expect(mockWindowCloseFn.mock.calls.length).toBe(0);
      });

      it("path is length is 0", () => {
        const instance = createWrapper({ path: [] }).instance();
        instance.handleSave("abc");

        expect(mockWindowCloseFn.mock.calls.length).toBe(0);
      });

      it("file exists and is another type", () => {
        const instance = createWrapper({
          path: ["a"],
          files: [{ name: "abc", type: "folder", content: {} }]
        }).instance();
        instance.handleSave("abc");

        expect(mockWindowCloseFn.mock.calls.length).toBe(0);
      });
    });

    describe("file exists", () => {
      it("should call updateContent", () => {
        const path = ["a"];
        const name = "fileToSave";
        const content = "this is content";
        const files = [{ name, type: "text" as any, content: "" }];
        const instance = createWrapper({ path, files }, content).instance();
        instance.handleSave(name);

        expect(mockUpdateContentFn.mock.calls.length).toBe(1);
        expect(mockUpdateContentFn.mock.calls[0]).toEqual([
          path,
          name,
          content
        ]);
      });
    });

    describe("file does not exists", () => {
      it("should call create", () => {
        const path = ["a"];
        const name = "fileToSave";
        const content = "this is content";
        const instance = createWrapper({ path }, content).instance();
        instance.handleSave(name);

        expect(mockCreateFn.mock.calls.length).toBe(1);
        expect(mockCreateFn.mock.calls[0]).toEqual([
          path,
          { name, content, type: "text" }
        ]);
      });
    });
  });
});
