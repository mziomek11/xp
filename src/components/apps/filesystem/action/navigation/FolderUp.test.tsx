import React from "react";
import { shallow } from "enzyme";

import { FolderUp } from "./FolderUp";
import { findByTestAtrr } from "../../../../../../testingUtils";

let emit: jest.Mock;

const createWrapper = (disabled: boolean) => {
  emit = jest.fn();
  const fakeContext = { shortcuts: { goUp: { disabled, emit } } } as any;
  return shallow(<FolderUp context={fakeContext} />);
};

describe("Filesystem Action FolderUp Component", () => {
  const wrapper = createWrapper(false);

  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "container").length).toBe(1);
    });

    it("should render image", () => {
      expect(findByTestAtrr(wrapper, "image").length).toBe(1);
    });
  });

  describe("onClick", () => {
    it("should NOT call emit when is disabled", () => {
      const wrapper = createWrapper(true);
      findByTestAtrr(wrapper, "container").simulate("click");
      expect(emit.mock.calls.length).toBe(0);
    });

    it("should call emit when is NOT disabled", () => {
      const wrapper = createWrapper(false);
      findByTestAtrr(wrapper, "container").simulate("click");
      expect(emit.mock.calls.length).toBe(1);
    });
  });
});
