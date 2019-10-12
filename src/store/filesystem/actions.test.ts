import * as actions from "./actions";
import * as FilesystemAction from "./constants";
import store from "../";
import { File } from "./models";

type AnyAction = {
  type: any;
  payload?: any;
};

const getFolderData = (x: number): File => ({
  type: "folder",
  content: {},
  name: `New folder${x > 1 ? ` (${x})` : ""}`
});

describe("Filesystem actions", () => {
  beforeEach(() => {
    const files = Object.keys(store.getState().fileSystem.files);
    store.dispatch(actions.cut([], files));
    store.dispatch(actions.copy([], []));
  });

  describe("create", () => {
    const folder: File = { type: "folder", name: "MyFolder", content: {} };

    it("should add folder", () => {
      store.dispatch(actions.createFolder([]));
      const action = actions.create([], folder) as AnyAction;

      expect(action.type).toBe(FilesystemAction.CREATE);
      expect(action.payload.files).toEqual({
        "New folder": getFolderData(1),
        MyFolder: folder
      });
    });

    it("should fail when path is unknown", () => {
      const unknownPath = ["path", "does", "not", "exist"];
      const action = actions.create(unknownPath, folder) as AnyAction;

      expect(action.type).toBe(FilesystemAction.CREATE_FAILED);
      expect(action.payload).toBe(undefined);
    });

    it("should fail when file already exists", () => {
      store.dispatch(actions.createFolder([]));
      const action = actions.create([], getFolderData(1)) as AnyAction;

      expect(action.type).toBe(FilesystemAction.CREATE_FAILED);
      expect(action.payload).toBe(undefined);
    });
  });

  describe("createFolder", () => {
    it("should add folders", () => {
      store.dispatch(actions.createFolder([]));
      const action = actions.createFolder([]) as AnyAction;

      expect(action.type).toBe(FilesystemAction.CREATE);
      expect(action.payload.files).toEqual({
        "New folder": getFolderData(1),
        "New folder (2)": getFolderData(2)
      });
    });

    it("should fail when path is wrong", () => {
      const path = ["path", "no", "exists"];
      const action = actions.createFolder(path) as AnyAction;

      expect(action.type).toBe(FilesystemAction.CREATE_FAILED);
      expect(action.payload).toBe(undefined);
    });
  });

  describe("remove", () => {
    it("should remove files", () => {
      store.dispatch(actions.createFolder([]));
      store.dispatch(actions.createFolder([]));

      const filesToDelete = ["New folder", "New folder (2)"];
      const action = actions.remove([], filesToDelete) as AnyAction;

      expect(action.type).toBe(FilesystemAction.REMOVE);
      expect(action.payload.files).toEqual({});
    });

    it("should fail whem path is wrong", () => {
      const path = ["path", "not", "exists"];
      const action = actions.remove(path, []) as AnyAction;

      expect(action.type).toBe(FilesystemAction.REMOVE_FAILED);
      expect(action.payload).toBe(undefined);
    });
  });

  describe("updateContent", () => {
    const file: File = { name: "txt", type: "text", content: "oldText" };

    it("should update content", () => {
      store.dispatch(actions.create([], file));

      const action = actions.updateContent([], "txt", "newText") as AnyAction;
      expect(action.type).toBe(FilesystemAction.UPDATE);
      expect(action.payload.files["txt"]).toEqual({
        ...file,
        content: "newText"
      });
    });

    it("should fail when path is wrong", () => {
      store.dispatch(actions.create([], file));

      const path = ["path", "not", "exists"];
      const action = actions.updateContent(path, "txt", "newText") as AnyAction;

      expect(action.type).toBe(FilesystemAction.UPDATE_FAILED);
      expect(action.payload).toBe(undefined);
    });

    it("should fail when file does not exists", () => {
      const action = actions.updateContent([], "txt", "newText") as AnyAction;

      expect(action.type).toBe(FilesystemAction.UPDATE_FAILED);
      expect(action.payload).toBe(undefined);
    });
  });

  describe("copy", () => {
    it("should copy files", () => {
      store.dispatch(actions.createFolder([]));
      store.dispatch(actions.createFolder([]));
      store.dispatch(actions.createFolder([]));

      const filesToCopy = ["New folder (2)"];
      const action = actions.copy([], filesToCopy);

      expect(action.type).toBe(FilesystemAction.COPY);
      expect(action.payload.copiedFiles).toEqual({
        "New folder (2)": getFolderData(2)
      });
    });
  });

  describe("cut", () => {
    it("should cut files", () => {
      store.dispatch(actions.createFolder([]));
      store.dispatch(actions.createFolder([]));

      const filesToCut = ["New folder"];
      const action = actions.cut([], filesToCut);

      expect(action.type).toBe(FilesystemAction.CUT);
      expect(action.payload).toEqual({
        files: { "New folder (2)": getFolderData(2) },
        copiedFiles: { "New folder": getFolderData(1) }
      });
    });
  });

  describe("paste", () => {
    it("should paste files", () => {
      store.dispatch(actions.createFolder([]));
      store.dispatch(actions.createFolder([]));
      store.dispatch(actions.createFolder([]));
      store.dispatch(actions.cut([], ["New folder", "New folder (2)"]));

      const action = actions.paste([]);
      expect(action.type).toBe(FilesystemAction.PASTE);
      expect(action.payload.files).toEqual({
        "New folder": getFolderData(1),
        "New folder (2)": getFolderData(2),
        "New folder (3)": getFolderData(3)
      });
    });
  });

  describe("rename", () => {
    beforeEach(() => {
      store.dispatch(actions.createFolder([]));
      store.dispatch(actions.createFolder([]));
    });

    describe("should fail", () => {
      it("new name is empty", () => {
        const action = actions.rename([], "New folder", "") as AnyAction;
        expect(action.type).toBe(FilesystemAction.RENAME_FAILED);
        expect(action.payload).toBe(undefined);
      });

      it("new name exists", () => {
        const action = actions.rename(
          [],
          "New folder",
          "New folder"
        ) as AnyAction;
        expect(action.type).toBe(FilesystemAction.RENAME_FAILED);
        expect(action.payload).toBe(undefined);
      });

      it("new name is the same", () => {
        const action = actions.rename(
          [],
          "New folder",
          "New folder (2)"
        ) as AnyAction;
        expect(action.type).toBe(FilesystemAction.RENAME_FAILED);
        expect(action.payload).toBe(undefined);
      });
    });

    it("should rename file", () => {
      const action = actions.rename(
        [],
        "New folder",
        "New folder (10)"
      ) as AnyAction;

      expect(action.type).toBe(FilesystemAction.RENAME);
      expect(action.payload.files).toEqual({
        "New folder (10)": getFolderData(10),
        "New folder (2)": getFolderData(2)
      });
    });
  });
});
