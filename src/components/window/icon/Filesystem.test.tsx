import React from "react";
import { shallow } from "enzyme";

import { FilesystemIcon } from "./Filesystem";
import { findByTestAtrr } from "../../../../testingUtils";
import { getIcon } from "../../../icons";

let wrapper = shallow(<FilesystemIcon context={{ path: [] } as any} />);

describe("Window Filesystem Icon Component", () => {
  describe("render", () => {
    it("should render without without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "icon").length).toBe(1);
    });
  });

  describe("icon source", () => {
    it("path length is 0", () => {
      const context = { path: [] } as any;
      wrapper = shallow(<FilesystemIcon context={context} />);

      const iconSrc = findByTestAtrr(wrapper, "icon").prop("src");
      expect(iconSrc).toBe(getIcon("computer", false));
    });

    it("path length is 1", () => {
      const context = { path: ["a"] } as any;
      wrapper = shallow(<FilesystemIcon context={context} />);

      const iconSrc = findByTestAtrr(wrapper, "icon").prop("src");
      expect(iconSrc).toBe(getIcon("disk", false));
    });

    it("path length is > 1", () => {
      const context = { path: ["a", ["a"]] } as any;
      wrapper = shallow(<FilesystemIcon context={context} />);

      const iconSrc = findByTestAtrr(wrapper, "icon").prop("src");
      expect(iconSrc).toBe(getIcon("folder", false));
    });
  });
});
