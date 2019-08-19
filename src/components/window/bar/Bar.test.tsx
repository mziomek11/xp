import React from "react";
import { shallow } from "enzyme";

import { windowConfig, toolbarConfig } from "../../../config";
import { Bar, pixelsToLeave, initState } from "./Bar";
import { findByTestAtrr } from "../../../../testingUtils";

const barProps = {
  id: "abc",
  name: "Program",
  lastWindowX: windowConfig.INITIAL_LEFT,
  lastWindowY: windowConfig.INITIAL_TOP,
  windowWidth: windowConfig.INITIAL_WIDTH,
  windowHeight: windowConfig.INITIAL_HEIGHT,
  isFullScreened: false,
  moveWindow: jest.fn()
};
let wrapper = shallow<Bar>(<Bar {...barProps} />);

const getMouseEventData = (contains: boolean) => ({
  clientX: barProps.lastWindowX + barProps.windowWidth / 2,
  clientY: barProps.windowHeight + 10,
  target: {
    classList: {
      contains: () => contains
    }
  }
});

const mouseDownFalse = getMouseEventData(false);
const mouseDownTrue = getMouseEventData(true);

describe("WindowBar Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "bar").length).toBe(1);
    });

    it("should render title", () => {
      expect(findByTestAtrr(wrapper, "title").length).toBe(1);
      expect(findByTestAtrr(wrapper, "title").contains("Program")).toBe(true);
    });

    it("should render actions", () => {
      expect(findByTestAtrr(wrapper, "actions").length).toBe(1);
      expect(findByTestAtrr(wrapper, "action-minimalize").length).toBe(1);
      expect(findByTestAtrr(wrapper, "action-exit").length).toBe(1);
      expect(findByTestAtrr(wrapper, "action-fullscreen").length).toBe(1);
    });
  });

  describe("handleMouseDown", () => {
    it("should update state correctly ", () => {
      findByTestAtrr(wrapper, "bar").simulate("mousedown", mouseDownFalse);

      const barX: number = mouseDownFalse.clientX - barProps.lastWindowX;
      const barY: number = mouseDownFalse.clientY - barProps.lastWindowY;
      const minLeft: number = -barProps.windowWidth + pixelsToLeave;
      const maxLeft: number = window.innerWidth - pixelsToLeave;
      const maxTop: number =
        window.innerHeight - pixelsToLeave - toolbarConfig.HEIGHT;

      const expectedState = { barX, barY, minLeft, maxLeft, maxTop };
      expect(wrapper.instance().state).toEqual(expectedState);
    });

    it("should NOT update state when is fullscreened", () => {
      const fullScrProps = { ...barProps, isFullScreened: true };
      const fullScrWrapper = shallow(<Bar {...fullScrProps} />);
      const bar = findByTestAtrr(fullScrWrapper, "bar");
      bar.simulate("mousedown", mouseDownFalse);

      expect(fullScrWrapper.instance().state).toEqual(initState);
    });

    it("should NOT update state when clicked on action", () => {
      const wrapper = shallow<Bar>(<Bar {...barProps} />);
      findByTestAtrr(wrapper, "bar").simulate("mousedown", mouseDownTrue);

      expect(wrapper.instance().state).toEqual(initState);
    });
  });

  describe("handleMouseMove", () => {
    const map: any = {};
    let mockMoveWindow: jest.Mock;

    window.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });

    beforeEach(() => {
      mockMoveWindow = jest.fn();
      wrapper = shallow<Bar>(<Bar {...barProps} moveWindow={mockMoveWindow} />);
    });

    it("should not be called when mouseDown did not occur", () => {
      map.mousemove({});
      expect(mockMoveWindow.mock.calls.length).toBe(0);
    });

    it("should be called when mouseDown occured", () => {
      findByTestAtrr(wrapper, "bar").simulate("mousedown", mouseDownFalse);
      map.mousemove({});

      expect(mockMoveWindow.mock.calls.length).toBe(1);
    });

    it("should send proper argument to mockMoveWindow", () => {
      findByTestAtrr(wrapper, "bar").simulate("mousedown", mouseDownFalse);
      let callCount = 0;

      const checkOutput = (moveX: number, moveY: number) => {
        const { state } = wrapper.instance();
        const { barX, barY, minLeft, maxLeft, maxTop } = state;
        const moveData = { clientX: moveX, clientY: moveY };

        map.mousemove(moveData);
        const expectedOutput: [number, number] = [
          Math.min(Math.max(moveData.clientX - barX, minLeft), maxLeft),
          Math.min(Math.max(moveData.clientY - barY, 0), maxTop)
        ];
        expect(mockMoveWindow.mock.calls[callCount]).toEqual(expectedOutput);
        callCount += 1;
      };

      checkOutput(100, 100);
      checkOutput(250, 200);
      checkOutput(-500, -500);
      checkOutput(2000, 2000);
    });
  });
});
