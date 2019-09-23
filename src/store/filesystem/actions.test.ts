import * as actions from "./actions";
import * as FilesystemAction from "./constants";
import store from "../";

type AnyAction = {
  type: any;
  payload?: any;
};

const getFolderData = (x: number) => ({
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

  describe("setFocusingRect", () => {
    it("should toggle isFocusingRect", () => {
      const actionTrue = actions.setFocusingRect(true);
      expect(actionTrue).toEqual({
        type: FilesystemAction.SET_FOCUSING_RECT,
        payload: { isFocusingRect: true }
      });

      const actionFalse = actions.setFocusingRect(false);
      expect(actionFalse).toEqual({
        type: FilesystemAction.SET_FOCUSING_RECT,
        payload: { isFocusingRect: false }
      });
    });
  });

  describe("create", () => {
    it("should add folders", () => {
      store.dispatch(actions.create([], "folder"));
      const action = actions.create([], "folder") as AnyAction;

      expect(action.type).toBe(FilesystemAction.CREATE);
      expect(action.payload.files).toEqual({
        "New folder": getFolderData(1),
        "New folder (2)": getFolderData(2)
      });
    });

    it("should fail", () => {
      const path = ["path", "no", "exists"];
      const action = actions.create(path, "folder") as AnyAction;

      expect(action.type).toBe(FilesystemAction.CREATE_FAILED);
      expect(action.payload).toBe(undefined);
    });

    it("should throw an error", () => {
      expect(() => actions.create([], "computer")).toThrowError();
      expect(() => actions.create([], "disk")).toThrowError();
      expect(() => actions.create([], "text")).toThrowError();
    });
  });

  describe("remove", () => {
    it("should remove files", () => {
      store.dispatch(actions.create([], "folder"));
      store.dispatch(actions.create([], "folder"));

      const filesToDelete = ["New folder", "New folder (2)"];
      const action = actions.remove([], filesToDelete) as AnyAction;

      expect(action.type).toBe(FilesystemAction.REMOVE);
      expect(action.payload.files).toEqual({});
    });

    it("should fail", () => {
      const path = ["path", "not", "exists"];
      const action = actions.remove(path, []) as AnyAction;

      expect(action.type).toBe(FilesystemAction.REMOVE_FAILED);
      expect(action.payload).toBe(undefined);
    });
  });

  describe("copy", () => {
    it("should copy files", () => {
      store.dispatch(actions.create([], "folder"));
      store.dispatch(actions.create([], "folder"));
      store.dispatch(actions.create([], "folder"));

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
      store.dispatch(actions.create([], "folder"));
      store.dispatch(actions.create([], "folder"));

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
      store.dispatch(actions.create([], "folder"));
      store.dispatch(actions.create([], "folder"));
      store.dispatch(actions.create([], "folder"));
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
      store.dispatch(actions.create([], "folder"));
      store.dispatch(actions.create([], "folder"));
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
