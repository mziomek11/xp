import uuid from "uuid";

import * as actions from "./actions";
import * as WindowAction from "./constants";
import store from "../";
import reducer, { WindowState } from "./reducer";
import { windowConfig } from "../../config";
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

const getWindowData = (id: string): Window => {
  return {
    id,
    application: applicationName,
    name: windowName,
    minimalized: windowConfig.INITIAL_MINIMALIZED
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
  allIds: [],
  focused: null
};

const stateWithOneWindow: WindowState = {
  byId: {
    [windowId]: getWindowData(windowId)
  },
  allIds: [windowId],
  focused: windowId
};

const stateWithChangedMinimalize: WindowState = getStateWithChangedProps(
  stateWithOneWindow,
  { minimalized: true }
);

const stateWithFocusedNull: WindowState = {
  ...stateWithOneWindow,
  focused: null
};

const stateWithTwoWindows: WindowState = {
  byId: {
    [windowId]: getWindowData(windowId),
    [secondWindowId]: getWindowData(secondWindowId)
  },
  allIds: [windowId, secondWindowId],
  focused: windowId
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

  describe("actions", () => {
    beforeEach(() => store.dispatch(actions.closeAll()));

    describe("closeAll", () => {
      it("should return proper type", () => {
        const action = actions.closeAll();

        expect(action.type).toBe(WindowAction.CLOSE_ALL);
      });
    });

    describe("removeFocus", () => {
      it("should return proper type", () => {
        const action = actions.removeFocus();

        expect(action.type).toBe(WindowAction.REMOVE_FOCUS);
      });
    });

    describe("open", () => {
      it("should open new window", () => {
        const action = actions.open(windowId, applicationName, windowName);

        expect(action.type).toBe(WindowAction.OPEN);
        expect(action.payload).toEqual(stateWithOneWindow);
      });
    });

    describe("close", () => {
      describe("window exists", () => {
        it("should return proper type and payload", () => {
          store.dispatch(actions.open(windowId, applicationName, windowName));
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

    describe("toggleMinimalize", () => {
      describe("window exists", () => {
        it("should toggle minimalized when was NOT minimalized", () => {
          store.dispatch(actions.open(windowId, applicationName, windowName));
          const action = actions.toggleMinimalize(windowId) as AnyAction;

          expect(action.type).toBe(WindowAction.TOGGLE_MINIMALIZE);
          expect(action.payload).toEqual({
            ...stateWithChangedMinimalize,
            focused: null
          });
        });

        it("should toggle minimalized when was minimalized", () => {
          store.dispatch(actions.open(windowId, applicationName, windowName));
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
          store.dispatch(actions.open(windowId, applicationName, windowName));
          store.dispatch(
            actions.open(secondWindowId, applicationName, windowName)
          );
          let action = actions.changePriority(windowId) as AnyAction;

          expect(action.type).toBe(WindowAction.CHANGE_PRIORITY);
          expect(action.payload).toEqual({
            allIds: [secondWindowId, windowId],
            focused: windowId
          });

          action = actions.changePriority(secondWindowId) as AnyAction;
          expect(action.payload).toEqual({
            allIds: [windowId, secondWindowId],
            focused: secondWindowId
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
