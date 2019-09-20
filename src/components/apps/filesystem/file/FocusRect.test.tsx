import React from "react";
import { shallow } from "enzyme";

import { Display } from "../context/models";
import { FocusRect, StartEventData } from "./FocusRect";
import { filesystemConfig } from "../../../../config";
import { findByTestAtrr } from "../../../../../testingUtils";

let mockSetFocusingRectFn: jest.Mock;
let mockOnMouseUpFn: jest.Mock;
let mockSetFocusedFn: jest.Mock;

const createWrapper = (
  eventData: Partial<StartEventData> = {},
  refData: { scrollTop?: number; scrollHeight?: number } = {},
  contextData: {
    path?: string[];
    focused?: string[];
    files?: Array<{ name: string }>;
  } = {},
  display: Display = "tiles"
) => {
  mockSetFocusingRectFn = jest.fn();
  mockOnMouseUpFn = jest.fn();
  mockSetFocusedFn = jest.fn();

  const props = {
    setFocusingRect: mockSetFocusingRectFn,
    onMouseUp: mockOnMouseUpFn,
    mouseDownData: {
      clientX: 0,
      clientY: 0,
      filesLeft: 0,
      filesTop: 0,
      filesWidth: 0,
      ...eventData
    },
    containerRef: {
      current: {
        scrollTop: 0,
        scrollHeight: 0,
        ...refData
      }
    },
    context: {
      setFocused: mockSetFocusedFn,
      path: [],
      focused: [],
      files: [],
      options: { display },
      ...contextData
    }
  } as any;

  return shallow<FocusRect>(<FocusRect {...props} />);
};

let wrapper = createWrapper();

