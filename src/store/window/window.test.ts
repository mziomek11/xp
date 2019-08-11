import uuid from "uuid";

import store from "../";
import reducer, { WindowState } from "./reducer";
import * as actions from "./actions";
import * as WindowAction from "./constants";
import { Window } from "./models";
import { deepCopy } from "../../utils/";

const windowId = uuid();
const secondWindowId = uuid();
const windowName: string = "WindowName";
const windowChangedLeft: number = 10;
const windowChangedTop: number = 20;

const getWindowData = (id: string): Window => {
  return {
    id,
    name: windowName,
    width: 100,
    height: 100,
    left: 100,
    top: 100,
    minimalized: false,
    fullscreened: false
  };
};

const getStateWithChangedProps = (
  oldState: WindowState,
  propsToOverride: {}
): WindowState => {
  let newState: WindowState = deepCopy(oldState);
  newState.byId[windowId] = { ...newState.byId[windowId], ...propsToOverride };

  return newState;
};

const emptyState: WindowState = {
  byId: {},
  allIds: []
};

const stateWithOneWindow: WindowState = {
  byId: {
    [windowId]: getWindowData(windowId)
  },
  allIds: [windowId]
};

const stateWithChangedFullscreen: WindowState = getStateWithChangedProps(
  stateWithOneWindow,
  { fullscreened: true }
);

const stateWithChangedMinimalize: WindowState = getStateWithChangedProps(
  stateWithOneWindow,
  { minimalized: true }
);

const stateWithChangedLeftAndTop: WindowState = getStateWithChangedProps(
  stateWithOneWindow,
  { left: windowChangedLeft, top: windowChangedTop }
);

const stateWithTwoWidnows: WindowState = {
  byId: {
    [windowId]: getWindowData(windowId),
    [secondWindowId]: getWindowData(secondWindowId)
  },
  allIds: [windowId, secondWindowId]
};

