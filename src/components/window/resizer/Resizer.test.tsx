import React from "react";
import { shallow } from "enzyme";

import { windowConfig } from "../../../config";
import { Window } from "../../../store/window/models";
import { WindowResizer, initState } from "./Resizer";
import { findByTestAtrr } from "../../../../testingUtils";
import { toolbarConfig } from "../../../config";

type ResizerData = {
  resizesWidth?: boolean;
  isLeft?: boolean;
  isBottom?: boolean;
};

type StatePropsToChange = {
  endX?: number;
  edgeDistanceX?: number;
  edgeDistanceY?: number;
};

type MoveEvData = {
  clientX: number;
  clientY: number;
};

const { MINIMAL_SIZE, INITIAL_LEFT, INITIAL_TOP } = windowConfig;
const windowId: string = "this-is-window-id";

const windowData: Window = {
  id: windowId,
  fullscreened: false,
  minimalized: false,
  application: "ApplicationName",
  name: "WindowName",
  width: MINIMAL_SIZE,
  height: MINIMAL_SIZE,
  left: INITIAL_LEFT,
  top: INITIAL_TOP
};

const compResizerData = {
  resizesWidth: true,
  isLeft: true,
  isBottom: true
};

const compProps = {
  id: windowId,
  resize: jest.fn(),
  moveAndResize: jest.fn(),
  windowData: windowData,
  ...compResizerData
};

const getWindowProps = (resizerData: ResizerData) => ({
  ...compProps,
  ...resizerData
});

const checkClassName = (wrapper: any, className: string) => {
  expect(findByTestAtrr(wrapper, "resizer").prop("className")).toContain(
    className
  );
};

