import React from "react";
import { shallow } from "enzyme";

import FileList from "./List";
import { findByTestAtrr } from "../../../testingUtils";

const comp = <FileList />;
const wrapper = shallow(comp);

describe("FileList Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "file-list").length).toBe(1);
    });

    it("should render computer", () => {
      expect(findByTestAtrr(wrapper, "computer").length).toBe(1);
    });

    it("should render notepad", () => {
      expect(findByTestAtrr(wrapper, "notepad").length).toBe(1);
    });

    it("should render paint", () => {
      expect(findByTestAtrr(wrapper, "paint").length).toBe(1);
    });
  });
});
