import React from "react";
import { shallow } from "enzyme";

import LocationListController from "./LocationListController";
import { findByTestAtrr } from "../../../../../testingUtils";

const wrapper = shallow<LocationListController>(<LocationListController />);
const instance = wrapper.instance();

describe("Filesystem Adress LocationListController Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "container").length).toBe(1);
    });

    it("should render LocationList component", () => {
      instance.setState({ open: true });
      expect(findByTestAtrr(wrapper, "location-list").length).toBe(1);
    });

    it("should NOT render LocationList component", () => {
      instance.setState({ open: false });
      expect(findByTestAtrr(wrapper, "location-list").length).toBe(0);
    });
  });

  describe("handleContainerClick", () => {
    it("should change state open", () => {
      instance.setState({ open: true });
      instance.handleContainerClick();

      expect(instance.state.open).toBe(false);
    });

    it("should change state open", () => {
      instance.setState({ open: false, isClickOpening: false });
      instance.handleContainerClick();

      expect(instance.state.open).toBe(true);
      expect(instance.state.isClickOpening).toBe(true);
    });
  });

  describe("closeList", () => {
    it("should change state", () => {
      instance.setState({ open: true });
      instance.closeList();

      expect(instance.state.open).toBe(false);
    });
  });

  describe("handleWindowClick", () => {
    it("should change state isOpeningClick", () => {
      instance.setState({ isClickOpening: true });
      instance.handleWindowClick();

      expect(instance.state.isClickOpening).toBe(false);
    });

    it("should change state open", () => {
      instance.setState({ isClickOpening: false, open: true });
      instance.handleWindowClick();

      expect(instance.state.open).toBe(false);
    });
  });
});
