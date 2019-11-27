import React from "react";
import { shallow } from "enzyme";

import { Location, Props } from "./Location";
import { findByTestAtrr } from "../../../testingUtils";

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
const createWrapper = (overrideProps: Partial<Props> = {}) => {
  mockSetPathFn = jest.fn();
  const props = {
    setPath: mockSetPathFn,
    path: [],
    historyPosition: 0,
    fileTree,
    ...overrideProps
  };

  return shallow<Location>(<Location {...props} />);
};

const wrapper = createWrapper();
const instance = wrapper.instance();

describe("Location Component", () => {
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

    it("should render LocationController component", () => {
      expect(findByTestAtrr(wrapper, "controller").length).toBe(1);
    });

    it("should render GoButton component", () => {
      const wrapper = createWrapper({ withGoButton: true });
      expect(findByTestAtrr(wrapper, "go-button").length).toBe(1);
    });

    it("should NOT render GoButton component", () => {
      const wrapper = createWrapper({ withGoButton: false });
      expect(findByTestAtrr(wrapper, "go-button").length).toBe(0);
    });

    describe("editable", () => {
      const wrapper = createWrapper({ editable: true });
      it("should render LocationInput component", () => {
        expect(findByTestAtrr(wrapper, "input").length).toBe(1);
      });

      it("should NOT render input text", () => {
        expect(findByTestAtrr(wrapper, "text").length).toBe(0);
      });
    });

    describe("not editable", () => {
      const wrapper = createWrapper({ editable: false });
      it("should NOT render LocationInput component", () => {
        expect(findByTestAtrr(wrapper, "input").length).toBe(0);
      });

      it("should render input text", () => {
        expect(findByTestAtrr(wrapper, "text").length).toBe(1);
      });
    });
  });

  describe("handleContainerClick", () => {
    it("should change open to false", () => {
      instance.setState({ open: true });
      instance.handleContainerClick();

      expect(instance.state.open).toBe(false);
    });

    it("should change open and isClickOpening to true", () => {
      instance.setState({ open: false, isClickOpening: false });
      instance.handleContainerClick();

      expect(instance.state.open).toBe(true);
      expect(instance.state.isClickOpening).toBe(true);
    });
  });

  describe("handleWindowClick", () => {
    it("should change isClickOpening to false", () => {
      instance.setState({ isClickOpening: true });
      instance.handleWindowClick();

      expect(instance.state.isClickOpening).toBe(false);
    });

    it("should change open to false", () => {
      instance.setState({ isClickOpening: false, open: true });
      instance.handleWindowClick();

      expect(instance.state.open).toBe(false);
    });
  });

  describe("closeList", () => {
    it("should change open to false", () => {
      instance.setState({ open: true });
      instance.closeList();

      expect(instance.state.open).toBe(false);
    });
  });

  describe("changePathToLocationText", () => {
    describe("should change state", () => {
      it("to My computer", () => {
        const wrapper = createWrapper({ path: [] });
        wrapper.instance().setState({ text: "My computer\\sdfsdfsdfsdf" });

        wrapper.instance().changePathToLocationText();
        expect(wrapper.instance().state.text).toBe("My computer");
      });
    });

    describe("should call setPath", () => {
      it("changes to path before", () => {
        const props = { path: ["C:", "Folder1"], historyPosition: 1 };
        const wrapper = createWrapper(props);
        wrapper.instance().setState({ text: "C:" });
        wrapper.instance().changePathToLocationText();

        expect(mockSetPathFn.mock.calls.length).toBe(1);
        expect(mockSetPathFn.mock.calls[0]).toEqual([["C:"], 2]);
      });

      it("changes to path after", () => {
        const wrapper = createWrapper({ path: ["C:"], historyPosition: 1 });
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
