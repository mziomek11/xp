import uuid from "uuid";

import * as actions from "./actions";
import * as WindowAction from "./constants";
import store from "../";
import { windowConfig } from "../../config";
import reducer, { WindowState } from "./reducer";
import { Window } from "./models";
import { deepCopy } from "../../utils/";

type AnyAction = {
  type: any;
  payload: any;
};

const windowId = uuid();
const secondWindowId = uuid();
const applicationName: string = "Chrome";
const windowName: string = "WindowName";
const windowChangedLeft: number = 10;
const windowChangedTop: number = 20;
const windowChangedWidth: number = 300;
const windowChangedHeight: number = 250;

const getWindowData = (id: string): Window => {
  return {
    id,
    application: applicationName,
    name: windowName,
    width: windowConfig.INITIAL_WIDTH,
    height: windowConfig.INITIAL_HEIGHT,
    left: windowConfig.INITIAL_LEFT,
    top: windowConfig.INITIAL_TOP,
    minimalized: windowConfig.INITIAL_MINIMALIZED,
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

const stateWithChangedWidthAndHeight: WindowState = getStateWithChangedProps(
  stateWithOneWindow,
  { width: windowChangedWidth, height: windowChangedHeight }
);

const stateWithMinimalWidthAndHeight: WindowState = getStateWithChangedProps(
  stateWithOneWindow,
  { width: windowConfig.MINIMAL_WIDTH, height: windowConfig.MINIMAL_HEIGHT }
);

const stateWithChangedLeftTopWidthHeight: WindowState = getStateWithChangedProps(
  stateWithOneWindow,
  {
    width: windowChangedWidth,
    height: windowChangedHeight,
    left: windowChangedLeft,
    top: windowChangedTop
  }
);

const stateWithTwoWindows: WindowState = {
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

    describe("changePropFailed", () => {
      it("should NOT update state", () => {
        const updatedState = reducer(stateWithOneWindow, {
          type: WindowAction.CHANGE_PROP_FAILED
        });

        expect(updatedState).toEqual(stateWithOneWindow);
      });
    });

    describe("closeFailed", () => {
      it("should NOT update state", () => {
        const updatedState = reducer(stateWithOneWindow, {
          type: WindowAction.CLOSE_FAILED
        });

        expect(updatedState).toEqual(stateWithOneWindow);
      });
    });

    describe("changePriorityFailed", () => {
      it("should NOT update state", () => {
        const updatedState = reducer(stateWithOneWindow, {
          type: WindowAction.CHANGE_PRIORITY_FAILED
        });

        expect(updatedState).toEqual(stateWithOneWindow);
      });
    });

    describe("open", () => {
      it("should update state", () => {
        const updatedState = reducer(emptyState, {
          type: WindowAction.OPEN,
          payload: stateWithOneWindow
        });
        expect(updatedState).toEqual(stateWithOneWindow);
      });
    });

    describe("move", () => {
      it("should update state", () => {
        const updatedState = reducer(stateWithOneWindow, {
          type: WindowAction.MOVE,
          payload: { byId: stateWithChangedLeftAndTop.byId }
        });

        expect(updatedState).toEqual(stateWithChangedLeftAndTop);
      });
    });

    describe("resize", () => {
      it("should update state", () => {
        const updatedState = reducer(stateWithOneWindow, {
          type: WindowAction.RESIZE,
          payload: { byId: stateWithChangedWidthAndHeight.byId }
        });

        expect(updatedState).toEqual(stateWithChangedWidthAndHeight);
      });
    });

    describe("moveAndResize", () => {
      it("should update state", () => {
        const updatedState = reducer(stateWithOneWindow, {
          type: WindowAction.MOVE_AND_RESIZE,
          payload: { byId: stateWithChangedLeftTopWidthHeight.byId }
        });

        expect(updatedState).toEqual(stateWithChangedLeftTopWidthHeight);
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

    describe("changePriority", () => {
      it("should update state", () => {
        const updatedState = reducer(stateWithTwoWindows, {
          type: WindowAction.CHANGE_PRIORITY,
          payload: { allIds: [secondWindowId, windowId] }
        });

        expect(updatedState.byId).toEqual(stateWithTwoWindows.byId);
        expect(updatedState.allIds).toEqual([secondWindowId, windowId]);
      });
    });
  });

  describe("actions", () => {
    beforeEach(() => store.dispatch(actions.closeAll()));

    describe("closeAll", () => {
      it("should return proper type", () => {
        const action = actions.closeAll();

        expect(action.type).toBe(WindowAction.CLOSE_ALL);
      });
    });

    describe("open", () => {
      it("should open new window", () => {
        const action = actions.open(
          windowId,
          applicationName,
          windowName,
          false
        );

        expect(action.type).toBe(WindowAction.OPEN);
        expect(action.payload).toEqual(stateWithOneWindow);
      });

      it("should open new window fullscreen is true", () => {
        const action = actions.open(
          windowId,
          applicationName,
          windowName,
          true
        );

        expect(action.payload).toEqual(stateWithChangedFullscreen);
      });
    });

    describe("close", () => {
      describe("window exists", () => {
        it("should return proper type and payload", () => {
          store.dispatch(
            actions.open(windowId, applicationName, windowName, false)
          );
          const action = actions.close(windowId) as AnyAction;

          expect(action.type).toBe(WindowAction.CLOSE);
          expect(action.payload).toEqual(emptyState);
        });
      });

      describe("window does not exists", () => {
        it("should return error action", () => {
          const action = actions.close("id-not-exists") as AnyAction;

          expect(action.type).toBe(WindowAction.CLOSE_FAILED);
          expect(action.payload).toBe(undefined);
        });
      });
    });

    describe("move", () => {
      describe("window exists", () => {
        it("should change window top and left", () => {
          store.dispatch(
            actions.open(windowId, applicationName, windowName, false)
          );
          const action = actions.move(
            windowId,
            windowChangedLeft,
            windowChangedTop
          ) as AnyAction;

          expect(action.type).toBe(WindowAction.MOVE);
          expect(action.payload).toEqual({
            byId: stateWithChangedLeftAndTop.byId
          });
        });
      });

      describe("window does NOT exists", () => {
        it("should return error action", () => {
          const action = actions.move(
            "id-that-not-exists",
            windowChangedLeft,
            windowChangedTop
          ) as AnyAction;

          expect(action.type).toBe(WindowAction.CHANGE_PROP_FAILED);
          expect(action.payload).toBe(undefined);
        });
      });
    });

    describe("resize", () => {
      describe("window exists", () => {
        it("should change window width and height", () => {
          store.dispatch(
            actions.open(windowId, applicationName, windowName, false)
          );
          const action = actions.resize(
            windowId,
            windowChangedWidth,
            windowChangedHeight
          ) as AnyAction;

          expect(action.type).toBe(WindowAction.RESIZE);
          expect(action.payload).toEqual({
            byId: stateWithChangedWidthAndHeight.byId
          });
        });

        it("should change window width and height to minimal", () => {
          store.dispatch(
            actions.open(windowId, applicationName, windowName, false)
          );
          const action = actions.resize(windowId, 10, 10) as AnyAction;

          expect(action.type).toBe(WindowAction.RESIZE);
          expect(action.payload).toEqual({
            byId: stateWithMinimalWidthAndHeight.byId
          });
        });
      });

      describe("window does NOT exists", () => {
        it("should return error action", () => {
          const action = actions.resize(
            "id-that-not-exists",
            windowChangedWidth,
            windowChangedHeight
          ) as AnyAction;

          expect(action.type).toBe(WindowAction.CHANGE_PROP_FAILED);
          expect(action.payload).toBe(undefined);
        });
      });
    });

    describe("moveAndResize", () => {
      describe("window exists", () => {
        it("should change window width and height", () => {
          store.dispatch(
            actions.open(windowId, applicationName, windowName, false)
          );
          const action = actions.moveAndResize(
            windowId,
            windowChangedLeft,
            windowChangedTop,
            windowChangedWidth,
            windowChangedHeight
          ) as AnyAction;

          expect(action.type).toBe(WindowAction.MOVE_AND_RESIZE);
          expect(action.payload).toEqual({
            byId: stateWithChangedLeftTopWidthHeight.byId
          });
        });

        it("should change window windth and height to minimal", () => {
          store.dispatch(
            actions.open(windowId, applicationName, windowName, false)
          );
          const action = actions.moveAndResize(
            windowId,
            stateWithOneWindow.byId[windowId].left,
            stateWithOneWindow.byId[windowId].top,
            10,
            10
          ) as AnyAction;

          expect(action.type).toBe(WindowAction.MOVE_AND_RESIZE);
          expect(action.payload).toEqual({
            byId: stateWithMinimalWidthAndHeight.byId
          });
        });
      });

      describe("window does NOT exists", () => {
        it("should return error action", () => {
          const action = actions.moveAndResize(
            "id-that-not-exists",
            windowChangedLeft,
            windowChangedTop,
            windowChangedWidth,
            windowChangedHeight
          ) as AnyAction;

          expect(action.type).toBe(WindowAction.CHANGE_PROP_FAILED);
          expect(action.payload).toBe(undefined);
        });
      });
    });

    describe("toggleFullscreen", () => {
      describe("window exists", () => {
        it("should toggle fullscreen when was fullscreened", () => {
          store.dispatch(
            actions.open(windowId, applicationName, windowName, true)
          );
          const action = actions.toggleFullscreen(windowId) as AnyAction;

          expect(action.type).toBe(WindowAction.TOGGLE_FULLSCREEN);
          expect(action.payload).toEqual({ byId: stateWithOneWindow.byId });
        });

        it("should toggle fullscreen when was NOT fullscreened", () => {
          store.dispatch(
            actions.open(windowId, applicationName, windowName, false)
          );
          const action = actions.toggleFullscreen(windowId) as AnyAction;

          expect(action.type).toBe(WindowAction.TOGGLE_FULLSCREEN);
          expect(action.payload).toEqual({
            byId: stateWithChangedFullscreen.byId
          });
        });
      });

      describe("window does NOT exists", () => {
        it("should return error action", () => {
          const action = actions.toggleFullscreen("id-not-exists") as AnyAction;

          expect(action.type).toBe(WindowAction.CHANGE_PROP_FAILED);
          expect(action.payload).toBe(undefined);
        });
      });
    });

    describe("toggleMinimalize", () => {
      describe("window exists", () => {
        it("should toggle minimalized when was NOT minimalized", () => {
          store.dispatch(
            actions.open(windowId, applicationName, windowName, false)
          );
          const action = actions.toggleMinimalize(windowId) as AnyAction;

          expect(action.type).toBe(WindowAction.TOGGLE_MINIMALIZE);
          expect(action.payload).toEqual(stateWithChangedMinimalize);
        });

        it("should toggle minimalized when was minimalized", () => {
          store.dispatch(
            actions.open(windowId, applicationName, windowName, false)
          );
          store.dispatch(actions.toggleMinimalize(windowId));
          const action = actions.toggleMinimalize(windowId) as AnyAction;

          expect(action.type).toBe(WindowAction.TOGGLE_MINIMALIZE);
          expect(action.payload).toEqual(stateWithOneWindow);
        });
      });

      describe("window does NOt exists", () => {
        it("shoud return error action", () => {
          const action = actions.toggleMinimalize("id-not-exists") as AnyAction;

          expect(action.type).toBe(WindowAction.CHANGE_PROP_FAILED);
          expect(action.payload).toBe(undefined);
        });
      });
    });

    describe("changePriority", () => {
      describe("window exists", () => {
        it("should change priority of window", () => {
          store.dispatch(
            actions.open(windowId, applicationName, windowName, false)
          );
          store.dispatch(
            actions.open(secondWindowId, applicationName, windowName, false)
          );
          let action = actions.changePriority(windowId) as AnyAction;

          expect(action.type).toBe(WindowAction.CHANGE_PRIORITY);
          expect(action.payload).toEqual({
            allIds: [secondWindowId, windowId]
          });

          action = actions.changePriority(secondWindowId) as AnyAction;
          expect(action.payload).toEqual({
            allIds: [windowId, secondWindowId]
          });
        });
      });

      describe("window does NOT exists", () => {
        it("should return error action", () => {
          const action = actions.changePriority("id-not-exists") as AnyAction;

          expect(action.type).toBe(WindowAction.CHANGE_PRIORITY_FAILED);
          expect(action.payload).toBe(undefined);
        });
      });
    });
  });
});
