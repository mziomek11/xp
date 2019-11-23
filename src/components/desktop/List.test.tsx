import React from "react";
import { shallow } from "enzyme";

import FileList from "./List";
import { findByTestAtrr } from "../../../testingUtils";

const comp = <FileList />;
const wrapper = shallow(comp);

describe("FileList Component", () => {
  describe("render", () => {
    const testRender = (testName: string) => {
      it(`should render ${testName}`, () => {
        expect(findByTestAtrr(wrapper, testName).length).toBe(1);
      });
    };

    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "file-list").length).toBe(1);
    });

    const filesToTest = [
      "computer",
      "notepad",
      "paint",
      "minesweeper",
      "calculator"
    ];

    filesToTest.forEach(file => testRender(file));
  });
});
