import React from "react";
import { shallow } from "enzyme";

import Views from "./Views";
import { findByTestAtrr } from "../../../../../testingUtils";

const wrapper = shallow<Views>(<Views />);
const instance = wrapper.instance();

describe("Filesystem Action HistoryArrowDropDown Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "actions").length).toBe(1);
    });

    it("should render action", () => {
      expect(findByTestAtrr(wrapper, "action").length).toBe(1);
    });

    it("should render icon", () => {
      expect(findByTestAtrr(wrapper, "icon").length).toBe(1);
    });

    it("should render arrow", () => {
      expect(findByTestAtrr(wrapper, "arrow").length).toBe(1);
    });

    it("should render dropdown", () => {
      instance.setState({ isOpen: true });

      expect(findByTestAtrr(wrapper, "dropdown").length).toBe(1);
    });

    it("should NOT render dropdown", () => {
      instance.setState({ isOpen: false });

      expect(findByTestAtrr(wrapper, "dropdown").length).toBe(0);
    });
  });

  describe("handleActionClick", () => {
    it("should change state", () => {
      instance.setState({ isOpen: false });
      instance.handleActionClick();

      expect(instance.state).toEqual({ isOpen: true, isClickOpening: true });
    });
  });

  describe("handleWindowClick", () => {
    describe("is click opening", () => {
      it("should change isClickOpening", () => {
        instance.setState({ isClickOpening: true });
        instance.handleWindowClick();

        expect(instance.state.isClickOpening).toEqual(false);
      });
    });

    describe("is click NOT opening", () => {
      it("should changle isOpen", () => {
        instance.setState({ isOpen: true });
        instance.handleWindowClick();

        expect(instance.state.isOpen).toEqual(false);
      });
    });
  });
});
