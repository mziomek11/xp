import React from "react";
import { shallow } from "enzyme";

import { Bar, Props } from "./Bar";
import { findByTestAtrr } from "../../../../testingUtils";

let mockOnMouseDownFn: jest.Mock;
let mockOnClickFn: jest.Mock;

const createWrapper = (
  displayProps: Partial<Omit<Props, "onMouseDown" | "onClick">> = {}
) => {
  mockOnMouseDownFn = jest.fn();
  mockOnClickFn = jest.fn();
  const dsProps = {
    showExit: false,
    showFullscreen: false,
    showIcon: false,
    showMinimalize: false,
    ...displayProps
  };
  return shallow(
    <Bar onMouseDown={mockOnMouseDownFn} onClick={mockOnClickFn} {...dsProps} />
  );
};

const wrapper = createWrapper();

describe("WindowBar Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "bar").length).toBe(1);
    });

    it("should render Title component", () => {
      expect(findByTestAtrr(wrapper, "title").length).toBe(1);
    });

    it("should render Icon component", () => {
      const wrapper = createWrapper({ showIcon: true });
      expect(findByTestAtrr(wrapper, "icon").length).toBe(1);
    });

    it("should NOT render Icon component", () => {
      const wrapper = createWrapper({ showIcon: false });
      expect(findByTestAtrr(wrapper, "icon").length).toBe(0);
    });

    describe("actions", () => {
      it("should render", () => {
        expect(findByTestAtrr(wrapper, "actions").length).toBe(1);
      });

      describe("minimalize", () => {
        it("should render", () => {
          const wrapper = createWrapper({ showMinimalize: true });
          expect(findByTestAtrr(wrapper, "action-minimalize").length).toBe(1);
        });

        it("should NOT render", () => {
          const wrapper = createWrapper({ showMinimalize: false });
          expect(findByTestAtrr(wrapper, "action-minimalize").length).toBe(0);
        });
      });

      describe("exit", () => {
        it("should render", () => {
          const wrapper = createWrapper({ showExit: true });
          expect(findByTestAtrr(wrapper, "action-exit").length).toBe(1);
        });

        it("should NOT render", () => {
          const wrapper = createWrapper({ showExit: false });
          expect(findByTestAtrr(wrapper, "action-exit").length).toBe(0);
        });
      });

      describe("fullscreen", () => {
        it("should render", () => {
          const wrapper = createWrapper({ showFullscreen: true });
          expect(findByTestAtrr(wrapper, "action-fullscreen").length).toBe(1);
        });

        it("should NOT render", () => {
          const wrapper = createWrapper({ showFullscreen: false });
          expect(findByTestAtrr(wrapper, "action-fullscreen").length).toBe(0);
        });
      });
    });
  });

  describe("onMouseDown", () => {
    it("should call onMouseDown", () => {
      const wrapper = createWrapper();
      findByTestAtrr(wrapper, "bar").simulate("mousedown");

      expect(mockOnMouseDownFn.mock.calls.length).toBe(1);
    });
  });

  describe("onTouchStart", () => {
    it("should call onMouseDown", () => {
      const wrapper = createWrapper();
      findByTestAtrr(wrapper, "bar").simulate("touchstart");

      expect(mockOnMouseDownFn.mock.calls.length).toBe(1);
    });
  });

  describe("onClick", () => {
    it("should call onClick", () => {
      const wrapper = createWrapper();
      findByTestAtrr(wrapper, "bar").simulate("click");

      expect(mockOnClickFn.mock.calls.length).toBe(1);
    });
  });
});
