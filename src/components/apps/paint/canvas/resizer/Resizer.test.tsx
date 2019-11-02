import React from "react";
import { shallow } from "enzyme";

import Resizer, { minRectSize } from "./Resizer";
import { findByTestAtrr } from "../../../../../../testingUtils";

const defualtWidth: number = 100;
const defualtHeight: number = 150;

const mockResizeFn: jest.Mock = jest.fn();
const createWrapper = (
  dir: "right" | "bottom" | "bottom-right",
  width: number = defualtWidth,
  height: number = defualtHeight
) => {
  const props = {
    isHorizontal: dir === "right" || dir === "bottom-right",
    isVertical: dir === "bottom" || dir === "bottom-right",
    resize: mockResizeFn,
    width,
    height
  };

  return shallow<Resizer>(<Resizer {...props} />);
};

const wrapperSE = createWrapper("bottom-right");
const wrapperS = createWrapper("bottom");
const wrapperE = createWrapper("right");

describe("Paint CanvasResizer component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapperSE, "resizer").length).toBe(1);
    });

    it("should render ResizerRect compoennt", () => {
      wrapperSE.instance().setState({ isResizing: true });

      expect(findByTestAtrr(wrapperSE, "rect").length).toBe(1);
    });

    it("should NOT render ResizerRect compoennt", () => {
      wrapperSE.instance().setState({ isResizing: false });

      expect(findByTestAtrr(wrapperSE, "rect").length).toBe(0);
    });
  });

  describe("handleMouseDown", () => {
    it("should update state", () => {
      const instance = wrapperSE.instance();
      const evLeft: number = 123;
      const evTop: number = 231;
      const ev = {
        currentTarget: { getClientRects: () => [{ left: evLeft, top: evTop }] }
      };

      instance.setState({
        isResizing: false,
        rectWidth: 0,
        rectHeight: 0,
        startLeft: 0,
        startTop: 0
      });

      instance.handleMouseDown(ev as any);
      expect(instance.state).toEqual({
        isResizing: true,
        rectWidth: defualtWidth,
        rectHeight: defualtHeight,
        startLeft: evLeft,
        startTop: evTop
      });
    });
  });

  describe("getOwnCursor", () => {
    it("should return se-resize when is se ", () => {
      expect(wrapperSE.instance().getOwnCursor()).toBe("se-resize");
    });

    it("should return e-resize when is e ", () => {
      expect(wrapperE.instance().getOwnCursor()).toBe("e-resize");
    });

    it("should return s-resize when is s ", () => {
      expect(wrapperS.instance().getOwnCursor()).toBe("s-resize");
    });
  });

  describe("handleMouseMove", () => {
    const startState = {
      rectWidth: 0,
      rectHeight: 0,
      startLeft: 100,
      startTop: 100
    };

    const event = { clientX: 500, clientY: 400 };

    it("should update width when and height when is SE", () => {
      const instance = wrapperSE.instance();

      instance.setState(startState);
      instance.handleMouseMove(event as any);

      expect(instance.state.rectWidth).toBe(500);
      expect(instance.state.rectHeight).toBe(450);
    });

    it("should update width when is E", () => {
      const instance = wrapperE.instance();

      instance.setState(startState);
      instance.handleMouseMove(event as any);

      expect(instance.state.rectWidth).toBe(500);
      expect(instance.state.rectHeight).toBe(0);
    });

    it("should update height when is S", () => {
      const instance = wrapperS.instance();

      instance.setState(startState);
      instance.handleMouseMove(event as any);

      expect(instance.state.rectWidth).toBe(0);
      expect(instance.state.rectHeight).toBe(450);
    });

    it("should return minRectSize", () => {
      const instance = wrapperSE.instance();
      const event = { clientX: -9999, clientY: -9999 };

      instance.setState(startState);
      instance.handleMouseMove(event as any);

      expect(instance.state.rectWidth).toBe(minRectSize);
      expect(instance.state.rectHeight).toBe(minRectSize);
    });
  });

  describe("handleMouseUp", () => {
    it("should update state and call resize", () => {
      const instance = wrapperSE.instance();
      instance.setState({ isResizing: true, rectWidth: 2, rectHeight: 3 });
      instance.handleMouseUp();

      expect(instance.state.isResizing).toBe(false);
      expect(mockResizeFn.mock.calls.length).toBe(1);
      expect(mockResizeFn.mock.calls[0]).toEqual([2, 3]);
    });
  });

  describe("getInlineStyles", () => {
    it("should return proper width and height when direction is SE", () => {
      const styles = wrapperSE.instance().getInlineStyles() as any;

      expect(styles.left).toBe(103);
      expect(styles.top).toBe(153);
    });

    it("should return proper width and height when direction is E", () => {
      const styles = wrapperE.instance().getInlineStyles() as any;

      expect(styles.left).toBe(103);
      expect(styles.top).toBe(76.5);
    });

    it("should return proper width and height when direction is S", () => {
      const styles = wrapperS.instance().getInlineStyles() as any;

      expect(styles.left).toBe(51.5);
      expect(styles.top).toBe(153);
    });
  });
});
