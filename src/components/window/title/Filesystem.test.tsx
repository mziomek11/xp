import React from "react";
import { shallow } from "enzyme";

import { FilesystemTitle } from "./Filesystem";
import { findByTestAtrr } from "../../../../testingUtils";

describe("Window Filesystem Title Component", () => {
  describe("render", () => {
    it("should return title with Computer text", () => {
      const context = { path: [] } as any;
      const wrapper = shallow(<FilesystemTitle context={context} />);
      const title = findByTestAtrr(wrapper, "title");

      expect(title.length).toBe(1);
      expect(title.prop("text")).toBe("Computer");
    });

    it("should render icon", () => {
      const context = { path: ["a", "b", "c"] } as any;
      const wrapper = shallow(<FilesystemTitle context={context} />);
      const title = findByTestAtrr(wrapper, "title");

      expect(title.length).toBe(1);
      expect(title.prop("text")).toBe("c");
    });
  });
});
