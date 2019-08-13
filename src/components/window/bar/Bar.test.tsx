import React from "react";
import { shallow } from "enzyme";
import { Bar, pixelsToLeave } from "./";
import { findByTestAtrr } from "../../../utils/testing";

describe("WindowBar Component", () => {
  const barProps = {
    id: "abc",
    name: "Program",
    lastWindowX: 100,
    lastWindowY: 100,
    windowWidth: 100,
    windowHeight: 150,
    isFullScreened: false
  };
  let mockMoveWindow = jest.fn();
  let comp = <Bar {...barProps} moveWindow={mockMoveWindow} />;
  let wrapper = shallow<Bar>(comp);

  const mouseDownEventData = {
    clientX: 150,
    clientY: 110,
    target: {
      classList: {
        contains: () => false
      }
    }
  };

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
    const initState = {
      barX: 0,
      barY: 0,
      minLeft: 0,
      maxLeft: 0,
      maxTop: 0
    };

    it("should update state correctly ", () => {
      findByTestAtrr(wrapper, "bar").simulate("mousedown", mouseDownEventData);
      const expectedState = {
        barX: mouseDownEventData.clientX - barProps.lastWindowX,
        barY: mouseDownEventData.clientY - barProps.lastWindowY,
        minLeft: -barProps.windowWidth + pixelsToLeave,
        maxLeft: window.innerWidth - pixelsToLeave,
        maxTop: window.innerHeight - pixelsToLeave
      };

      expect(wrapper.instance().state).toEqual(expectedState);
    });

    it("should NOT update state when is fullscreened", () => {
      const fullScrProps = { ...barProps, isFullScreened: true };
      const fullScrComp = <Bar {...fullScrProps} moveWindow={() => {}} />;
      const fullScrWrapper = shallow(fullScrComp);

      findByTestAtrr(fullScrWrapper, "bar").simulate(
        "mousedown",
        mouseDownEventData
      );

      expect(fullScrWrapper.instance().state).toEqual(initState);
    });

    it("should NOT update state when clicked on action", () => {
      wrapper = shallow<Bar>(comp);
      findByTestAtrr(wrapper, "bar").simulate("mousedown", {
        ...mouseDownEventData,
        target: {
          classList: {
            contains: () => true
          }
        }
      });

      expect(wrapper.instance().state).toEqual(initState);
    });
  });

  describe("handleMouseMove", () => {
    const map: any = {};
    window.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });

    beforeEach(() => {
      mockMoveWindow = jest.fn();
      comp = <Bar {...barProps} moveWindow={mockMoveWindow} />;
      wrapper = shallow<Bar>(comp);
    });

    it("should not be called when mouseDown did not occur", () => {
      map.mousemove({});
      expect(mockMoveWindow.mock.calls.length).toBe(0);
    });

    it("should be called when mouseDown occured", () => {
      findByTestAtrr(wrapper, "bar").simulate("mousedown", mouseDownEventData);
      map.mousemove({});

      expect(mockMoveWindow.mock.calls.length).toBe(1);
    });

    it("should send proper argument to mockMoveWindow", () => {
      const evData = {
        clientX: 100,
        clientY: 100,
        target: mouseDownEventData.target
      };
      findByTestAtrr(wrapper, "bar").simulate("mousedown", evData);

      map.mousemove({ clientX: 100, clientY: 100 });
      let expectedOutput: [number, number] = [100, 100];
      expect(mockMoveWindow.mock.calls[0]).toEqual(expectedOutput);

      map.mousemove({ clientX: 250, clientY: 200 });
      expectedOutput = [250, 200];
      expect(mockMoveWindow.mock.calls[1]).toEqual(expectedOutput);

      map.mousemove({ clientX: -500, clientY: -500 });
      expectedOutput = [-barProps.windowWidth + pixelsToLeave, 0];
      expect(mockMoveWindow.mock.calls[2]).toEqual(expectedOutput);

      map.mousemove({ clientX: 2000, clientY: 2000 });
      expectedOutput = [
        window.innerWidth - pixelsToLeave,
        window.innerHeight - pixelsToLeave
      ];
      expect(mockMoveWindow.mock.calls[3]).toEqual(expectedOutput);
    });
  });
});
