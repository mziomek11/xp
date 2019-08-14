import React from "react";
import { shallow } from "enzyme";

import windowConfig from "../../../store/window/config";
import { Window } from "../../../store/window/models";
import { WindowResizer } from "./";
import { findByTestAtrr } from "../../../utils/testing";

const { MINIMAL_SIZE, INITIAL_LEFT, INITIAL_TOP } = windowConfig;
const windowId: string = "this-is-window-id";

const windowData: Window = {
  id: windowId,
  fullscreened: false,
  minimalized: false,
  name: "WindowName",
  width: MINIMAL_SIZE,
  height: MINIMAL_SIZE,
  left: INITIAL_LEFT,
  top: INITIAL_TOP
};

const compProps = {
  id: windowId,
  resizesWidth: true,
  isLeft: true,
  isBottom: true,
  resize: jest.fn(),
  moveAndResize: jest.fn(),
  windowData: windowData
};

const getWindowProps = (resizerData: {
  resizesWidth?: boolean;
  isLeft?: boolean;
  isBottom?: boolean;
}) => ({ ...compProps, ...resizerData });

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

  describe("LeftResizer", () => {
    const mockMoveAndResizeFn = jest.fn();
    const propsWithoutFn = getWindowProps({ isBottom: false });
    const props = {
      ...propsWithoutFn,
      moveAndResize: mockMoveAndResizeFn
    };
    const wrapper = shallow<WindowResizer>(<WindowResizer {...props} />);
    const instance = wrapper.instance();
    const mouseDownData = {
      clientX: INITIAL_LEFT + 2,
      clientY: INITIAL_TOP + MINIMAL_SIZE / 2
    };
    const expectedState = {
      endX: windowData.left + windowData.width,
      edgeDistanceX: mouseDownData.clientX - windowData.left,
      edgeDistanceY: 0
    };

    describe("render", () => {
      it("should contain window__resizer--left className", () => {
        checkClassName(wrapper, "window__resizer--left");
      });
    });

    describe("onMouseDown", () => {
      it("should update state correctly", () => {
        findByTestAtrr(wrapper, "resizer").simulate("mousedown", mouseDownData);
        expect(instance.state).toEqual(expectedState);
      });
    });

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

        expect(mockMoveAndResizeFn.mock.calls.length).toBe(1);
        expect(mockMoveAndResizeFn.mock.calls[0]).toEqual(expectedArgs);
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

        expect(mockMoveAndResizeFn.mock.calls.length).toBe(2);
        expect(mockMoveAndResizeFn.mock.calls[1]).toEqual(expectedArgs);
      });
    });
  });

  describe("RightResizer", () => {
    const mockResizeFn = jest.fn();
    const propsWithoutFn = getWindowProps({ isBottom: false, isLeft: false });
    const props = {
      ...propsWithoutFn,
      resize: mockResizeFn
    };
    const wrapper = shallow<WindowResizer>(<WindowResizer {...props} />);
    const instance = wrapper.instance();
    const mouseDownData = {
      clientX: INITIAL_LEFT + MINIMAL_SIZE - 2,
      clientY: INITIAL_TOP + MINIMAL_SIZE / 2
    };
    const expectedState = {
      endX: 0,
      edgeDistanceX: mouseDownData.clientX - windowData.left - windowData.width,
      edgeDistanceY: 0
    };

    describe("render", () => {
      it("should contain window__resizer--right className", () => {
        checkClassName(wrapper, "window__resizer--right");
      });
    });

    describe("onMouseDown", () => {
      it("should update state correctly", () => {
        findByTestAtrr(wrapper, "resizer").simulate("mousedown", mouseDownData);
        expect(instance.state).toEqual(expectedState);
      });
    });

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

        expect(mockResizeFn.mock.calls.length).toBe(1);
        expect(mockResizeFn.mock.calls[0]).toEqual(expectedArgs);
      });
    });
  });

  describe("BottomResizer", () => {
    const mockResizeFn = jest.fn();
    const propsWithoutFn = getWindowProps({
      resizesWidth: false,
      isLeft: false
    });
    const props = {
      ...propsWithoutFn,
      resize: mockResizeFn
    };
    const wrapper = shallow<WindowResizer>(<WindowResizer {...props} />);
    const instance = wrapper.instance();
    const mouseDownData = {
      clientX: INITIAL_LEFT + MINIMAL_SIZE / 2,
      clientY: INITIAL_TOP + MINIMAL_SIZE - 2
    };
    const expectedState = {
      endX: 0,
      edgeDistanceX: 0,
      edgeDistanceY: mouseDownData.clientY - windowData.top - windowData.height
    };

    describe("render", () => {
      it("should contain window__resizer--bottom className", () => {
        checkClassName(wrapper, "window__resizer--bottom");
      });
    });

    describe("onMouseDown", () => {
      it("should update state correctly", () => {
        findByTestAtrr(wrapper, "resizer").simulate("mousedown", mouseDownData);
        expect(instance.state).toEqual(expectedState);
      });
    });

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

        expect(mockResizeFn.mock.calls.length).toBe(1);
        expect(mockResizeFn.mock.calls[0]).toEqual(expectedArgs);
      });

      it("should be called with proper args when clientY out of window", () => {
        const moveData = {
          clientX: mouseDownData.clientX - 300,
          clientY: mouseDownData.clientY + 5000
        };
        instance.handleMouseMove(moveData as MouseEvent);
        const expectedArgs: [number, number] = [
          windowData.width,
          window.innerHeight
        ];

        expect(mockResizeFn.mock.calls.length).toBe(2);
        expect(mockResizeFn.mock.calls[1]).toEqual(expectedArgs);
      });
    });
  });

  describe("BottomLeftResizer", () => {
    const mockMoveAndResizeFn = jest.fn();
    const propsWithoutFn = getWindowProps({});
    const props = {
      ...propsWithoutFn,
      moveAndResize: mockMoveAndResizeFn
    };
    const wrapper = shallow<WindowResizer>(<WindowResizer {...props} />);
    const instance = wrapper.instance();
    const mouseDownData = {
      clientX: INITIAL_LEFT + 2,
      clientY: INITIAL_TOP + MINIMAL_SIZE - 2
    };
    const expectedState = {
      endX: windowData.left + windowData.width,
      edgeDistanceX: mouseDownData.clientX - windowData.left,
      edgeDistanceY: mouseDownData.clientY - windowData.top - windowData.height
    };

    describe("render", () => {
      it("should contain window__resizer--bottom-left className", () => {
        checkClassName(wrapper, "window__resizer--bottom-left");
      });
    });

    describe("onMouseDown", () => {
      it("should update state correctly", () => {
        findByTestAtrr(wrapper, "resizer").simulate("mousedown", mouseDownData);
        expect(instance.state).toEqual(expectedState);
      });
    });

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

        expect(mockMoveAndResizeFn.mock.calls.length).toBe(1);
        expect(mockMoveAndResizeFn.mock.calls[0]).toEqual(expectedArgs);
      });
    });
  });

  describe("BottomRightResizer", () => {
    const mockResizeFn = jest.fn();
    const propsWithoutFn = getWindowProps({ isLeft: false });
    const props = {
      ...propsWithoutFn,
      resize: mockResizeFn
    };
    const wrapper = shallow<WindowResizer>(<WindowResizer {...props} />);
    const instance = wrapper.instance();
    const mouseDownData = {
      clientX: INITIAL_LEFT + MINIMAL_SIZE - 2,
      clientY: INITIAL_TOP + MINIMAL_SIZE - 2
    };
    const expectedState = {
      endX: 0,
      edgeDistanceX: mouseDownData.clientX - windowData.left - windowData.width,
      edgeDistanceY: mouseDownData.clientY - windowData.top - windowData.height
    };

    describe("render", () => {
      it("should contain window__resizer--bottom-right className", () => {
        checkClassName(wrapper, "window__resizer--bottom-right");
      });
    });

    describe("onMouseDown", () => {
      it("should update state correctly", () => {
        findByTestAtrr(wrapper, "resizer").simulate("mousedown", mouseDownData);
        expect(instance.state).toEqual(expectedState);
      });
    });

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

        expect(mockResizeFn.mock.calls.length).toBe(1);
        expect(mockResizeFn.mock.calls[0]).toEqual(expectedArgs);
      });
    });
  });
});
