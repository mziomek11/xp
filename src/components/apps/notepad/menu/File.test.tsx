import React from "react";
import { shallow } from "enzyme";

import File from "./File";
import { findByTestAtrr } from "../../../../../testingUtils";

const props = {
  onNewClick: jest.fn(),
  onOpenClick: jest.fn(),
  onSaveAsClick: jest.fn(),
  onCloseClick: jest.fn(),
  onSaveClick: jest.fn()
};

const wrapper = shallow(<File {...props} />);

describe("Notepad Menu File Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "file").length).toBe(1);
    });
  });
});
