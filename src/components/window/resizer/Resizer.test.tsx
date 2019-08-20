import React from "react";
import { shallow } from "enzyme";

import { windowConfig } from "../../../config";
import { Window } from "../../../store/window/models";
import { WindowResizer, initState } from "./Resizer";
import { findByTestAtrr } from "../../../../testingUtils";
import { capitalize } from "../../../utils";
import { toolbarConfig } from "../../../config";

const windowId: string = "this-is-window-id";
const windowData: Window = {
  id: windowId,
  fullscreened: false,
  minimalized: false,
  application: "ApplicationName",
  name: "WindowName",
  width: windowConfig.MINIMAL_SIZE,
  height: windowConfig.MINIMAL_SIZE,
  left: windowConfig.INITIAL_LEFT,
  top: windowConfig.INITIAL_TOP
};

const compResizerData = {
  resizesWidth: false,
  resizesHeight: false,
  isLeft: false,
  isTop: false
};

const compProps = {
  id: windowId,
  resize: jest.fn(),
  moveAndResize: jest.fn(),
  windowData: windowData,
  ...compResizerData
};

type CreateInstance = {
  resizesWidth?: boolean;
  resizesHeight?: boolean;
  isLeft?: boolean;
  isTop?: boolean;
  resize?: jest.Mock;
  moveAndResize?: jest.Mock;
};

const createInstance = (resizingProps: CreateInstance = {}) => {
  const props = { ...compProps, ...resizingProps };
  const comp = <WindowResizer {...props} />;
  const wrapper = shallow<WindowResizer>(comp);
  return wrapper.instance();
};

const clientX: number = 500;
const clientY: number = 500;
const instance = createInstance();