describe("Filesystem FocusRect Component", () => {
  describe("componentDidMount", () => {
    it("should call setFocusingRect", () => {
      wrapper = createWrapper();

      expect(mockSetFocusingRectFn.mock.calls.length).toBe(1);
      expect(mockSetFocusingRectFn.mock.calls[0]).toEqual([true]);
    });

    it("should change state", () => {
      wrapper = createWrapper(
        { clientX: 50, filesLeft: 20, clientY: 50, filesTop: 20 },
        { scrollTop: 10 }
      );

      expect(wrapper.instance().state.startLeft).toBe(30);
      expect(wrapper.instance().state.startTop).toBe(40);
    });
  });

  describe("handleMouseMove", () => {
    it("should updateState", () => {
      const instance = createWrapper().instance();
      const ev = { clientX: 10, clientY: 20 };
      const newState = instance.calculateNewState(ev.clientX, ev.clientY);

      instance.handleMouseMove(ev as any);
      expect(instance.state).toEqual({ ...instance.state, ...newState });
    });

    it("should call setFocused", () => {
      const instance = createWrapper(
        {},
        {},
        { focused: ["psajfspd"] }
      ).instance();
      const ev = { clientX: 10, clientY: 20 };

      instance.handleMouseMove(ev as any);
      expect(mockSetFocusedFn.mock.calls.length).toBe(1);
    });
  });

  describe("calculateNewState", () => {
    it("should return calculated state data", () => {
      const instance = createWrapper().instance();

      const mouseX = 40;
      const mouseY = 30;
      const newWidth = instance.calculateWidth(mouseX);
      const newHeight = instance.calculateHeight(mouseY);

      expect(instance.calculateNewState(mouseX, mouseY)).toEqual({
        left: instance.calculateLeft(mouseX, newWidth),
        top: instance.calculateTop(mouseY, newHeight),
        width: newWidth,
        height: newHeight
      });
    });
  });

  describe("calculateWidth", () => {
    it("should return positive value", () => {
      wrapper = createWrapper({ clientX: 10 });

      expect(wrapper.instance().calculateWidth(20)).toBe(10);
      expect(wrapper.instance().calculateWidth(0)).toBe(10);
    });
  });

  describe("calculateLeft", () => {
    it("mouseX is greater than clientX", () => {
      wrapper = createWrapper({ clientX: 20 });
      wrapper.instance().setState({ startLeft: 10 });

      const result = wrapper.instance().calculateLeft(40, 50);
      expect(result).toBe(10);
    });

    it("mouseX is NOT greater than clientX", () => {
      wrapper = createWrapper({ clientX: 20 });
      wrapper.instance().setState({ startLeft: 10 });

      const result = wrapper.instance().calculateLeft(10, 10);
      expect(result).toBe(0);
    });
  });

  describe("calculateTop", () => {
    it("mouseY is greater than clientY", () => {
      wrapper = createWrapper({ clientY: 20 });
      wrapper.instance().setState({ startTop: 10 });

      const result = wrapper.instance().calculateTop(40, 50);
      expect(result).toBe(10);
    });

    it("mouseY is NOT greater than clientY", () => {
      wrapper = createWrapper({ clientY: 20 });
      wrapper.instance().setState({ startTop: 10 });

      const result = wrapper.instance().calculateTop(10, 10);
      expect(result).toBe(0);
    });
  });

  describe("calculateFocusLoopData", () => {
    describe("path length is 0", () => {
      wrapper = createWrapper({}, {}, { path: [] }, "thumbnails");

      const args = { top: 766, left: 555, width: 824, height: 1224 };
      const result = wrapper.instance().calculateFocusLoopData(args);
      expect(result).toEqual({
        endCol: -1,
        endRow: 13,
        filesInCol: 0,
        startCol: 4,
        startRow: 5
      });
    });

    describe("path length is NOT 0", () => {
      wrapper = createWrapper({}, {}, { path: ["1"] }, "thumbnails");

      const args = { top: 766, left: 555, width: 824, height: 1224 };
      const result = wrapper.instance().calculateFocusLoopData(args);
      expect(result).toEqual({
        endCol: -1,
        endRow: 14,
        filesInCol: 0,
        startCol: 4,
        startRow: 5
      });
    });
  });

  describe("getFileWidthAndHeight", () => {
    it("should return thumbnail data", () => {
      wrapper = createWrapper({}, {}, {}, "thumbnails");

      expect(wrapper.instance().getFileWidthAndHeight()).toEqual({
        fileWidth: filesystemConfig.THUMBNAIL_WIDTH,
        fileHeight: filesystemConfig.THUMBNAIL_HEIGHT
      });
    });

    it("should return tile data", () => {
      wrapper = createWrapper({}, {}, {}, "tiles");

      expect(wrapper.instance().getFileWidthAndHeight()).toEqual({
        fileWidth: filesystemConfig.TILE_WIDTH,
        fileHeight: filesystemConfig.TILE_HEIGHT
      });
    });

    it("should return icon data", () => {
      wrapper = createWrapper({}, {}, {}, "icons");

      expect(wrapper.instance().getFileWidthAndHeight()).toEqual({
        fileWidth: filesystemConfig.ICON_WIDTH,
        fileHeight: filesystemConfig.ICON_HEIGHT
      });
    });

    it("should return list data", () => {
      wrapper = createWrapper({ filesWidth: 100 }, {}, {}, "list");

      expect(wrapper.instance().getFileWidthAndHeight()).toEqual({
        fileWidth: 99,
        fileHeight: filesystemConfig.LIST_HEIGHT
      });
    });
  });

  describe("handleMouseUp", () => {
    it("should call setFocusingRect", () => {
      wrapper = createWrapper();
      wrapper.instance().handleMouseUp();

      expect(mockSetFocusingRectFn.mock.calls.length).toBe(2);
      expect(mockSetFocusingRectFn.mock.calls[1]).toEqual([false]);
    });

    it("should call onMouseUp", () => {
      wrapper = createWrapper();
      wrapper.instance().handleMouseUp();

      expect(mockOnMouseUpFn.mock.calls.length).toBe(1);
    });
  });

  describe("getInlineStyles", () => {
    const newState = { width: 20, height: 30, left: 40, top: 50 };

    it("should retutn style state and display block", () => {
      wrapper.instance().setState(newState);

      expect(wrapper.instance().getInlineStyles()).toEqual({
        ...newState,
        display: "block"
      });
    });

    describe("should return display none", () => {
      wrapper.instance().setState({ ...newState, width: 0 });
      expect(wrapper.instance().getInlineStyles().display).toBe("none");

      wrapper.instance().setState({ ...newState, height: 0 });
      expect(wrapper.instance().getInlineStyles().display).toBe("none");
    });
  });

  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "rect").length).toBe(1);
    });
  });
});
