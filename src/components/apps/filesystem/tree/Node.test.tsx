import React from "react";
import { shallow } from "enzyme";

import Node from "./Node";
import { FileType, FileTree } from "../../../../store/filesystem/models";
import { findByTestAtrr } from "../../../../../testingUtils";

let mockOnClickFn: jest.Mock;
const createWrapper = (
  filePath: string[] = [],
  selectedPath: string[] | null = [],
  withToggler: boolean = false,
  type: FileType = "folder",
  content: FileTree = {}
) => {
  mockOnClickFn = jest.fn();
  const props = {
    icon: "icon src",
    name: "name",
    onClick: mockOnClickFn,
    filePath,
    selectedPath,
    type,
    withToggler,
    content
  };

  return shallow<Node>(<Node {...props} />);
};

const wrapper = createWrapper();

describe("Filesystem Node Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "container").length).toBe(1);
    });

    it("should render toggler", () => {
      const wrapper = createWrapper([], [], true);
      expect(findByTestAtrr(wrapper, "toggler").length).toBe(1);
    });

    it("should NOT render toggler", () => {
      const wrapper = createWrapper([], [], false);
      expect(findByTestAtrr(wrapper, "toggler").length).toBe(0);
    });

    it("should render icon", () => {
      const icon = findByTestAtrr(wrapper, "icon");

      expect(icon.length).toBe(1);
      expect(icon.prop("src")).toBe("icon src");
    });

    it("should render list and nodes", () => {
      const wrapper = createWrapper([], [], true, "folder", {
        Folder: {
          name: "Folder",
          type: "folder",
          content: {}
        }
      });
      wrapper.instance().setState({ open: true });
      expect(findByTestAtrr(wrapper, "list").length).toBe(1);
      expect(findByTestAtrr(wrapper, "node").length).toBe(1);
    });

    it("should NOT render list", () => {
      wrapper.instance().setState({ open: false });
      expect(findByTestAtrr(wrapper, "list").length).toBe(0);
    });
  });

  describe("isOpenAtStart", () => {
    describe("should return true", () => {
      it("is part of selected path", () => {
        const wrapper = createWrapper(["1", "2", "3"], ["1", "2", "3", "4"]);

        expect(wrapper.instance().isOpenAtStart()).toBe(true);
      });
    });

    describe("should return false", () => {
      it("selectedPath is null", () => {
        const wrapper = createWrapper([], null);

        expect(wrapper.instance().isOpenAtStart()).toBe(false);
      });

      it("is not part of selected path", () => {
        const wrapper = createWrapper(["1", "2", "x"], ["1", "2", "3", "4"]);

        expect(wrapper.instance().isOpenAtStart()).toBe(false);
      });
    });
  });

  describe("shouldShowList", () => {
    describe("return true", () => {
      it("has proper type and has content", () => {
        const wrapper = createWrapper([], [], true, "folder", {
          Folder: { name: "Folder", type: "folder", content: {} }
        });

        expect(wrapper.instance().shouldShowList()).toBe(true);
      });
    });

    describe("return false", () => {
      it("has NOT proper type", () => {
        const wrapper = createWrapper([], [], true, "text", {
          Folder: { name: "Folder", type: "folder", content: {} }
        });

        expect(wrapper.instance().shouldShowList()).toBe(false);
      });

      it("has NOT content", () => {
        const wrapper = createWrapper([], [], true, "folder", {});

        expect(wrapper.instance().shouldShowList()).toBe(false);
      });
    });
  });

  describe("isSelected", () => {
    describe("return true", () => {
      it("selectedPath and path are equal", () => {
        const wrapper = createWrapper(["1", "2"], ["1", "2"]);

        expect(wrapper.instance().isSelected()).toBe(true);
      });
    });

    describe("return false", () => {
      it("selectedPath is null", () => {
        const wrapper = createWrapper([], null);

        expect(wrapper.instance().isSelected()).toBe(false);
      });

      it("selectedPath and filePath are notEqual", () => {
        const wrapper = createWrapper(["1", "2"], ["1"]);

        expect(wrapper.instance().isSelected()).toBe(false);
      });
    });
  });

  describe("handleTogglerClick", () => {
    it("should toggle isOpen", () => {
      wrapper.instance().setState({ open: true });

      wrapper.instance().handleTogglerClick();
      expect(wrapper.instance().state.open).toBe(false);

      wrapper.instance().handleTogglerClick();
      expect(wrapper.instance().state.open).toBe(true);
    });
  });

  describe("handleNameContainerClick", () => {
    it("should change state", () => {
      wrapper.instance().setState({ open: false });
      wrapper.instance().handleNameContainerClick();

      expect(wrapper.instance().state.open).toBe(true);
    });

    it("should call onClick", () => {
      const wrapper = createWrapper([], ["1", "2"]);
      wrapper.instance().handleNameContainerClick();

      expect(mockOnClickFn.mock.calls.length).toBe(1);
      expect(mockOnClickFn.mock.calls[0]).toEqual([[]]);
    });

    it("should NOT call onClick", () => {
      const wrapper = createWrapper(["1", "2"], ["1", "2"]);
      wrapper.instance().handleNameContainerClick();

      expect(mockOnClickFn.mock.calls.length).toBe(0);
    });
  });
});
