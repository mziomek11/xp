import React from "react";
import { shallow, mount } from "enzyme";

import IconView from "./IconView";
import ThumbnailView from "./ThumbnailView";
import ListView from "./ListView";
import TileView from "./TileView";
import { findByTestAtrr } from "../../../../../../testingUtils";

type View = "Icon" | "Thumbnail" | "List" | "Tile";

let mockOnClickFn: jest.Mock;
const iconName = "iconname";
const fileName = "filename";

const createWrapper = (renaming: boolean, view: View) => {
  mockOnClickFn = jest.fn();
  const props = {
    containerClass: "classnmae",
    getElementClass: jest.fn(),
    onClick: mockOnClickFn,
    icon: iconName,
    name: fileName,
    renaming
  };

  switch (view) {
    case "Icon":
      return shallow(<IconView {...props} />);
    case "List":
      return shallow(<ListView {...props} />);
    case "Thumbnail":
      return shallow(<ThumbnailView {...props} />);
    case "Tile":
      return shallow(<TileView {...props} />);
    default:
      throw Error("Unknown View Type");
  }
};

const testView = (view: View) => {
  const wrapper = createWrapper(false, view);

  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "container").length).toBe(1);
    });

    it("should render icon", () => {
      const icon = findByTestAtrr(wrapper, "icon");

      expect(icon.length).toBe(1);
      expect(icon.prop("src")).toBe(iconName);
    });

    it("should render Renamer component", () => {
      const wrapper = createWrapper(true, view);
      const renamer = findByTestAtrr(wrapper, "renamer");

      expect(renamer.length).toBe(1);
      expect(renamer.prop("startText")).toBe(fileName);
      expect(findByTestAtrr(wrapper, "text").length).toBe(0);
    });

    it("should render text", () => {
      const wrapper = createWrapper(false, view);
      const text = findByTestAtrr(wrapper, "text");

      expect(text.length).toBe(1);
      expect(text.text()).toBe(fileName);
      expect(findByTestAtrr(wrapper, "renamer").length).toBe(0);
    });
  });

  describe("onClick", () => {
    it("should call mock once", () => {
      const wrapper = createWrapper(false, view);
      findByTestAtrr(wrapper, "clickable").simulate("click");

      expect(mockOnClickFn.mock.calls.length).toBe(1);
    });
  });
};

describe("Filesystem FileView Component", () => {
  describe("IconView", () => {
    testView("Icon");
  });

  describe("ListView", () => {
    testView("List");
  });

  describe("ThumbnailView", () => {
    testView("Thumbnail");
  });

  describe("TileView", () => {
    testView("Tile");
  });
});
