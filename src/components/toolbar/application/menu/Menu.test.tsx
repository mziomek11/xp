import React from "react";
import { shallow } from "enzyme";

import { Menu } from "./Menu";
import { findByTestAtrr } from "../../../../../testingUtils";

const mockCloseMenuFn = jest.fn();
const mockToggleMinimalizeFn = jest.fn();
const props = {
  ids: ["1", "2", "3", "4"],
  closeMenu: mockCloseMenuFn,
  toggleMinimalize: mockToggleMinimalizeFn
};

const wrapper = shallow<Menu>(<Menu {...props} />);
const instance = wrapper.instance();

describe("ToolbarApplicationMenu Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "menu").length).toBe(1);
    });

    it("should render items", () => {
      expect(findByTestAtrr(wrapper, "menu-item").length).toBe(4);
    });
  });

  describe("handleClickOutsideMenu", () => {
    const ev: any = { target: { classList: { contains: () => false } } };

    it("should change state when click is opening", () => {
      instance.handleClickOutsideMenu(ev);

      expect(instance.state.isOpeningClick).toBe(false);
      expect(mockCloseMenuFn.mock.calls.length).toBe(0);
    });

    it("should call closeWindow when click is NOT opening", () => {
      instance.handleClickOutsideMenu(ev);

      expect(mockCloseMenuFn.mock.calls.length).toBe(1);
    });
  });

  describe("clickedOutsideMenu", () => {
    it("should return false when contains class", () => {
      const ev: any = { target: { classList: { contains: () => true } } };
      expect(instance.clickedOutsideMenu(ev)).toBe(false);
    });

    it("should returnf true when NOT contains class", () => {
      const ev: any = { target: { classList: { contains: () => false } } };
      expect(instance.clickedOutsideMenu(ev)).toBe(true);
    });
  });
});
