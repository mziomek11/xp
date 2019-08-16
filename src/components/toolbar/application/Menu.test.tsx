import React from "react";
import { shallow } from "enzyme";

import { Menu } from "./Menu";
import { Window } from "../../../store/window/models";
import { findByTestAtrr } from "../../../../testingUtils";

const createWindow = (id: string): Window => ({
  id,
  width: 500,
  height: 500,
  top: 100,
  left: 100,
  minimalized: false,
  fullscreened: false,
  name: "WindowName" + id,
  application: "AppName"
});

const mockCloseMenuFn = jest.fn();
const mockToggleMinimalizeFn = jest.fn();
const props = {
  ids: ["1", "2", "3", "4"],
  windowById: {
    "1": createWindow("1"),
    "2": createWindow("2"),
    "3": createWindow("3"),
    "4": createWindow("4")
  },
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

  describe("shouldComponentUpdate", () => {
    it("should return true when ids are different", () => {
      let result = instance.shouldComponentUpdate({
        ...props,
        ids: ["1", "3", "2", "4"]
      });

      expect(result).toBe(true);

      result = instance.shouldComponentUpdate({
        ...props,
        ids: ["1", "3", "2", "4", "5"]
      });

      expect(result).toBe(true);
    });

    it("should return false when ids are the same", () => {
      const result = instance.shouldComponentUpdate({
        ...props,
        windowById: { ...props.windowById, "5": createWindow("5") },
        closeMenu: jest.fn(),
        toggleMinimalize: jest.fn()
      });

      expect(result).toBe(false);
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

  describe("handleItemClick", () => {
    it("should call toggleMinimalize with proper args", () => {
      findByTestAtrr(wrapper, "menu-item")
        .first()
        .simulate("click");

      expect(mockToggleMinimalizeFn.mock.calls.length).toBe(1);
      expect(mockToggleMinimalizeFn.mock.calls[0]).toEqual(["1"]);
    });
  });
});
