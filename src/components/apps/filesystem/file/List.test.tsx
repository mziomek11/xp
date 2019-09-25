import React from "react";
import { shallow } from "enzyme";

import { List } from "./List";
import { Display } from "../context/models";
import { findByTestAtrr } from "../../../../../testingUtils";

const createWrapper = (
  path: string[],
  files: string[],
  display: Display,
  renamedFile: string | null
) => {
  const context = {
    path,
    files,
    renamedFile,
    options: { display }
  } as any;

  return shallow<List>(<List context={context} />);
};

const wrapper = createWrapper([], ["a", "b", "c"], "tiles", null);

describe("Filesystem File List Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "container").length).toBe(1);
    });

    it("should render FileContainer components", () => {
      expect(findByTestAtrr(wrapper, "file").length).toBe(3);
    });

    it("should render FocusRect component", () => {
      wrapper.instance().setState({ creatingRect: true });

      expect(findByTestAtrr(wrapper, "focus-rect").length).toBe(1);
    });

    it("should NOT FocusRect component", () => {
      wrapper.instance().setState({ creatingRect: false });

      expect(findByTestAtrr(wrapper, "focus-rect").length).toBe(0);
    });

    describe("DiskHeader", () => {
      it("should render", () => {
        const wrapper = createWrapper([], [], "tiles", null);

        expect(findByTestAtrr(wrapper, "disk-header").length).toBe(1);
      });

      it("should NOT render when path greater than 0", () => {
        const wrapper = createWrapper(["a"], [], "tiles", null);

        expect(findByTestAtrr(wrapper, "disk-header").length).toBe(0);
      });

      it("should NOT render when display is list", () => {
        const wrapper = createWrapper([], [], "list", null);

        expect(findByTestAtrr(wrapper, "disk-header").length).toBe(0);
      });
    });
  });

  describe("handleMouseUp", () => {
    it("should change state", () => {
      wrapper.instance().setState({ creatingRect: true });
      wrapper.instance().handleMouseUp();

      expect(wrapper.instance().state.creatingRect).toBe(false);
    });
  });

  describe("handleMouseDown", () => {
    it("should return null", () => {
      const wrapper = createWrapper([], [], "tiles", "asdasd");

      expect(wrapper.instance().handleMouseDown({} as any)).toBe(null);
    });

    it("should change state", () => {
      const wrapper = createWrapper([], [], "tiles", null);
      const ev = {
        clientX: 1,
        clientY: 2,
        currentTarget: { getClientRects: () => [{ left: 3, top: 4, width: 5 }] }
      };

      wrapper.instance().setState({ creatingRect: false });
      wrapper.instance().handleMouseDown(ev as any);

      expect(wrapper.instance().state).toEqual({
        creatingRect: true,
        mouseDownData: {
          clientX: 1,
          clientY: 2,
          filesLeft: 3,
          filesTop: 4,
          filesWidth: 5
        }
      });
    });
  });
});
