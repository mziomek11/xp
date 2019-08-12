import React from "react";
import { shallow } from "enzyme";

import { File } from "./";
import { findByTestAtrr } from "../../utils/testing";

describe("File Component", () => {
  const comp = <File name="MyFile" left={20} top={40} />;
  const wrapper = shallow<File>(comp);

  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "file").length).toBe(1);
    });

    it("should render filename", () => {
      expect(findByTestAtrr(wrapper, "filename").length).toBe(1);
    });
  });

  describe("props", () => {
    it("should apply styles", () => {
      expect(findByTestAtrr(wrapper, "file").prop("style")).toEqual({
        left: 20,
        top: 40
      });
    });
  });
});
