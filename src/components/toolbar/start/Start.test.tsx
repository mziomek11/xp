import React from "react";
import { shallow } from "enzyme";

import Start from "./Start";
import { findByTestAtrr } from "../../../../testingUtils";

const wrapper = shallow<Start>(<Start />);
const instance = wrapper.instance();

describe("Start Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "start").length).toBe(1);
    });

    it("should render content", () => {
      instance.setState({ isOpen: true });
      expect(findByTestAtrr(wrapper, "content").length).toBe(1);
    });

    it("should NOT render content", () => {
      instance.setState({ isOpen: false });
      expect(findByTestAtrr(wrapper, "content").length).toBe(0);
    });
  });

  describe("open", () => {
    it("should set isOpen to true", () => {
      instance.setState({ isOpen: false });
      instance.open();

      expect(instance.state.isOpen).toBe(true);
    });
  });

  describe("close", () => {
    it("should set isOpen to false", () => {
      instance.setState({ isOpen: true });
      instance.close();

      expect(instance.state.isOpen).toBe(false);
    });
  });

  describe("handleClick", () => {
    let instance: Start;
    let mockOpenFn: jest.Mock;
    let mockCloseFn: jest.Mock;

    beforeEach(() => {
      mockOpenFn = jest.fn();
      mockCloseFn = jest.fn();
      instance = shallow<Start>(<Start />).instance();
      instance.open = mockOpenFn;
      instance.close = mockCloseFn;
    });

    it("should call open", () => {
      instance.setState({ isOpen: false });
      instance.handleClick();

      expect(mockOpenFn.mock.calls.length).toBe(1);
    });

    it("should call close", () => {
      instance.setState({ isOpen: true });
      instance.handleClick();

      expect(mockCloseFn.mock.calls.length).toBe(1);
    });
  });
});