describe("WindowResizer Component", () => {
  describe("render", () => {
    const comp = <WindowResizer {...compProps} />;
    const wrapper = shallow<WindowResizer>(comp);

    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "resizer").length).toBe(1);
    });

    it("should NOT render when window is fullscreen", () => {
      const fullscreenProps = {
        ...compProps,
        windowData: { ...compProps.windowData, fullscreened: true }
      };
      const fullScreenWrapper = shallow(<WindowResizer {...fullscreenProps} />);

      expect(findByTestAtrr(fullScreenWrapper, "resizer").length).toBe(0);
    });

    it("should contain window__resizer className", () => {
      checkClassName(wrapper, "window__resizer");
    });
  });

  describe("direction", () => {
    let mockResizeFn: jest.Mock;
    let wrapper: any;
    let instance: WindowResizer;
    let mouseDownData: MoveEvData;
    let expectedState: typeof initState;

    const setTestData = (
      resizerData: ResizerData,
      fnName: "resize" | "moveAndResize",
      evData: MoveEvData,
      stateToChange: StatePropsToChange
    ) => {
      mockResizeFn = jest.fn();
      const propsWithoutFn = getWindowProps(resizerData);
      const props = { ...propsWithoutFn, [fnName]: mockResizeFn };

      wrapper = shallow<WindowResizer>(<WindowResizer {...props} />);
      instance = wrapper.instance();
      mouseDownData = evData;
      expectedState = { ...initState, ...stateToChange };
    };

    const resizeToMoveData = (resizeData: ResizerData): MoveEvData => {
      const { isBottom, isLeft, resizesWidth } = resizeData;
      const y = INITIAL_TOP + (isBottom ? MINIMAL_SIZE - 2 : MINIMAL_SIZE / 2);
      const x =
        INITIAL_LEFT +
        (resizesWidth ? (isLeft ? 2 : MINIMAL_SIZE - 2) : MINIMAL_SIZE / 2);

      return { clientX: x, clientY: y };
    };

    const testRender = (classModifier: string) => {
      describe("render", () => {
        it(`should contain window__resizer--${classModifier} className`, () => {
          checkClassName(wrapper, `window__resizer--${classModifier}`);
        });
      });
    };

    const testOnMouseDown = () => {
      describe("onMouseDown", () => {
        it("should update state correctly", () => {
          const resizer = findByTestAtrr(wrapper, "resizer");
          resizer.simulate("mousedown", mouseDownData);

          expect(instance.state).toEqual(expectedState);
        });
      });
    };

    const testMockResizeFn = (calls: number, args: any) => {
      expect(mockResizeFn.mock.calls.length).toBe(calls);
      expect(mockResizeFn.mock.calls[calls - 1]).toEqual(args);
    };

    describe("LeftResizer", () => {
      beforeAll(() => {
        const resizerData: ResizerData = { isBottom: false };
        const evData = resizeToMoveData(resizerData);
        const stateChanges = {
          endX: windowData.left + windowData.width,
          edgeDistanceX: evData.clientX - windowData.left
        };

        setTestData(resizerData, "moveAndResize", evData, stateChanges);
      });

      testRender("left");
      testOnMouseDown();

      describe("onMouseMove", () => {
        it("should be called once and with proper args", () => {
          const moveData = {
            clientX: mouseDownData.clientX - 50,
            clientY: mouseDownData.clientY - 50
          };

          instance.handleMouseMove(moveData as MouseEvent);
          const expectedArgs: [number, number, number, number] = [
            moveData.clientX - expectedState.edgeDistanceX,
            windowData.top,
            expectedState.endX - moveData.clientX + expectedState.edgeDistanceX,
            windowData.height
          ];

          testMockResizeFn(1, expectedArgs);
        });

        it("should be called with minimal width and left", () => {
          const moveData = {
            clientX: expectedState.endX,
            clientY: mouseDownData.clientY
          };
          instance.handleMouseMove(moveData as MouseEvent);
          const expectedArgs: [number, number, number, number] = [
            expectedState.endX - windowConfig.MINIMAL_SIZE,
            windowData.top,
            expectedState.endX - moveData.clientX + expectedState.edgeDistanceX,
            windowData.height
          ];

          testMockResizeFn(2, expectedArgs);
        });
      });
    });

    describe("RightResizer", () => {
      beforeAll(() => {
        const resizerData: ResizerData = { isBottom: false, isLeft: false };
        const evData = resizeToMoveData(resizerData);
        const stateChanges = {
          edgeDistanceX: evData.clientX - windowData.left - windowData.width
        };

        setTestData(resizerData, "resize", evData, stateChanges);
      });

      testRender("right");
      testOnMouseDown();

      describe("onMouseMove", () => {
        it("should be called once and with proper args", () => {
          const moveData = {
            clientX: mouseDownData.clientX + 200,
            clientY: mouseDownData.clientX - 100
          };
          instance.handleMouseMove(moveData as MouseEvent);
          const expectedArgs: [number, number] = [
            moveData.clientX - windowData.left - expectedState.edgeDistanceX,
            windowData.height
          ];

          testMockResizeFn(1, expectedArgs);
        });
      });
    });

    describe("BottomResizer", () => {
      beforeAll(() => {
        const resizerData: ResizerData = { resizesWidth: false, isLeft: false };
        const evData = resizeToMoveData(resizerData);
        const stateChanges = {
          edgeDistanceY: evData.clientY - windowData.top - windowData.height
        };

        setTestData(resizerData, "resize", evData, stateChanges);
      });

      testRender("bottom");
      testOnMouseDown();

      describe("onMouseMove", () => {
        it("should be called once and with proper args", () => {
          const moveData = {
            clientX: mouseDownData.clientX - 300,
            clientY: mouseDownData.clientY + 100
          };
          instance.handleMouseMove(moveData as MouseEvent);
          const expectedArgs: [number, number] = [
            windowData.width,
            moveData.clientY - windowData.top - expectedState.edgeDistanceY
          ];

          testMockResizeFn(1, expectedArgs);
        });

        it("should be called with proper args when clientY out of window", () => {
          const moveData = {
            clientX: mouseDownData.clientX - 300,
            clientY: mouseDownData.clientY + 5000
          };
          instance.handleMouseMove(moveData as MouseEvent);
          const expectedArgs: [number, number] = [
            windowData.width,
            window.innerHeight - toolbarConfig.HEIGHT
          ];

          testMockResizeFn(2, expectedArgs);
        });
      });
    });

    describe("BottomLeftResizer", () => {
      beforeAll(() => {
        const evData = resizeToMoveData({});
        const stateChanges = {
          endX: windowData.left + windowData.width,
          edgeDistanceX: evData.clientX - windowData.left,
          edgeDistanceY: evData.clientY - windowData.top - windowData.height
        };

        setTestData({}, "moveAndResize", evData, stateChanges);
      });

      testRender("bottom-left");
      testOnMouseDown();

      describe("onMouseMove", () => {
        it("should be called once and with proper args", () => {
          const moveData = {
            clientX: mouseDownData.clientX - 100,
            clientY: mouseDownData.clientX - 100
          };
          instance.handleMouseMove(moveData as MouseEvent);
          const expectedArgs: [number, number, number, number] = [
            moveData.clientX - expectedState.edgeDistanceX,
            windowData.top,
            expectedState.endX - moveData.clientX + expectedState.edgeDistanceX,
            moveData.clientY - windowData.top - expectedState.edgeDistanceY
          ];

          testMockResizeFn(1, expectedArgs);
        });
      });
    });

    describe("BottomRightResizer", () => {
      beforeAll(() => {
        const resizerData: ResizerData = { isLeft: false };
        const evData = resizeToMoveData(resizerData);
        const stateChanges = {
          edgeDistanceX: evData.clientX - windowData.left - windowData.width,
          edgeDistanceY: evData.clientY - windowData.top - windowData.height
        };

        setTestData(resizerData, "resize", evData, stateChanges);
      });

      testRender("bottom-right");
      testOnMouseDown();

      describe("onMouseMove", () => {
        it("should be called once and with proper args", () => {
          const moveData = {
            clientX: mouseDownData.clientX + 200,
            clientY: mouseDownData.clientY + 200
          };
          instance.handleMouseMove(moveData as MouseEvent);
          const expectedArgs: [number, number] = [
            moveData.clientX - windowData.left - expectedState.edgeDistanceX,
            moveData.clientY - windowData.top - expectedState.edgeDistanceY
          ];

          testMockResizeFn(1, expectedArgs);
        });
      });
    });
  });
});
