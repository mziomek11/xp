import React from "react";
import { shallow } from "enzyme";

import { WindowById, Window } from "../../../../store/window/models";
import { ApplicationsListContainer as ListContainer } from "./ListContainer";
import { toolbarConfig } from "../../../../config";
import { findByTestAtrr } from "../../../../../testingUtils";
import { deepCopy } from "../../../../utils";
import { Application } from "../../../../store/models";

const { APP_WIDTH, START_WIDTH, TIME_WIDTH } = toolbarConfig;
const createWindow = (id: string, app: string): Window => ({
  name: "Window name",
  minimalized: false,
  application: app as Application,
  id
});

const windowById: WindowById = {
  A4W1: createWindow("A4W1", "A4"),
  A1W1: createWindow("A1W1", "A1"),
  A1W2: createWindow("A1W2", "A1"),
  A1W3: createWindow("A1W3", "A1"),
  A1W4: createWindow("A1W4", "A1"),
  A2W1: createWindow("A2W1", "A2"),
  A2W2: createWindow("A2W2", "A2"),
  A2W3: createWindow("A2W3", "A2"),
  A3W1: createWindow("A3W1", "A3"),
  A3W2: createWindow("A3W2", "A3")
};
const openWindowCount = Object.keys(windowById).length;

const appNamesWithIds = {
  A1: ["A1W1", "A1W2", "A1W3", "A1W4"],
  A2: ["A2W1", "A2W2", "A2W3"],
  A3: ["A3W1", "A3W2"],
  A4: ["A4W1"]
};

const props = { openWindowCount, windowById };
const wrapper = shallow<ListContainer>(<ListContainer {...props} />);
const instance = wrapper.instance();

describe("ToolbarApplicationListContainer Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "list").length).toBe(1);
    });
  });

  describe("shouldComponentUpdate", () => {
    it("should return true when openWindowCount changes", () => {
      const result = instance.shouldComponentUpdate(
        { ...props, openWindowCount: openWindowCount + 1 },
        instance.state
      );

      expect(result).toBe(true);
    });

    it("should return true when maxAppsWithDefaultWidth changes", () => {
      const result = instance.shouldComponentUpdate(props, {
        ...instance.state,
        maxAppsWithDefaultWidth: instance.state.maxAppsWithDefaultWidth - 1
      });

      expect(result).toBe(true);
    });

    it("should return false when windowById changes", () => {
      const result = instance.shouldComponentUpdate(
        { ...props, windowById: {} },
        instance.state
      );

      expect(result).toBe(false);
    });

    it("should return false when spaceForApps changes", () => {
      const result = instance.shouldComponentUpdate(props, {
        ...instance.state,
        spaceForApps: instance.state.spaceForApps - 1
      });

      expect(result).toBe(false);
    });
  });

  describe("handleWindowResize", () => {
    it("should update state correctly", () => {
      const expectedSpaceForApps = window.innerWidth - TIME_WIDTH - START_WIDTH;
      const expectedState = {
        maxAppsWithDefaultWidth: Math.floor(expectedSpaceForApps / APP_WIDTH),
        spaceForApps: expectedSpaceForApps
      };

      instance.handleWindowResize();
      expect(instance.state).toEqual(expectedState);
    });
  });

  describe("calculateAppsOver", () => {
    it("should return correct value", () => {
      const { props, state } = instance;
      const result = instance.calculateAppsOver();
      const expectRes = props.openWindowCount - state.maxAppsWithDefaultWidth;

      expect(result).toBe(expectRes);
    });
  });

  describe("getAppsNamesWithIds", () => {
    it("should return correct value", () => {
      const result = instance.getAppsNamesWithIds();
      const expectedResult = appNamesWithIds;

      expect(result).toEqual(expectedResult);
    });
  });

  describe("divideAppsIntoSingleAndMultiple", () => {
    const { A1, A2, A3, A4 } = appNamesWithIds;

    it("should return proper value with one over", () => {
      const expectedSingles = [...A2, ...A3, ...A4];
      const expectedMulti = { A1: [...A1] };
      const expectedOver = 1 - A1.length + 1;

      const expectedResult = [expectedSingles, expectedMulti, expectedOver];
      const result = instance.divideAppsIntoSingleAndMultiple(
        1,
        deepCopy(appNamesWithIds)
      );

      expect(result).toEqual(expectedResult);
    });

    it("should return proper value with five over", () => {
      const expectedSingles = [...A3, ...A4];
      const expectedMulti = { A1: [...A1], A2: [...A2] };
      const expectedOver = 5 - A1.length - A2.length + 2;

      const expectedResult = [expectedSingles, expectedMulti, expectedOver];
      const result = instance.divideAppsIntoSingleAndMultiple(
        5,
        deepCopy(appNamesWithIds)
      );

      expect(result).toEqual(expectedResult);
    });
  });

  describe("sortAppsByOpenedWindows", () => {
    it("should return sorted by ids length array of apps", () => {
      const result = instance.sortAppsByOpenedWindows(appNamesWithIds);
      const expectedResult = ["A1", "A2", "A3", "A4"];

      expect(result).toEqual(expectedResult);
    });
  });

  describe("calculateAppWidth", () => {
    it("should return default app width", () => {
      const result = instance.calculateAppWidth(false, [], {});

      expect(result).toBe(toolbarConfig.APP_WIDTH);
    });

    it("should return average width", () => {
      const singlesArray = Array.from(new Array(20), (x, i) => i.toString());
      const multiplies = { AppName: ["Window1", "Window2"] };
      const sumLength = singlesArray.length + Object.keys(multiplies).length;

      const result = instance.calculateAppWidth(true, singlesArray, multiplies);
      const expectedResult = instance.state.spaceForApps / sumLength;

      expect(result).toBe(expectedResult);
    });
  });
});
