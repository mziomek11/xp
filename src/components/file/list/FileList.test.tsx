import React from "react";
import { shallow } from "enzyme";
import { FileList } from "./";
import { findByTestAtrr } from "../../../utils/testing";

describe("FileList Component", () => {
  const comp = <FileList openWindow={() => {}} />;
  const wrapper = shallow(comp);

  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "file-list").length).toBe(1);
    });

    it("should render files", () => {
      expect(findByTestAtrr(wrapper, "file").length).toBe(4);
    });
  });
});