describe("Window redux", () => {
  describe("reducer", () => {
    describe("closeAllWindows", () => {
      it("should update state", () => {
        const updatedState = reducer(stateWithOneWindow, {
          type: WindowAction.CLOSE_ALL
        });

        expect(updatedState).toEqual(emptyState);
      });
    });

    describe("openWindow", () => {
      it("should update state", () => {
        const updatedState = reducer(emptyState, {
          type: WindowAction.OPEN,
          payload: stateWithOneWindow
        });
        expect(updatedState).toEqual(stateWithOneWindow);
      });
    });

    describe("moveWindow", () => {
      it("should update state", () => {
        const updatedState = reducer(stateWithOneWindow, {
          type: WindowAction.MOVE,
          payload: { byId: stateWithChangedLeftAndTop.byId }
        });

        expect(updatedState).toEqual(stateWithChangedLeftAndTop);
      });
    });

    describe("toggleFulscreen", () => {
      it("should update state", () => {
        const updatedState = reducer(stateWithOneWindow, {
          type: WindowAction.TOGGLE_FULLSCREEN,
          payload: { byId: stateWithChangedFullscreen.byId }
        });

        expect(updatedState).toEqual(stateWithChangedFullscreen);
      });
    });

    describe("toggleMinimalize", () => {
      it("should update state", () => {
        const updatedState = reducer(stateWithOneWindow, {
          type: WindowAction.TOGGLE_MINIMALIZE,
          payload: { byId: stateWithChangedMinimalize.byId }
        });

        expect(updatedState).toEqual(stateWithChangedMinimalize);
      });
    });

    describe("closeWindow", () => {
      it("should update state", () => {
        const updatedState = reducer(stateWithOneWindow, {
          type: WindowAction.CLOSE,
          payload: emptyState
        });

        expect(updatedState).toEqual(emptyState);
      });
    });

    describe("changeWindowPriority", () => {
      it("should update state", () => {
        const updatedState = reducer(stateWithTwoWidnows, {
          type: WindowAction.CHANGE_PRIORITY,
          payload: { allIds: [secondWindowId, windowId] }
        });

        expect(updatedState.byId).toEqual(stateWithTwoWidnows.byId);
        expect(updatedState.allIds).toEqual([secondWindowId, windowId]);
      });
    });
  });

  describe("actions", () => {
    beforeEach(() => store.dispatch(actions.closeAll()));

    describe("closeAllWidnows", () => {
      it("should return proper type", () => {
        const action = actions.closeAll();

        expect(action.type).toBe(WindowAction.CLOSE_ALL);
      });
    });

    describe("openWindow", () => {
      it("should return proper type and payload", () => {
        const action = actions.open(windowId, windowName, false);

        expect(action.type).toBe(WindowAction.OPEN);
        expect(action.payload).toEqual(stateWithOneWindow);
      });

      it("should return proper payload when fullscreen is false", () => {
        const action = actions.open(windowId, windowName, true);

        expect(action.payload).toEqual(stateWithChangedFullscreen);
      });
    });

    describe("closeWindow", () => {
      it("should return proper type and payload", () => {
        store.dispatch(actions.open(windowId, windowName, false));
        const action = actions.close(windowId);

        expect(action.type).toBe(WindowAction.CLOSE);
        expect(action.payload).toEqual(emptyState);
      });
    });

    describe("moveWindow", () => {
      it("should return proper type and payload", () => {
        store.dispatch(actions.open(windowId, windowName, false));
        const action = actions.move(
          windowId,
          windowChangedLeft,
          windowChangedTop
        );

        expect(action.type).toBe(WindowAction.MOVE);
        expect(action.payload).toEqual({
          byId: stateWithChangedLeftAndTop.byId
        });
      });
    });

    describe("toggleFullscreen", () => {
      it("should return proper type and payload when was fullscreened", () => {
        store.dispatch(actions.open(windowId, windowName, true));
        const action = actions.toggleFullscreen(windowId);

        expect(action.type).toBe(WindowAction.TOGGLE_FULLSCREEN);
        expect(action.payload).toEqual({ byId: stateWithOneWindow.byId });
      });

      it("should return proper type and payload when was NOT fullscreened", () => {
        store.dispatch(actions.open(windowId, windowName, false));
        const action = actions.toggleFullscreen(windowId);

        expect(action.type).toBe(WindowAction.TOGGLE_FULLSCREEN);
        expect(action.payload).toEqual({
          byId: stateWithChangedFullscreen.byId
        });
      });
    });

    describe("toggleMinimalize", () => {
      it("should return proper type and payload when was NOT minimalized", () => {
        store.dispatch(actions.open(windowId, windowName, false));
        const action = actions.toggleMinimalize(windowId);

        expect(action.type).toBe(WindowAction.TOGGLE_MINIMALIZE);
        expect(action.payload).toEqual({
          byId: stateWithChangedMinimalize.byId
        });
      });

      it("should return proper type and payload when was minimalized", () => {
        store.dispatch(actions.open(windowId, windowName, false));
        store.dispatch(actions.toggleMinimalize(windowId));
        const action = actions.toggleMinimalize(windowId);

        expect(action.type).toBe(WindowAction.TOGGLE_MINIMALIZE);
        expect(action.payload).toEqual({
          byId: stateWithOneWindow.byId
        });
      });
    });

    describe("changeWindowPriority", () => {
      it("should return proper action and payload", () => {
        store.dispatch(actions.open(windowId, windowName, false));
        store.dispatch(actions.open(secondWindowId, windowName, false));
        let action = actions.changePriority(secondWindowId);

        expect(action.type).toBe(WindowAction.CHANGE_PRIORITY);
        expect(action.payload).toEqual({
          allIds: [secondWindowId, windowId]
        });

        action = actions.changePriority(windowId);
        expect(action.payload).toEqual({
          allIds: [windowId, secondWindowId]
        });
      });
    });
  });
});
