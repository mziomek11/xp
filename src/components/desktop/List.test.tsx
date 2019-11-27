import React from "react";
import { shallow } from "enzyme";

import { FileList } from "./List";
import { findByTestAtrr } from "../../../testingUtils";

let mockSetContextFn: jest.Mock;

const createWrapper = (focusingRect: boolean = false) => {
  mockSetContextFn = jest.fn();
  const props = {
    desktop: { setContext: mockSetContextFn, focusingRect } as any
  };

  return shallow<FileList>(<FileList {...props} />);
};

const wrapper = createWrapper();
const instance = wrapper.instance();

describe("DesktopFileList Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "list").length).toBe(1);
    });

    it("should render FocusRect", () => {
      const wrapper = createWrapper(false);

      expect(findByTestAtrr(wrapper, "rect").length).toBe(0);
    });

    it("should NOT render FocusRect", () => {
      const wrapper = createWrapper(true);

      expect(findByTestAtrr(wrapper, "rect").length).toBe(1);
    });
  });

  describe("handleMouseDown", () => {
    const ev: any = (contains: boolean) => ({
      type: "mousemove",
      target: {
        classList: {
          contains: () => contains
        }
      }
    });

    it("should NOT call setContext", () => {
      instance.handleMouseDown(ev(false));

      expect(mockSetContextFn.mock.calls.length).toBe(0);
    });
  });
});
