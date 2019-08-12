import React from "react";
import { shallow } from "enzyme";
import { Bar } from "./";
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
      const evData = { clientX: 150, clientY: 110 };
      findByTestAtrr(wrapper, "bar").simulate("mousedown", evData);

      const { barX, barY, maxBarX, maxBarY } = wrapper.instance().state;
      expect(barX).toBe(evData.clientX - barProps.lastWindowX);
      expect(barY).toBe(evData.clientY - barProps.lastWindowY);
      expect(maxBarX).toBe(window.innerWidth - barProps.windowWidth);
      expect(maxBarY).toBe(window.innerHeight - barProps.windowHeight);
    });

    it("should not update state when is fullscreened", () => {
      const fullScrProps = { ...barProps, isFullScreened: true };
      const fullScrComp = <Bar {...fullScrProps} moveWindow={() => {}} />;
      const fullScrWrapper = shallow(fullScrComp);

      const evData = { clientX: 150, clientY: 110 };
      findByTestAtrr(fullScrWrapper, "bar").simulate("mousedown", evData);

      expect(fullScrWrapper.instance().state).toEqual({
        barX: 0,
        barY: 0,
        maxBarX: 0,
        maxBarY: 0
      });
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
      const evData = { clientX: 150, clientY: 110 };
      findByTestAtrr(wrapper, "bar").simulate("mousedown", evData);
      map.mousemove({});

      expect(mockMoveWindow.mock.calls.length).toBe(1);
    });

    it("should send proper argument to mockMoveWindow", () => {
      let evData = { clientX: 100, clientY: 100 };
      findByTestAtrr(wrapper, "bar").simulate("mousedown", evData);

      map.mousemove({ clientX: 100, clientY: 100 });
      expect(mockMoveWindow.mock.calls[0]).toEqual([100, 100]);

      map.mousemove({ clientX: 250, clientY: 200 });
      expect(mockMoveWindow.mock.calls[1]).toEqual([250, 200]);

      map.mousemove({ clientX: -500, clientY: -500 });
      expect(mockMoveWindow.mock.calls[2]).toEqual([0, 0]);

      map.mousemove({ clientX: 2000, clientY: 2000 });
      expect(mockMoveWindow.mock.calls[3]).toEqual([
        1024 - barProps.windowWidth,
        768 - barProps.windowHeight
      ]);
    });
  });
});
