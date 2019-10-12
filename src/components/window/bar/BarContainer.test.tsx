import React from "react";
import { shallow } from "enzyme";

import { testContextData } from "../Context.test";
import { windowConfig, toolbarConfig } from "../../../config";
import { BarContainer, initState } from "./BarContainer";
import { findByTestAtrr } from "../../../../testingUtils";

let mockCheckForDoubleClick: jest.Mock;

const createWrapper = (ctxOverride: Partial<typeof testContextData> = {}) => {
  mockCheckForDoubleClick = jest.fn();
  const window = { ...testContextData, ...ctxOverride };
  const props = { window, checkForDoubleClick: mockCheckForDoubleClick };
  return shallow<BarContainer>(<BarContainer {...props} />);
};

const wrapper = createWrapper();

const getMouseEventData = (contains: boolean) => ({
  clientX: testContextData.left + testContextData.width / 2,
  clientY: testContextData.height + 10,
  target: {
    classList: {
      contains: () => contains
    }
  }
});

const mouseDownFalse = getMouseEventData(false);
const mouseDownTrue = getMouseEventData(true);

describe("WindowBarContainer Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "bar").length).toBe(1);
    });
  });

  describe("handleMouseDown", () => {
    it("should update state correctly ", () => {
      const { PIXELS_TO_LEAVE } = windowConfig;
      findByTestAtrr(wrapper, "bar").simulate("mousedown", mouseDownFalse);
      const barX: number = mouseDownFalse.clientX - testContextData.left;
      const barY: number = mouseDownFalse.clientY - testContextData.top;
      const minLeft: number = -testContextData.width + PIXELS_TO_LEAVE;
      const maxLeft: number = window.innerWidth - PIXELS_TO_LEAVE;
      const maxTop: number =
        window.innerHeight - PIXELS_TO_LEAVE - toolbarConfig.HEIGHT;

      const expectedState = { barX, barY, minLeft, maxLeft, maxTop };
      expect(wrapper.instance().state).toEqual(expectedState);
    });

    it("should NOT update state when is fullscreened", () => {
      const wrapper = createWrapper({ fullscreened: true });
      findByTestAtrr(wrapper, "bar").simulate("mousedown", mouseDownFalse);

      expect(wrapper.instance().state).toEqual(initState);
    });

    it("should NOT update state when clicked on action", () => {
      const wrapper = createWrapper();
      findByTestAtrr(wrapper, "bar").simulate("mousedown", mouseDownTrue);

      expect(wrapper.instance().state).toEqual(initState);
    });
  });

  describe("handleMouseMove", () => {
    const map: any = {};
    let wrapper: any;
    let mockSetContext: jest.Mock;

    window.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });

    beforeEach(() => {
      mockSetContext = jest.fn();
      wrapper = createWrapper({ setContext: mockSetContext });
    });

    it("should not be called when mouseDown did not occur", () => {
      map.mousemove({});
      expect(mockSetContext.mock.calls.length).toBe(0);
    });

    it("should be called when mouseDown occured", () => {
      findByTestAtrr(wrapper, "bar").simulate("mousedown", mouseDownFalse);
      map.mousemove({});

      expect(mockSetContext.mock.calls.length).toBe(1);
    });

    it("should send proper argument to mockMoveWindow", () => {
      findByTestAtrr(wrapper, "bar").simulate("mousedown", mouseDownFalse);
      let callCount = 0;

      const checkOutput = (moveX: number, moveY: number) => {
        const { state } = wrapper.instance();
        const { barX, barY, minLeft, maxLeft, maxTop } = state;
        const moveData = { clientX: moveX, clientY: moveY };

        map.mousemove(moveData);
        const expectedOutput = {
          left: Math.min(Math.max(moveData.clientX - barX, minLeft), maxLeft),
          top: Math.min(Math.max(moveData.clientY - barY, 0), maxTop)
        };
        expect(mockSetContext.mock.calls[callCount]).toEqual([expectedOutput]);
        callCount += 1;
      };

      checkOutput(100, 100);
      checkOutput(250, 200);
      checkOutput(-500, -500);
      checkOutput(2000, 2000);
    });
  });
});
