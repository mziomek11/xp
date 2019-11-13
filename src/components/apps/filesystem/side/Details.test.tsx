import React from "react";
import { shallow } from "enzyme";

import { Details } from "./Details";
import { findByTestAtrr } from "../../../../../testingUtils";

const createWrapper = (
  path: string[] = [],
  focused: string[] = [],
  files: Array<{ name: string; type: string }> = []
) => {
  const ctx = { path, focused, files } as any;
  return shallow<Details>(<Details filesystem={ctx} />);
};

const wrapper = createWrapper();

describe("Filesystem Side Details component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "container").length).toBe(1);
    });
  });

  describe("getFileInfo", () => {
    describe("focused length is equal 0", () => {
      it("should return Computer and System Folder", () => {
        const wrapper = createWrapper([], [], []);
        const expected = ["Computer", "System folder"];

        expect(wrapper.instance().getFileInfo()).toEqual(expected);
      });

      it("should return disk name and Local Disk", () => {
        const wrapper = createWrapper(["Local Disk (C:)"], [], []);
        const expected = ["Local Disk (C:)", "Local disk"];

        expect(wrapper.instance().getFileInfo()).toEqual(expected);
      });

      it("should return last path item and File folder", () => {
        const wrapper = createWrapper(["Local Disk (C:)", "test"], [], []);
        const expected = ["test", "File folder"];

        expect(wrapper.instance().getFileInfo()).toEqual(expected);
      });
    });

    describe("focused length is equal 1", () => {
      it("should render focused file and paragrapg from map", () => {
        const wrapper = createWrapper(
          [],
          ["focus"],
          [{ name: "focus", type: "folder" }]
        );

        const expected = ["focus", "File folder"];
        expect(wrapper.instance().getFileInfo()).toEqual(expected);
      });
    });

    describe("focused length is greater than 1", () => {
      it("should return empty string and focused text", () => {
        const wrapper = createWrapper([], ["1", "2", "3"], []);

        const expected = ["", "Selected elements: 3."];
        expect(wrapper.instance().getFileInfo()).toEqual(expected);
      });
    });
  });

  describe("mapFileTypeToParagraph", () => {
    it("should return Local disk", () => {
      const result = wrapper.instance().mapFileTypeToParagraph("disk");
      expect(result).toBe("Local disk");
    });

    it("should return File folder", () => {
      const result = wrapper.instance().mapFileTypeToParagraph("folder");
      expect(result).toBe("File folder");
    });

    it("should return Text document", () => {
      const result = wrapper.instance().mapFileTypeToParagraph("text");
      expect(result).toBe("Text document");
    });

    it("should return Image", () => {
      const result = wrapper.instance().mapFileTypeToParagraph("image");
      expect(result).toBe("Image");
    });

    it("should throw error", () => {
      expect(() => {
        wrapper.instance().mapFileTypeToParagraph("computer");
      }).toThrow();
    });
  });
});
