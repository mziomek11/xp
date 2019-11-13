import React from "react";
import { shallow } from "enzyme";

import SaveableFile from "./SaveableFile";
import { findByTestAtrr } from "../../../testingUtils";

const props = {
  onNewClick: jest.fn(),
  onOpenClick: jest.fn(),
  onSaveAsClick: jest.fn(),
  onCloseClick: jest.fn(),
  onSaveClick: jest.fn()
};

const wrapper = shallow(<SaveableFile {...props} />);

describe("Menu SaveableFile Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "file").length).toBe(1);
    });
  });
});
