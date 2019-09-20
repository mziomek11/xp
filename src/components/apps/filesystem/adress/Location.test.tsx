import React from "react";
import { shallow } from "enzyme";

import { Location } from "./Location";
import { findByTestAtrr } from "../../../../../testingUtils";

const fileTree = {
  "C:": {
    content: {
      Folder1: {
        content: { SubFolder1: {} }
      },
      Folder2: {}
    }
  }
} as any;

let mockSetPathFn: jest.Mock;
const createWrapper = (path: string[] = [], historyPosition: number = 0) => {
  mockSetPathFn = jest.fn();
  const context = { setPath: mockSetPathFn, path, historyPosition } as any;

  return shallow<Location>(<Location context={context} fileTree={fileTree} />);
};

const wrapper = createWrapper();

describe("Filesystem Adress Location Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "location").length).toBe(1);
    });

    it("should render icon container", () => {
      expect(findByTestAtrr(wrapper, "icon-container").length).toBe(1);
    });

    it("should render icon", () => {
      expect(findByTestAtrr(wrapper, "icon").length).toBe(1);
    });

    it("should render LocationInput component", () => {
      expect(findByTestAtrr(wrapper, "input").length).toBe(1);
    });

    it("should render LocationController component", () => {
      expect(findByTestAtrr(wrapper, "controller").length).toBe(1);
    });

    it("should render GoButton component", () => {
      expect(findByTestAtrr(wrapper, "go-button").length).toBe(1);
    });
  });

  describe("changePathToLocationText", () => {
    describe("should change state", () => {
      it("to Computer", () => {
        const wrapper = createWrapper([]);
        wrapper.instance().setState({ text: "Computer\\sdfsdfsdfsdf" });

        wrapper.instance().changePathToLocationText();
        expect(wrapper.instance().state.text).toBe("Computer");
      });
    });

    describe("should call setPath", () => {
      it("changes to path before", () => {
        const wrapper = createWrapper(["C:", "Folder1"], 1);
        wrapper.instance().setState({ text: "C:" });
        wrapper.instance().changePathToLocationText();

        expect(mockSetPathFn.mock.calls.length).toBe(1);
        expect(mockSetPathFn.mock.calls[0]).toEqual([["C:"], 2]);
      });

      it("changes to path after", () => {
        const wrapper = createWrapper(["C:"], 1);
        wrapper.instance().setState({ text: "C:\\Folder1" });
        wrapper.instance().changePathToLocationText();

        expect(mockSetPathFn.mock.calls.length).toBe(1);
        expect(mockSetPathFn.mock.calls[0]).toEqual([["C:", "Folder1"], 2]);
      });
    });
  });

  describe("handleInputChange", () => {
    it("should change state", () => {
      const changedText = "new text";
      const changeEv = { target: { value: changedText } };
      wrapper.instance().setState({ text: "initial" });
      wrapper.instance().handleInputChange(changeEv as any);

      expect(wrapper.instance().state.text).toBe(changedText);
    });
  });
});
