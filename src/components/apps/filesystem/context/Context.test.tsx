import React from "react";
import { shallow } from "enzyme";
import { deepCopy } from "../../../../utils";
import { findByTestAtrr } from "../../../../../testingUtils";

import { ContextProvider, Props, State } from "./Context";
import { listClass, containerClass } from "../classNames";
import { FileTree } from "../../../../store/filesystem/models";

let mockRemoveFn: jest.Mock;
let mockCopyFn: jest.Mock;
let mockCutFn: jest.Mock;
let mockPasteFn: jest.Mock;
let mockRenameFn: jest.Mock;

const fileTree: FileTree = {
  "Local Disk (C:)": {
    name: "Local Disk (C:)",
    type: "disk",
    content: {
      Folder1: {
        name: "Folder1",
        type: "folder",
        content: {}
      },
      aTextFile1: {
        name: "aTextFile1",
        type: "text",
        content: "adasdasd"
      }
    }
  }
};

const createWrapper = (
  overrideProps: Partial<Props> = {},
  children?: React.ReactNode
) => {
  mockRemoveFn = jest.fn();
  mockCopyFn = jest.fn();
  mockCutFn = jest.fn();
  mockPasteFn = jest.fn();
  mockRenameFn = jest.fn();

  const defaultProps: Props = {
    id: "id",
    fileTree: fileTree,
    copiedFiles: {},
    focusedWindow: null,
    remove: mockRemoveFn,
    copy: mockCopyFn,
    cut: mockCutFn,
    paste: mockPasteFn,
    renameWindow: mockRenameFn
  };

  const props = { ...defaultProps, ...overrideProps };
  return shallow<ContextProvider>(
    <ContextProvider {...props}>{children} </ContextProvider>
  );
};

let wrapper = createWrapper();

