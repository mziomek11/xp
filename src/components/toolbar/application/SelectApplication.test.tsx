import React from "react";
import { shallow } from "enzyme";

import { SelectApplication } from "./SelectApplication";
import { findByTestAtrr } from "../../../../testingUtils";

const props = {
  width: 300,
  application: "ApplicationName",
  ids: ["1", "2", "3"],
  focused: false
};
const wrapper = shallow<SelectApplication>(<SelectApplication {...props} />);
const instance = wrapper.instance();

describe("ToolbarSelectApplication Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "application").length).toBe(1);
    });

    it("should render application text", () => {
      const appText = findByTestAtrr(wrapper, "text");

      expect(appText.length).toBe(1);
      expect(appText.text()).toBe(props.application);
    });

    it("should render count", () => {
      expect(findByTestAtrr(wrapper, "count").length).toBe(1);
      expect(findByTestAtrr(wrapper, "count").text()).toBe(
        props.ids.length.toString()
      );
    });

    it("should render arrow", () => {
      expect(findByTestAtrr(wrapper, "arrow").length).toBe(1);
    });

    it("should render menu", () => {
      instance.setState({ isOpen: true });
      expect(findByTestAtrr(wrapper, "menu").length).toBe(1);
    });

    it("should NOT render menu", () => {
      instance.setState({ isOpen: false });
      expect(findByTestAtrr(wrapper, "menu").length).toBe(0);
    });
  });

  describe("props", () => {
    it("should apply styles", () => {
      const appStyle = findByTestAtrr(wrapper, "application").prop("style");
      const expectedStyle = { width: props.width };

      expect(appStyle).toEqual(expectedStyle);
    });
  });

  describe("toggleMenu", () => {
    it("should toggle isOpen", () => {
      instance.setState({ isOpen: false });
      instance.toggleMenu();
      expect(instance.state.isOpen).toBe(true);

      instance.toggleMenu();
      expect(instance.state.isOpen).toBe(false);
    });
  });

  describe("closeMenu", () => {
    it("should make isOpen false", () => {
      instance.setState({ isOpen: true });
      instance.closeMenu();
      expect(instance.state.isOpen).toBe(false);

      instance.closeMenu();
      expect(instance.state.isOpen).toBe(false);
    });
  });

  describe("getClassName", () => {
    const baseClassName = "toolbar__application";
    const withMenuModifier = ` ${baseClassName}--with-menu`;
    const focusedModifier = ` ${baseClassName}--focused`;

    it("should return class --with-menu when closed and not focused", () => {
      const result = instance.getClassName();

      expect(result).toContain(withMenuModifier);
    });

    it("should return class --focused when focused", () => {
      const focusedProps = { ...props, focused: true };
      const wrapper = shallow<SelectApplication>(
        <SelectApplication {...focusedProps} />
      );

      const result = wrapper.instance().getClassName();

      expect(result).toContain(focusedModifier);
    });

    it("should return class --focused when isOpen", () => {
      wrapper.setState({ isOpen: true });
      const result = wrapper.instance().getClassName();

      expect(result).toContain(focusedModifier);
    });
  });
});
