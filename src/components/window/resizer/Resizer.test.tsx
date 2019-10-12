import React from "react";
import { shallow } from "enzyme";

import { testContextData as contextData } from "../Context.test";
import { windowConfig } from "../../../config";
import { findByTestAtrr } from "../../../../testingUtils";
import { capitalize } from "../../../utils";
import { toolbarConfig } from "../../../config";
import {
  WindowResizer,
  initState,
  OwnProps,
  defaultProps as defaultResizeProps
} from "./Resizer";

const compProps = {
  window: contextData,
  ...defaultResizeProps
};

type CreateInstance = Omit<OwnProps, "window"> & {
  setContext?: () => void;
};

const createInstance = ({
  setContext,
  ...resizingProps
}: CreateInstance = {}) => {
  const contextProps = {
    ...contextData,
    setContext: setContext ? setContext : jest.fn()
  };
  const props = { window: { ...contextProps }, ...resizingProps };
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
        window: { ...compProps.window, fullscreened: true }
      };
      const result = instance.shouldComponentUpdate(changedProps);

      expect(result).toBe(true);
    });

    it("should NOT update when isFullscreen NOT changes", () => {
      const changedProps = {
        window: { ...contextData },
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
        window: { ...compProps.window, fullscreened: true }
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
        endX: contextData.left + contextData.width,
        edgeDistanceX: clientX - compProps.window.left
      };

      expect(result).toEqual(expectedResult);
    });

    it("should return proper value when resizesWidth and !isLeft", () => {
      const instance = createInstance({ resizesWidth: true, isLeft: false });

      const result = instance.calculateStateDataX(clientX);
      const expectedResult = {
        endX: initState.endX,
        edgeDistanceX: clientX - contextData.left - contextData.width
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
        endY: contextData.top + contextData.height,
        edgeDistanceY: clientY - contextData.top
      };

      expect(result).toEqual(expectedResult);
    });

    it("should return proper value when resizesHeight and !isTop", () => {
      const instance = createInstance({ resizesHeight: true, isTop: false });

      const result = instance.calculateStateDataY(clientY);
      const expectedResult = {
        endY: initState.endY,
        edgeDistanceY: clientY - contextData.top - contextData.height
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
        const endX: number = 800;
        const edgeDistanceX: number = 2;
        const clientX: number = endX - windowConfig.MINIMAL_WIDTH - 40;
        instance.setState({ endX, edgeDistanceX });

        const result = instance.calculateNewWidth(clientX);
        const expectedResult = endX - clientX + edgeDistanceX;

        expect(result).toBe(expectedResult);
      });

      it("should return min width", () => {
        const clientX: number = 999999;

        const result = instance.calculateNewWidth(clientX);
        const expectedResult = windowConfig.MINIMAL_WIDTH;

        expect(result).toBe(expectedResult);
      });
    });

    describe("resizesWidth and !isLeft", () => {
      const instance = createInstance({ resizesWidth: true, isLeft: false });

      it("should return calculated value", () => {
        const edgeDistanceX: number = -2;
        instance.setState({ edgeDistanceX });

        const result = instance.calculateNewWidth(clientX);
        const expectedResult = clientX - contextData.left - edgeDistanceX;

        expect(result).toBe(expectedResult);
      });

      it("should return min width", () => {
        const clientX: number = -999999;

        const result = instance.calculateNewWidth(clientX);
        const expectedResult = windowConfig.MINIMAL_WIDTH;

        expect(result).toBe(expectedResult);
      });
    });

    describe("!resizesWidth", () => {
      it("should return window width", () => {
        const instance = createInstance({ resizesWidth: false });

        const result = instance.calculateNewWidth(clientX);
        const expectedResult = contextData.width;

        expect(result).toBe(expectedResult);
      });
    });
  });

  describe("calculateNewHeight", () => {
    describe("resizesHeight and isTop", () => {
      const instance = createInstance({ resizesHeight: true, isTop: true });

      it("should return calculated value", () => {
        const endY: number = 40;
        const edgeDistanceY: number = 2;
        const clientY: number = endY - windowConfig.MINIMAL_HEIGHT - 100;
        instance.setState({ endY, edgeDistanceY });

        const result = instance.calculateNewHeight(clientY);
        const expectedResult = endY - clientY + edgeDistanceY;

        expect(result).toBe(expectedResult);
      });

      it("should return min height", () => {
        const clientY: number = 999999;

        const result = instance.calculateNewHeight(clientY);
        const expectedResult = windowConfig.MINIMAL_HEIGHT;

        expect(result).toBe(expectedResult);
      });
    });

    describe("resizesHeight and !isTop", () => {
      const instance = createInstance({ resizesHeight: true, isTop: false });

      it("should return calculated value", () => {
        const edgeDistanceY: number = 2;
        instance.setState({ edgeDistanceY });

        const result = instance.calculateNewHeight(clientY);
        const expectedResult = clientY - contextData.top - edgeDistanceY;

        expect(result).toBe(expectedResult);
      });

      it("should return min height", () => {
        const clientY: number = -999999;

        const result = instance.calculateNewHeight(clientY);
        const expectedResult = windowConfig.MINIMAL_HEIGHT;

        expect(result).toBe(expectedResult);
      });
    });

    describe("!resizesHeight", () => {
      it("should return window height", () => {
        const instance = createInstance({ resizesHeight: false });

        const result = instance.calculateNewHeight(clientY);
        const expectedResult = contextData.height;

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

  describe("resize", () => {
    const newSize = { width: 500, height: 500 };

    describe("!isLeft && !isTop", () => {
      it("should call resize with given size", () => {
        const setContext = jest.fn();
        const instance = createInstance({
          isLeft: false,
          isTop: false,
          setContext
        });
        instance.resize(newSize);

        expect(setContext.mock.calls.length).toBe(1);
        expect(setContext.mock.calls[0]).toEqual([{ ...newSize }]);
      });
    });

    describe("isLeft", () => {
      it("should call moveAndResize with proper args", () => {
        const setContext = jest.fn();
        const instance = createInstance({
          isLeft: true,
          isTop: false,
          setContext
        });
        const { endX } = instance.state;

        const newPosX = Math.min(
          endX - newSize.width,
          endX - windowConfig.MINIMAL_WIDTH
        );

        const expectedArgs = {
          left: newPosX,
          top: contextData.top,
          ...newSize
        };

        instance.resize(newSize);
        expect(setContext.mock.calls.length).toBe(1);
        expect(setContext.mock.calls[0]).toEqual([expectedArgs]);
      });
    });

    describe("isTop", () => {
      it("should call moveAndResize with proper args", () => {
        const setContext = jest.fn();
        const instance = createInstance({
          isLeft: false,
          isTop: true,
          setContext
        });
        const { endY } = instance.state;

        const newPosY = Math.min(
          endY - newSize.width,
          endY - windowConfig.MINIMAL_HEIGHT
        );

        const expectedArgs = {
          left: contextData.left,
          top: newPosY,
          ...newSize
        };

        instance.resize(newSize);
        expect(setContext.mock.calls.length).toBe(1);
        expect(setContext.mock.calls[0]).toEqual([expectedArgs]);
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
