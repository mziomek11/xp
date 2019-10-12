import * as WindowAction from "./constants";
import reducer from "./reducer";
import {
  emptyState,
  stateWithOneWindow,
  stateWithChangedMinimalize,
  stateWithTwoWindows,
  stateWithFocusedNull,
  windowId,
  secondWindowId
} from "./testingData";

describe("Window reducer", () => {
  describe("closeAllWindows", () => {
    it("should update state", () => {
      const updatedState = reducer(stateWithOneWindow, {
        type: WindowAction.CLOSE_ALL
      });

      expect(updatedState).toEqual(emptyState);
    });
  });

  describe("open", () => {
    it("should update state", () => {
      const updatedState = reducer(emptyState, {
        type: WindowAction.OPEN,
        payload: {
          allIds: stateWithOneWindow.allIds,
          byId: stateWithOneWindow.byId,
          focused: stateWithOneWindow.focused as string
        }
      });
      expect(updatedState).toEqual(stateWithOneWindow);
    });
  });

  describe("replcae", () => {
    it("should update state", () => {
      const updatedState = reducer(emptyState, {
        type: WindowAction.REPLACE,
        payload: {
          allIds: stateWithOneWindow.allIds,
          byId: stateWithOneWindow.byId,
          focused: stateWithOneWindow.focused as string
        }
      });
      expect(updatedState).toEqual(stateWithOneWindow);
    });
  });

  describe("toggleMinimalize", () => {
    it("should update state", () => {
      const updatedState = reducer(stateWithOneWindow, {
        type: WindowAction.TOGGLE_MINIMALIZE,
        payload: stateWithChangedMinimalize
      });

      expect(updatedState).toEqual(stateWithChangedMinimalize);
    });
  });

  describe("close", () => {
    it("should update state", () => {
      const updatedState = reducer(stateWithOneWindow, {
        type: WindowAction.CLOSE,
        payload: emptyState
      });

      expect(updatedState).toEqual(emptyState);
    });
  });

  describe("rename", () => {
    it("should update state", () => {
      const updatedState = reducer(stateWithOneWindow, {
        type: WindowAction.RENAME,
        payload: emptyState
      });

      expect(updatedState.byId).toEqual(emptyState.byId);
    });
  });

  describe("changePriority", () => {
    it("should update state", () => {
      const updatedState = reducer(stateWithTwoWindows, {
        type: WindowAction.CHANGE_PRIORITY,
        payload: {
          allIds: [secondWindowId, windowId],
          focused: secondWindowId
        }
      });

      expect(updatedState.byId).toEqual(stateWithTwoWindows.byId);
      expect(updatedState.allIds).toEqual([secondWindowId, windowId]);
    });
  });

  describe("removeFocus", () => {
    it("should update state", () => {
      const updatedState = reducer(stateWithOneWindow, {
        type: WindowAction.REMOVE_FOCUS
      });

      expect(updatedState).toEqual(stateWithFocusedNull);
    });
  });
});