describe("WindowResizer Component", () => {
  describe("shouldComponentUpdate", () => {
    it("should update when isFullscreen changes", () => {
      const changedProps = {
        ...compProps,
        windowData: { ...compProps.windowData, fullscreened: true }
      };
      const result = instance.shouldComponentUpdate(changedProps);

      expect(result).toBe(true);
    });

    it("should NOT update when isFullscreen NOT changes", () => {
      const changedProps = {
        id: "asdasd",
        resize: jest.fn(),
        moveAndResize: jest.fn(),
        windowData: {
          id: "asdasd",
          fullscreened: false,
          minimalized: true,
          application: "asdasdasd",
          name: "qweqweqweqwe",
          width: 333,
          height: 333,
          left: 333,
          top: 333
        },
        resizesWidth: false,
        resizesHeight: false,
        isLeft: false,
        isTop: false
      };

      const result = instance.shouldComponentUpdate(changedProps);

      expect(result).toBe(false);
    });
  });

  describe("render", () => {
    it("should render without throwing an error", () => {
      const comp = <WindowResizer {...compProps} />;
      const wrapper = shallow<WindowResizer>(comp);

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
  });

  describe("calculateStateDataX", () => {
    it("should return proper value when resizesWidth and isLeft", () => {
      const instance = createInstance({ resizesWidth: true, isLeft: true });

      const result = instance.calculateStateDataX(clientX);
      const expectedResult = {
        endX: windowData.left + windowData.width,
        edgeDistanceX: clientX - compProps.windowData.left
      };

      expect(result).toEqual(expectedResult);
    });

    it("should return proper value when resizesWidth and !isLeft", () => {
      const instance = createInstance({ resizesWidth: true, isLeft: false });

      const result = instance.calculateStateDataX(clientX);
      const expectedResult = {
        endX: initState.endX,
        edgeDistanceX: clientX - windowData.left - windowData.width
      };

      expect(result).toEqual(expectedResult);
    });

    it("should return proper value when !resizesWidth", () => {
      const instance = createInstance({ resizesWidth: false });

      const result = instance.calculateStateDataX(clientX);
      const expectedResult = {
        endX: initState.endX,
        edgeDistanceX: initState.edgeDistanceX
      };

      expect(result).toEqual(expectedResult);
    });
  });

  describe("calculateStateDataY", () => {
    it("should return proper value when resizesHeight and isTop", () => {
      const instance = createInstance({ resizesHeight: true, isTop: true });

      const result = instance.calculateStateDataY(clientY);
      const expectedResult = {
        endY: windowData.top + windowData.height,
        edgeDistanceY: clientY - windowData.top
      };

      expect(result).toEqual(expectedResult);
    });

    it("should return proper value when resizesHeight and !isTop", () => {
      const instance = createInstance({ resizesHeight: true, isTop: false });

      const result = instance.calculateStateDataY(clientY);
      const expectedResult = {
        endY: initState.endY,
        edgeDistanceY: clientY - windowData.top - windowData.height
      };

      expect(result).toEqual(expectedResult);
    });

    it("should return proper value when !resizesHeight", () => {
      const instance = createInstance({ resizesHeight: false });

      const result = instance.calculateStateDataY(clientY);
      const expectedResult = {
        endY: initState.endY,
        edgeDistanceY: initState.edgeDistanceY
      };

      expect(result).toEqual(expectedResult);
    });
  });

  describe("calculateNewState", () => {
    it("should return proper calculated state", () => {
      const stateDataX = instance.calculateStateDataX(clientX);
      const stateDataY = instance.calculateStateDataY(clientY);

      const result = instance.calculateNewState(clientX, clientY);
      const expectedResult = { ...stateDataX, ...stateDataY };

      expect(result).toEqual(expectedResult);
    });
  });

  describe("handleMouseDown", () => {
    it("should update state correctly", () => {
      const expectedState = instance.calculateNewState(clientX, clientY);

      instance.handleMouseDown({ clientX, clientY } as any);
      expect(instance.state).toEqual(expectedState);
    });
  });

  describe("convertMousePos", () => {
    it("should return exact clientX and clientY", () => {
      const mousePos = { clientX, clientY } as MouseEvent;
      const result = instance.convertMousePos(mousePos);
      const expectedResult = { x: clientX, y: clientY };

      expect(result).toEqual(expectedResult);
    });

    it("should return exact clientX and clientY should be 0", () => {
      const mousePos = { clientX, clientY: -500 } as MouseEvent;
      const result = instance.convertMousePos(mousePos);
      const expectedResult = { x: clientX, y: 0 };

      expect(result).toEqual(expectedResult);
    });

    it("should return exact clientX and clientY should be max", () => {
      const mousePos = { clientX, clientY: 99999 } as MouseEvent;
      const result = instance.convertMousePos(mousePos);
      const expectedResult = {
        x: clientX,
        y: window.innerHeight - toolbarConfig.HEIGHT
      };

      expect(result).toEqual(expectedResult);
    });
  });

  describe("calculateNewWidth", () => {
    describe("resizesWidth and isLeft", () => {
      const instance = createInstance({ resizesWidth: true, isLeft: true });

      it("should return calculated value", () => {
        const { endX, edgeDistanceX } = instance.state;

        const result = instance.calculateNewWidth(clientX);
        const expectedResult = endX - clientX + edgeDistanceX;

        expect(result).toBe(expectedResult);
      });

      it("should return max width", () => {
        const clientX: number = -999999;

        const result = instance.calculateNewWidth(clientX);
        const expectedResult = window.innerWidth;

        expect(result).toBe(expectedResult);
      });
    });

    describe("resizesWidth and !isLeft", () => {
      const instance = createInstance({ resizesWidth: true, isLeft: false });

      it("should return calculated value", () => {
        const { edgeDistanceX } = instance.state;

        const result = instance.calculateNewWidth(clientX);
        const expectedResult = clientX - windowData.left - edgeDistanceX;

        expect(result).toBe(expectedResult);
      });

      it("should return max width", () => {
        const clientX: number = 999999;

        const result = instance.calculateNewWidth(clientX);
        const expectedResult = window.innerWidth;

        expect(result).toBe(expectedResult);
      });
    });

    describe("!resizesWidth", () => {
      it("should return window width", () => {
        const instance = createInstance({ resizesWidth: false });

        const result = instance.calculateNewWidth(clientX);
        const expectedResult = windowData.width;

        expect(result).toBe(expectedResult);
      });
    });
  });

  describe("calculateNewHeight", () => {
    describe("resizesHeight and isTop", () => {
      const instance = createInstance({ resizesHeight: true, isTop: true });

      it("should return calculated value", () => {
        const { endY, edgeDistanceY } = instance.state;

        const result = instance.calculateNewHeight(clientY);
        const expectedResult = endY - clientY + edgeDistanceY;

        expect(result).toBe(expectedResult);
      });

      it("should return max height", () => {
        const clientY: number = -999999;

        const result = instance.calculateNewHeight(clientY);
        const expectedResult = window.innerHeight - toolbarConfig.HEIGHT;

        expect(result).toBe(expectedResult);
      });
    });

    describe("resizesHeight and !isTop", () => {
      const instance = createInstance({ resizesHeight: true, isTop: false });

      it("should return calculated value", () => {
        const { edgeDistanceY } = instance.state;

        const result = instance.calculateNewHeight(clientY);
        const expectedResult = clientY - windowData.top - edgeDistanceY;

        expect(result).toBe(expectedResult);
      });

      it("should return max height", () => {
        const clientY: number = 999999;

        const result = instance.calculateNewHeight(clientY);
        const expectedResult = window.innerHeight - toolbarConfig.HEIGHT;

        expect(result).toBe(expectedResult);
      });
    });

    describe("!resizesHeight", () => {
      it("should return window height", () => {
        const instance = createInstance({ resizesHeight: false });

        const result = instance.calculateNewHeight(clientY);
        const expectedResult = windowData.height;

        expect(result).toBe(expectedResult);
      });
    });
  });

  describe("calculateNewSize", () => {
    it("should return proper value", () => {
      const newWidth = instance.calculateNewWidth(clientX);
      const newHeight = instance.calculateNewHeight(clientY);

      const result = instance.calculateNewSize({ x: clientX, y: clientY });
      const expectedResult = { width: newWidth, height: newHeight };

      expect(result).toEqual(expectedResult);
    });
  });

  describe("changeSize", () => {
    const newSize = { width: 500, height: 500 };

    describe("!isLeft && !isTop", () => {
      it("should call resize with given size", () => {
        const resize = jest.fn();
        const instance = createInstance({
          isLeft: false,
          isTop: false,
          resize
        });
        instance.changeSize(newSize);

        expect(resize.mock.calls.length).toBe(1);
        expect(resize.mock.calls[0]).toEqual([newSize.width, newSize.height]);
      });
    });

    describe("isLeft", () => {
      it("should call moveAndResize with proper args", () => {
        const moveAndResize = jest.fn();
        const instance = createInstance({
          isLeft: true,
          isTop: false,
          moveAndResize
        });
        const { endX } = instance.state;

        const newPosX = Math.min(
          endX - newSize.width,
          endX - windowConfig.MINIMAL_SIZE
        );

        const expectedArgs = [
          newPosX,
          windowData.top,
          newSize.width,
          newSize.height
        ];

        instance.changeSize(newSize);
        expect(moveAndResize.mock.calls.length).toBe(1);
        expect(moveAndResize.mock.calls[0]).toEqual(expectedArgs);
      });
    });

    describe("isTop", () => {
      it("should call moveAndResize with proper args", () => {
        const moveAndResize = jest.fn();
        const instance = createInstance({
          isLeft: false,
          isTop: true,
          moveAndResize
        });
        const { endY } = instance.state;

        const newPosY = Math.min(
          endY - newSize.width,
          endY - windowConfig.MINIMAL_SIZE
        );

        const expectedArgs = [
          windowData.left,
          newPosY,
          newSize.width,
          newSize.height
        ];

        instance.changeSize(newSize);
        expect(moveAndResize.mock.calls.length).toBe(1);
        expect(moveAndResize.mock.calls[0]).toEqual(expectedArgs);
      });
    });
  });

  describe("getClassModifier", () => {
    const testClassModifier = (
      expectedModifiers: string[],
      createInstanceData: CreateInstance
    ) => {
      const resizerDirection = expectedModifiers.reduce(
        (prev, curr) => prev + capitalize(curr),
        ""
      );

      describe(`${resizerDirection}Resizer`, () => {
        it("should have proper className", () => {
          const instance = createInstance(createInstanceData);
          const result = instance.getClassModifier();

          const baseClassName = "window__resizer";
          const expectedClassName = expectedModifiers.reduce(
            (prev, current) => prev + ` ${baseClassName}--${current}`,
            baseClassName
          );

          expect(result).toBe(expectedClassName);
        });
      });
    };

    testClassModifier(["top", "left"], {
      resizesHeight: true,
      resizesWidth: true,
      isTop: true,
      isLeft: true
    });

    testClassModifier(["top"], {
      resizesHeight: true,
      isTop: true
    });

    testClassModifier(["top", "right"], {
      resizesHeight: true,
      resizesWidth: true,
      isTop: true
    });

    testClassModifier(["right"], {
      resizesWidth: true
    });

    testClassModifier(["bottom", "right"], {
      resizesHeight: true,
      resizesWidth: true
    });

    testClassModifier(["bottom", "left"], {
      resizesHeight: true,
      resizesWidth: true,
      isLeft: true
    });

    testClassModifier(["left"], {
      resizesWidth: true,
      isLeft: true
    });

    testClassModifier(["bottom"], {
      resizesHeight: true
    });
  });
});
