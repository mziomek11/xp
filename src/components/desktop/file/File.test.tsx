import React from "react";
import { shallow } from "enzyme";

import { File } from "./File";
import { findByTestAtrr } from "../../../../testingUtils";

const mockCheckForDoubleClick = jest.fn();
const props = {
  name: "MyFile",
  openWindow: jest.fn(),
  checkForDoubleClick: mockCheckForDoubleClick,
  startWindowName: "name",
  application: "Notepad" as any
};
const comp = <File {...props} />;
const wrapper = shallow<File>(comp);

describe("File Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "file").length).toBe(1);
    });

    it("should render filename", () => {
      expect(findByTestAtrr(wrapper, "filename").length).toBe(1);
    });
  });

  describe("handleClick", () => {
    it("should call checkForDoubleClick", () => {
      findByTestAtrr(wrapper, "file").simulate("click");
      expect(mockCheckForDoubleClick.mock.calls.length).toBe(1);
    });
  });
});
