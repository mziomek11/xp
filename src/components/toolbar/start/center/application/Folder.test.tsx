import React from "react";
import { shallow } from "enzyme";

import FolderApplication, { userPath } from "./Folder";
import { findByTestAtrr } from "../../../../../../testingUtils";

const createWrapper = (name: string = "a", isInDocuments: boolean = false) => {
  const props = { image: "img", name, isInDocuments };
  return shallow(<FolderApplication {...props} />);
};

const wrapper = createWrapper();

describe("StartFolderApplication Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "app").length).toBe(1);
    });

    it("should have path without with 'My documents'", () => {
      const wrapper = createWrapper("folder", false);
      const openData = findByTestAtrr(wrapper, "app").prop("openData");
      expect((openData as any).path).toEqual([...userPath, "folder"]);
    });

    it("should have path with 'My documents'", () => {
      const wrapper = createWrapper("folder", true);
      const openData = findByTestAtrr(wrapper, "app").prop("openData");
      expect((openData as any).path).toEqual([
        ...userPath,
        "My documents",
        "folder"
      ]);
    });
  });
});
