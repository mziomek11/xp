import * as FilesystemAction from "./constants";
import reducer, { FileSystemState } from "./reducer";
import { FileTree } from "./models";

const initState: FileSystemState = {
  copiedFiles: {},
  files: {
    "Local Disk": {
      type: "disk",
      name: "Local Disk",
      content: {}
    }
  }
};

const updatedFiles: FileTree = {
  "Local Disk2": {
    type: "disk",
    name: "Local Disk2",
    content: {}
  }
};

const updatedCopiedFiles: FileTree = {
  Copied: {
    type: "folder",
    name: "Copied",
    content: {}
  }
};

describe("Filesystem reducer", () => {
  describe("cut", () => {
    it("should update state", () => {
      const updatedState = reducer(initState, {
        type: FilesystemAction.CUT,
        payload: { files: updatedFiles, copiedFiles: updatedCopiedFiles }
      });

      expect(updatedState).toEqual({
        ...initState,
        files: updatedFiles,
        copiedFiles: updatedCopiedFiles
      });
    });
  });

  describe("paste", () => {
    it("should update state", () => {
      const updatedState = reducer(initState, {
        type: FilesystemAction.PASTE,
        payload: { files: updatedFiles }
      });

      expect(updatedState).toEqual({ ...initState, files: updatedFiles });
    });
  });

  describe("remove", () => {
    it("should update state", () => {
      const updatedState = reducer(initState, {
        type: FilesystemAction.REMOVE,
        payload: { files: updatedFiles }
      });

      expect(updatedState).toEqual({ ...initState, files: updatedFiles });
    });
  });

  describe("update", () => {
    it("should update state", () => {
      const updatedState = reducer(initState, {
        type: FilesystemAction.UPDATE,
        payload: { files: updatedFiles }
      });

      expect(updatedState).toEqual({ ...initState, files: updatedFiles });
    });
  });

  describe("create", () => {
    it("should update state", () => {
      const updatedState = reducer(initState, {
        type: FilesystemAction.CREATE,
        payload: { files: updatedFiles }
      });

      expect(updatedState).toEqual({ ...initState, files: updatedFiles });
    });
  });

  describe("rename", () => {
    it("should update state", () => {
      const updatedState = reducer(initState, {
        type: FilesystemAction.RENAME,
        payload: { files: updatedFiles }
      });

      expect(updatedState).toEqual({ ...initState, files: updatedFiles });
    });
  });

  describe("copy", () => {
    it("should update state", () => {
      const updatedState = reducer(initState, {
        type: FilesystemAction.COPY,
        payload: { copiedFiles: updatedCopiedFiles }
      });

      expect(updatedState).toEqual({
        ...initState,
        copiedFiles: updatedCopiedFiles
      });
    });
  });
});