describe("Filesystem ContextProvider Component", () => {
  describe("componentDidMount", () => {
    it("should update state", () => {
      const { state } = wrapper.instance();
      expect(state).toEqual({
        ...state,
        path: [],
        files: [{ name: "Local Disk (C:)", type: "disk" }],
        history: [[]]
      });
    });
  });

  describe("componentDidUpdate", () => {
    let wrapper = createWrapper();
    let instance = wrapper.instance();

    beforeEach(() => {
      wrapper = createWrapper();
      instance = wrapper.instance();
    });

    describe("should NOT update state", () => {
      it("state and props did NOT change", () => {
        instance.setState({});
        instance.componentDidUpdate(instance.props, instance.state);
        expect(instance.state).toEqual(instance.state);
      });
    });

    describe("should update state", () => {
      it("path change", () => {
        const prevState = deepCopy<State>(instance.state);
        instance.setState({ path: ["Local Disk (C:)"], focused: ["focus"] });

        expect(instance.state).toEqual({
          ...prevState,
          path: ["Local Disk (C:)"],
          files: [
            { name: "Folder1", type: "folder" },
            { name: "aTextFile1", type: "text" }
          ],
          focused: []
        });
      });

      it("file name change", () => {
        const prevState = deepCopy<State>(instance.state);
        instance.setState({
          files: [{ name: "unknow", type: "folder" }],
          focused: ["focus"]
        });

        expect(instance.state).toEqual({
          ...prevState,
          files: [{ name: "Local Disk (C:)", type: "disk" }],
          focused: []
        });
      });

      it("focused window change", () => {
        const prevState = deepCopy<State>(instance.state);
        instance.setState({ focused: ["1", "2", "3"] });
        wrapper.setProps({ focusedWindow: "another focused window" });

        expect(instance.state).toEqual({ ...prevState, focused: [] });
      });
    });
  });

  describe("getSortedFiles", () => {
    it("should return files sorted by name", () => {
      wrapper.instance().setState({
        path: ["Local Disk (C:)"],
        options: { ...wrapper.instance().state.options, arrangeIconsBy: "name" }
      });

      expect(wrapper.instance().getSortedFiles()).toEqual([
        { name: "aTextFile1", type: "text" },
        { name: "Folder1", type: "folder" }
      ]);
    });

    it("should return files sorted by type", () => {
      wrapper.instance().setState({
        path: ["Local Disk (C:)"],
        options: { ...wrapper.instance().state.options, arrangeIconsBy: "type" }
      });

      expect(wrapper.instance().getSortedFiles()).toEqual([
        { name: "Folder1", type: "folder" },
        { name: "aTextFile1", type: "text" }
      ]);
    });
  });

  describe("calculateHistory", () => {
    beforeEach(() => {
      const newState = { history: [[], ["1"], ["1", "2"]], historyPosition: 2 };
      wrapper.instance().setState(newState);
    });

    it("should be same history", () => {
      const result = wrapper.instance().calculateHistory(0, []);
      expect(result).toEqual([[], ["1"], ["1", "2"]]);
    });

    it("should append history", () => {
      const result = wrapper.instance().calculateHistory(3, []);
      expect(result).toEqual([[], ["1"], ["1", "2"], []]);
    });

    it("should slice history", () => {
      const result = wrapper.instance().calculateHistory(2, ["3"]);
      expect(result).toEqual([[], ["1"], ["3"]]);
    });
  });

  describe("setWindowNameAndIcon", () => {
    it("path is greater than 1", () => {
      const wrapper = createWrapper();
      const path = ["a", "b"];

      wrapper.instance().setWindowNameAndIcon(path);
      expect(mockRenameFn.mock.calls.length).toBe(1);
      expect(mockRenameFn.mock.calls[0]).toEqual(["b", "folder"]);
    });

    it("path is equal 1", () => {
      const wrapper = createWrapper();
      const path = ["a"];

      wrapper.instance().setWindowNameAndIcon(path);
      expect(mockRenameFn.mock.calls.length).toBe(1);
      expect(mockRenameFn.mock.calls[0]).toEqual(["a", "disk"]);
    });

    it("path is equal 0", () => {
      const wrapper = createWrapper();
      const path: string[] = [];

      wrapper.instance().setWindowNameAndIcon(path);
      expect(mockRenameFn.mock.calls.length).toBe(1);
      expect(mockRenameFn.mock.calls[0]).toEqual(["Computer", "filesystem"]);
    });
  });

  describe("setOptions", () => {
    it("should only change given option", () => {
      const oldState = deepCopy<State>(wrapper.instance().state);
      wrapper.instance().setOptions({ showActionBar: false });

      const expectedState = {
        ...oldState,
        options: {
          ...oldState.options,
          showActionBar: false
        }
      };

      expect(wrapper.instance().state).toEqual(expectedState);
    });
  });

  describe("setRenamedFile", () => {
    it("should set to null", () => {
      wrapper.instance().setRenamedFile(true);
      expect(wrapper.instance().state.renamedFile).toBe(null);
    });

    it("should set to focused", () => {
      wrapper.instance().setState({ focused: ["Local Disk (C:)"] });
      wrapper.instance().setRenamedFile(false);
      expect(wrapper.instance().state.renamedFile).toBe("Local Disk (C:)");
    });
  });

  describe("clickIsUnfocusClick", () => {
    const getEvent = (expectedClass: string) => ({
      target: { classList: { contains: (c: string) => c === expectedClass } }
    });

    describe("should return false", () => {
      it("NOT contains container and list", () => {
        const event = getEvent("noclass") as any;

        expect(wrapper.instance().clickIsUnfocusClick(event)).toBe(false);
      });
    });

    describe("should return true", () => {
      it("contains container class", () => {
        const event = getEvent(containerClass) as any;

        expect(wrapper.instance().clickIsUnfocusClick(event)).toBe(true);
      });

      it("contains list class", () => {
        const event = getEvent(listClass) as any;

        expect(wrapper.instance().clickIsUnfocusClick(event)).toBe(true);
      });
    });
  });

  describe("getLocationOption", () => {
    it("should return proper name", () => {
      wrapper.instance().setState({ history: [["1"], ["1", "2"], ["1", "3"]] });

      const { name, onClick } = wrapper.instance().getLocationOption(1);
      expect(name).toEqual("2");
      expect(onClick).toBeTruthy();
    });

    it("should return Computer name", () => {
      wrapper.instance().setState({ history: [["1"], [], ["1", "3"]] });

      const { name } = wrapper.instance().getLocationOption(1);
      expect(name).toEqual("Computer");
    });
  });

  describe("handleKeyDown", () => {
    it("should return null", () => {
      wrapper.setProps({ id: "1", focusedWindow: "2" });
      const e = {
        preventDefault: () => {}
      };

      expect(wrapper.instance().handleKeyDown(e as any)).toBe(null);
    });
  });

  describe("canCutAndCopyAndDelete", () => {
    describe("returns true", () => {
      it("when path and focuses length > 0", () => {
        wrapper.setState({ path: ["Local Disk (C:)"] });
        wrapper.setState({ focused: ["Folder1"] });

        expect(wrapper.instance().canCutAndCopyAndDelete()).toBe(true);
      });
    });

    describe("returns false", () => {
      it("when path length is 0 ", () => {
        wrapper.setState({ path: [] });
        wrapper.setState({ focused: ["Folder1"] });

        expect(wrapper.instance().canCutAndCopyAndDelete()).toBe(false);
      });

      it("when focused length is 0 ", () => {
        wrapper.setState({ path: ["Local Disk (C:)"] });
        wrapper.setState({ focused: [] });

        expect(wrapper.instance().canCutAndCopyAndDelete()).toBe(false);
      });
    });
  });

  describe("onDelete", () => {
    it("should call remove", () => {
      wrapper = createWrapper();
      wrapper.instance().onDelete();

      expect(mockRemoveFn.mock.calls.length).toBe(1);
    });
  });

  describe("onCut", () => {
    it("should call cut", () => {
      wrapper = createWrapper();
      wrapper.instance().onCut();

      expect(mockCutFn.mock.calls.length).toBe(1);
    });
  });

  describe("onCopy", () => {
    it("should call copy", () => {
      wrapper = createWrapper();
      wrapper.instance().onCopy();

      expect(mockCopyFn.mock.calls.length).toBe(1);
    });
  });

  describe("onPaste", () => {
    it("should call paste", () => {
      wrapper = createWrapper();
      wrapper.instance().onPaste();

      expect(mockPasteFn.mock.calls.length).toBe(1);
    });
  });

  describe("canGoBack", () => {
    it("should return false", () => {
      wrapper.setState({ historyPosition: 0 });
      expect(wrapper.instance().canGoBack()).toBe(false);
    });

    it("should return true", () => {
      wrapper.setState({ historyPosition: 1 });
      expect(wrapper.instance().canGoBack()).toBe(true);
    });
  });

  describe("onBack", () => {
    it("should change state", () => {
      const startHistory = {
        history: [[], ["Local Disk (C:)"]],
        historyPosition: 1
      };
      wrapper.instance().setState({ path: ["Local Disk (C:)"] });
      wrapper.instance().setState(startHistory);

      wrapper.instance().onBack();
      const { path, historyPosition } = wrapper.instance().state;

      expect(path).toEqual([]);
      expect(historyPosition).toBe(0);
    });
  });

  describe("canGoForward", () => {
    it("should return false", () => {
      const startState = {
        history: [[], ["Local Disk (C:)"]],
        historyPosition: 1
      };
      wrapper.instance().setState(startState);
      expect(wrapper.instance().canGoForward()).toBe(false);
    });

    it("should return true", () => {
      const startState = {
        history: [[], ["Local Disk (C:)"]],
        historyPosition: 0
      };
      wrapper.instance().setState(startState);
      expect(wrapper.instance().canGoForward()).toBe(true);
    });
  });

  describe("onGoForward", () => {
    it("should change state", () => {
      const startHistory = {
        history: [[], ["Local Disk (C:)"]],
        historyPosition: 0
      };
      wrapper.instance().setState({ path: [], ...startHistory });
      wrapper.instance().onForward();
      const { path, historyPosition } = wrapper.instance().state;

      expect(path).toEqual(["Local Disk (C:)"]);
      expect(historyPosition).toBe(1);
    });
  });

  describe("onSelectAll", () => {
    const allFocused = ["Folder1", "aTextFile1"];

    it("should select all when nothing is focused", () => {
      wrapper.instance().setState({ path: ["Local Disk (C:)"] });
      wrapper.instance().setFocused([]);

      wrapper.instance().onSelectAll();
      expect(wrapper.instance().state.focused).toEqual(allFocused);
    });

    it("should select all when one is focused", () => {
      wrapper.instance().setState({ path: ["Local Disk (C:)"] });
      wrapper.instance().setFocused(["Folder1"]);

      wrapper.instance().onSelectAll();
      expect(wrapper.instance().state.focused).toEqual(allFocused);
    });
  });

  describe("canGoUp", () => {
    it("should return false", () => {
      wrapper.instance().setState({ path: [] });
      expect(wrapper.instance().canGoUp()).toBe(false);
    });

    it("should return true", () => {
      wrapper.instance().setState({ path: ["Local Disk (C:)"] });
      expect(wrapper.instance().canGoUp()).toBe(true);
    });
  });

  describe("onGoUp", () => {
    it("should change state", () => {
      const startState = { path: ["Local Disk (C:)"], historyPosition: 1 };
      wrapper.instance().setState(startState);
      wrapper.instance().onGoUp();

      const { path, historyPosition } = wrapper.instance().state;
      expect(path).toEqual([]);
      expect(historyPosition).toBe(2);
    });
  });

  describe("render", () => {
    const wrapper = createWrapper({}, <p data-test="p" />);

    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "context").length).toBe(1);
    });

    it("should render children", () => {
      expect(findByTestAtrr(wrapper, "p").length).toBe(1);
    });
  });
});
