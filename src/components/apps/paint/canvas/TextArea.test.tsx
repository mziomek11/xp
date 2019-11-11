import React from "react";
import { shallow } from "enzyme";

import { TextArea } from "./TextArea";
import { findByTestAtrr } from "../../../../../testingUtils";
import Vector from "../../../../classes/Vector";

type OptProps = {
  isTransparent: boolean;
};

const position = new Vector(15, 16);
const size = new Vector(14, 12);
const primaryColor = "this is primary color";
const secondaryColor = "this is secondary color";

let mockSetColorFn: jest.Mock;
let mockFillRectFn: jest.Mock;
let mockFillTextFn: jest.Mock;

const createWrapper = (opts: Partial<OptProps> = {}) => {
  const optionalProps: OptProps = {
    isTransparent: false,
    ...opts
  };

  mockSetColorFn = jest.fn();
  mockFillRectFn = jest.fn();
  mockFillTextFn = jest.fn();

  const props = {
    paint: {
      primaryColor: primaryColor,
      secondaryColor: secondaryColor,
      setColor: mockSetColorFn,
      canvasCtx: {
        fillRect: mockFillRectFn,
        fillText: mockFillTextFn
      },
      options: {
        select: { isTransparent: optionalProps.isTransparent, position, size }
      }
    } as any
  };

  return shallow<TextArea>(<TextArea {...props} />);
};

const wrapper = createWrapper();
const instance = wrapper.instance();

describe("Paint Canvas TextArea component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "textarea").length).toBe(1);
    });
  });

  describe("componentWillUnmount", () => {
    let mockInsertTextFn: jest.Mock;

    const callUnmountWithState = (text: string) => {
      const instance = createWrapper().instance();
      mockInsertTextFn = jest.fn();
      instance.insertTextIntoCanvas = mockInsertTextFn;
      instance.setState({ text });
      instance.componentWillUnmount();
    };

    it("should call insertTextIntoCanvas", () => {
      callUnmountWithState("a");

      expect(mockInsertTextFn.mock.calls.length).toBe(1);
    });

    it("should NOT call insertTextIntoCanvas", () => {
      callUnmountWithState("");

      expect(mockInsertTextFn.mock.calls.length).toBe(0);
    });
  });

  describe("insertTextIntoCanvas", () => {
    let mockFillAreaFn: jest.Mock;
    let mockFillTextFn: jest.Mock;

    const callInsertTextIntoCanvas = (isTransparent: boolean) => {
      const instance = createWrapper({ isTransparent }).instance();
      mockFillAreaFn = jest.fn();
      mockFillTextFn = jest.fn();
      instance.fillArea = mockFillAreaFn;
      instance.fillText = mockFillTextFn;
      instance.insertTextIntoCanvas();
    };

    it("should call fillArea", () => {
      callInsertTextIntoCanvas(false);

      expect(mockFillAreaFn.mock.calls.length).toBe(1);
    });

    it("should NOT call fillArea", () => {
      callInsertTextIntoCanvas(true);

      expect(mockFillAreaFn.mock.calls.length).toBe(0);
    });

    it("should call fillText", () => {
      callInsertTextIntoCanvas(false);

      expect(mockFillTextFn.mock.calls.length).toBe(1);
    });
  });

  describe("fillArea", () => {
    beforeEach(() => {
      const instance = createWrapper().instance();
      instance.fillArea();
    });

    it("should call setColor", () => {
      expect(mockSetColorFn.mock.calls.length).toBe(1);
      expect(mockSetColorFn.mock.calls[0]).toEqual([false]);
    });

    it("should call fillRect", () => {
      const expectedResult = [position.x, position.y, size.x, size.y];
      expect(mockFillRectFn.mock.calls.length).toBe(1);
      expect(mockFillRectFn.mock.calls[0]).toEqual(expectedResult);
    });
  });

  describe("fillText", () => {
    it("should call setColor", () => {
      const instance = createWrapper().instance();
      instance.fillText();

      expect(mockSetColorFn.mock.calls.length).toBe(1);
      expect(mockSetColorFn.mock.calls[0]).toEqual([true]);
    });

    it("should call fillText three times", () => {
      const instance = createWrapper().instance();
      instance.setState({ text: "one\ntwo\nthree" });
      instance.fillText();

      expect(mockFillTextFn.mock.calls.length).toBe(3);
    });
  });

  describe("getInlineStyles", () => {
    const styles = instance.getInlineStyles();

    it("left and top should be position", () => {
      expect(styles.left).toBe(position.x);
      expect(styles.top).toBe(position.y);
    });

    it("width and height should be size", () => {
      expect(styles.width).toBe(size.x);
      expect(styles.height).toBe(size.y);
    });

    it("color should be primary color", () => {
      expect(styles.color).toBe(primaryColor);
    });

    describe("background", () => {
      it("should be transparent", () => {
        const instance = createWrapper({ isTransparent: true }).instance();
        const styles = instance.getInlineStyles();

        expect(styles.background).toBe("transparent");
      });

      it("should be secondaryColor", () => {
        const instance = createWrapper({ isTransparent: false }).instance();
        const styles = instance.getInlineStyles();

        expect(styles.background).toBe(secondaryColor);
      });
    });
  });
});
