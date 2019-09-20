import React from "react";
import { shallow } from "enzyme";

import { MenuItem } from "./MenuItem";
import { findByTestAtrr } from "../../../../testingUtils";

let mockChangePriority = jest.fn();
let mockToggleMinimalize = jest.fn();
const props = {
  changePriority: mockChangePriority,
  toggleMinimalize: mockToggleMinimalize,
  name: "example",
  id: "1",
  minimalized: false,
  focused: false
};

const createWrapper = (changedProps: Partial<typeof props> = {}) => {
  mockChangePriority = jest.fn();
  mockToggleMinimalize = jest.fn();
  const newProps = {
    ...props,
    ...changedProps,
    changePriority: mockChangePriority,
    toggleMinimalize: mockToggleMinimalize
  };

  return shallow(<MenuItem {...newProps} />);
};

const wrapper = createWrapper();
const parentDiv = findByTestAtrr(wrapper, "menu-item");

describe("ToolbarApplcationMenuItem Component", () => {
  describe("render", () => {
    it("should render without throwing an eror", () => {
      expect(parentDiv.length).toBe(1);
    });

    it("should render text", () => {
      expect(parentDiv.text()).toBe(props.name);
    });
  });

  describe("onClick", () => {
    it("should call changePriority once", () => {
      parentDiv.simulate("click");

      expect(mockChangePriority.mock.calls.length).toBe(1);
    });

    describe("toggleMinimalize", () => {
      it("should be called when focused", () => {
        const wrapper = createWrapper({ focused: true, minimalized: false });
        findByTestAtrr(wrapper, "menu-item").simulate("click");

        expect(mockToggleMinimalize.mock.calls.length).toBe(1);
        expect(mockChangePriority.mock.calls.length).toBe(0);
      });

      it("should be called when minimalized", () => {
        const wrapper = createWrapper({ focused: false, minimalized: true });
        findByTestAtrr(wrapper, "menu-item").simulate("click");

        expect(mockToggleMinimalize.mock.calls.length).toBe(1);
        expect(mockChangePriority.mock.calls.length).toBe(0);
      });
    });

    describe("change priority", () => {
      it("should be called when NOT focused and NOT minimalized", () => {
        const wrapper = createWrapper({ focused: false, minimalized: false });
        findByTestAtrr(wrapper, "menu-item").simulate("click");

        expect(mockToggleMinimalize.mock.calls.length).toBe(0);
        expect(mockChangePriority.mock.calls.length).toBe(1);
      });
    });
  });
});
