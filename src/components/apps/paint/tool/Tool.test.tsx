import React from "react";
import { shallow } from "enzyme";

import { Tool } from "./Tool";
import { findByTestAtrr } from "../../../../../testingUtils";

let mockSetPaintContextFn: jest.Mock = jest.fn();
let mockSetWindowContextFn: jest.Mock = jest.fn();
let mockOnMouseDownFn: jest.Mock = jest.fn();
let mockOnMouseMoveFn: jest.Mock = jest.fn();
let mockOnMouseUpFn: jest.Mock = jest.fn();
let mockOnToolChangeFn: jest.Mock = jest.fn();

const toolType: any = "fill";

const createWrapper = (
  focused: boolean = false,
  selectedTool: any = "fill",
  notImplemented: boolean = false,
  zoom: number = 1
) => {
  mockSetPaintContextFn = jest.fn();
  mockSetWindowContextFn = jest.fn();
  mockOnMouseDownFn = jest.fn();
  mockOnMouseMoveFn = jest.fn();
  mockOnMouseUpFn = jest.fn();
  mockOnToolChangeFn = jest.fn();

  const props = {
    icon: "x",
    toolType,
    notImplemented,
    paint: {
      setContext: mockSetPaintContextFn,
      selectedTool,
      options: { zoom }
    } as any,
    window: { focused, setContext: mockSetWindowContextFn } as any,
    onMouseDown: mockOnMouseDownFn,
    onMouseMove: mockOnMouseMoveFn,
    onMouseUp: mockOnMouseUpFn,
    onToolChange: mockOnToolChangeFn
  };

  return shallow<Tool>(<Tool {...props} />);
};

const wrapper = createWrapper();

const validMouseEvent = {
  clientX: 10,
  clientY: 20,
  which: 1,
  target: {
    classList: { contains: () => true },
    getClientRects: () => [{ left: 1, top: 1 }]
  }
};

describe("Paint Tool component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "tool").length).toBe(1);
    });
  });

  describe("componentDidUpdate", () => {
    it("should call onToolChange", () => {
      const instance = createWrapper().instance();
      instance.componentDidUpdate();

      expect(mockOnToolChangeFn.mock.calls.length).toBe(1);
    });
  });

  describe("clickedOwnCanvas", () => {
    it("should return true", () => {
      const wrapper = createWrapper(true, "fill");
      const ev = { target: { classList: { contains: () => true } } };

      expect(wrapper.instance().clickedOwnCanvas(ev as any)).toBe(true);
    });

    describe("should return false", () => {
      it("is not focused", () => {
        const wrapper = createWrapper(false, "fill");
        const ev = { target: { classList: { contains: () => true } } };

        expect(wrapper.instance().clickedOwnCanvas(ev as any)).toBe(false);
      });

      it("is not selectedTool", () => {
        const wrapper = createWrapper(true, "asdasdasd");
        const ev = { target: { classList: { contains: () => true } } };

        expect(wrapper.instance().clickedOwnCanvas(ev as any)).toBe(false);
      });

      it("canvas is not clicked", () => {
        const wrapper = createWrapper(true, "fill");
        const ev = { target: { classList: { contains: () => false } } };

        expect(wrapper.instance().clickedOwnCanvas(ev as any)).toBe(false);
      });
    });
  });

  describe("handleMouseDown", () => {
    it("should call onMouseDown when left mouse button is clicked", () => {
      const instance = createWrapper(true, "fill").instance();
      const ev = { ...validMouseEvent, which: 1 };

      instance.handleMouseDown(ev as any);
      expect(mockOnMouseDownFn.mock.calls.length).toBe(1);
    });

    it("should NOT call onMouseDown when right mouse button is clicked", () => {
      const instance = createWrapper(true, "fill").instance();
      const ev = { ...validMouseEvent, which: 3 };

      instance.handleMouseDown(ev as any);
      expect(mockOnMouseDownFn.mock.calls.length).toBe(0);
    });
  });

  describe("handleContextMenu", () => {
    it("should preventDefault", () => {
      const mockPreventDefaultFn = jest.fn();
      const instance = createWrapper(true, "fill").instance();
      const ev = { ...validMouseEvent, preventDefault: mockPreventDefaultFn };
      instance.handleContextMenu(ev);

      expect(mockPreventDefaultFn.mock.calls.length).toBe(1);
    });
  });

  describe("setCanvasData", () => {
    it("should update state", () => {
      const instance = wrapper.instance();
      instance.setState({ canvasLeft: 0, canvasTop: 0 });

      const newLeft = 1;
      const newTop = 2;
      const clientRects = [{ left: newLeft, top: newTop }];
      const ev = { target: { getClientRects: () => clientRects } };

      instance.setCanvasData(ev as any);
      expect(instance.state.canvasLeft).toBe(newLeft);
      expect(instance.state.canvasTop).toBe(newTop);
    });
  });

  describe("handleMouseMove", () => {
    it("should call onMouseMove", () => {
      const instance = createWrapper().instance();
      const ev = { target: { clientX: 10, clientY: 20 } };

      instance.handleMouseMove(ev as any);
      expect(mockOnMouseMoveFn.mock.calls.length).toBe(1);
    });
  });

  describe("handleMouseUp", () => {
    it("should call onMouseUp", () => {
      const instance = createWrapper().instance();
      const ev = { target: { clientX: 10, clientY: 20 } };

      instance.handleMouseUp(ev as any);
      expect(mockOnMouseUpFn.mock.calls.length).toBe(1);
    });
  });

  describe("calculateCanvasPos", () => {
    it("should return proper value", () => {
      const newState = { canvasLeft: 40, canvasTop: 50 };
      wrapper.instance().setState(newState);

      const ev = { clientX: 10, clientY: 80 };
      const result = wrapper.instance().calculateCanvasPos(ev as any);
      expect(result).toEqual({ x: -30, y: 30 });
    });

    it("should return zoomed value", () => {
      const zoom = 2;
      const instance = createWrapper(true, "", false, zoom).instance();
      const newState = { canvasLeft: 40, canvasTop: 50 };
      instance.setState(newState);

      const ev = { clientX: 10, clientY: 80 };
      const result = instance.calculateCanvasPos(ev as any);
      expect(result).toEqual({ x: -30 / zoom, y: 30 / zoom });
    });
  });

  describe("handleIconClick", () => {
    describe("implemented", () => {
      let instance: Tool;

      beforeEach(() => {
        instance = createWrapper(true, "a", true).instance();
        instance.handleIconClick();
      });

      it("should call window.setContext with proper args", () => {
        expect(mockSetWindowContextFn.mock.calls.length).toBe(1);
        expect(mockSetWindowContextFn.mock.calls[0]).toEqual([
          { disabled: true }
        ]);
      });

      it("should call paint.setContext with proper args", () => {
        expect(mockSetPaintContextFn.mock.calls.length).toBe(1);
        expect(mockSetPaintContextFn.mock.calls[0]).toEqual([
          { showError: true }
        ]);
      });
    });

    describe("not implemented", () => {
      it("should call paint.setContext with proper args", () => {
        const selectedTool = "pencil";
        const instance = createWrapper(true, selectedTool).instance();
        instance.handleIconClick();

        expect(mockSetPaintContextFn.mock.calls.length).toBe(1);
        expect(mockSetPaintContextFn.mock.calls[0]).toEqual([
          { selectedTool: toolType, lastSelectedTool: selectedTool }
        ]);
      });
    });
  });
});
