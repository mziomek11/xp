import React from "react";
import { shallow } from "enzyme";

import { FileSystem } from "./FileSystem";
import { findByTestAtrr } from "../../../../testingUtils";

const createWrapper = (showFolders: boolean = false) => {
  const context = { options: { showFolders } } as any;
  return shallow(<FileSystem filesystem={context} />);
};

const wrapper = createWrapper();

describe("FileSystem Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "filesystem").length).toBe(1);
    });

    it("should render menu", () => {
      expect(findByTestAtrr(wrapper, "menu-container").length).toBe(1);
      expect(findByTestAtrr(wrapper, "menu").length).toBe(1);
      expect(findByTestAtrr(wrapper, "menu-logo").length).toBe(1);
    });

    it("should render adress bar", () => {
      expect(findByTestAtrr(wrapper, "adress-bar").length).toBe(1);
    });

    it("should render action bar", () => {
      expect(findByTestAtrr(wrapper, "action-bar").length).toBe(1);
    });

    it("should render file list", () => {
      expect(findByTestAtrr(wrapper, "file-list").length).toBe(1);
    });

    it("sholde render Folders component", () => {
      const wrapper = createWrapper(true);

      expect(findByTestAtrr(wrapper, "folders").length).toBe(1);
      expect(findByTestAtrr(wrapper, "side-bar").length).toBe(0);
    });

    it("should render SideBar component", () => {
      const wrapper = createWrapper(false);

      expect(findByTestAtrr(wrapper, "folders").length).toBe(0);
      expect(findByTestAtrr(wrapper, "side-bar").length).toBe(1);
    });
  });
});
