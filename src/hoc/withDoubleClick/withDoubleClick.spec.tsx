import React from "react";
import { shallow } from "enzyme";

import withDoubleClick from "./";
import { findByTestAtrr } from "../../utils/testing";

const timeBetweenClicks: number = 200;
const TestComponent: React.FC = () => <h1>Text</h1>;
const EnchancedComponent = withDoubleClick(TestComponent, timeBetweenClicks);

describe("Higher Order Component withDoubleClick", () => {
  let comp = <EnchancedComponent onDoubleClick={() => console.log("double")} />;
  let wrapper = shallow(comp);

  describe("render", () => {
    it("render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "container").length).toBe(1);
    });

    it("render component", () => {
      expect(findByTestAtrr(wrapper, "component").length).toBe(1);
    });
  });

  describe("onClick", () => {
    let mockOnDoubleClickFn = jest.fn();
    let instance: InstanceType<typeof EnchancedComponent>;

    beforeEach(() => {
      mockOnDoubleClickFn = jest.fn();
      comp = <EnchancedComponent onDoubleClick={mockOnDoubleClickFn} />;
      wrapper = shallow<typeof EnchancedComponent>(comp);
      instance = (wrapper.instance() as any) as InstanceType<
        typeof EnchancedComponent
      >;
    });

    it("should change state on single click", () => {
      findByTestAtrr(wrapper, "container").simulate("click");

      expect(instance.state.lastClickTime === -Infinity).toBe(false);
    });

    it("should emit onDoubleClick and reset state on double click", () => {
      findByTestAtrr(wrapper, "container").simulate("click");
      findByTestAtrr(wrapper, "container").simulate("click");

      expect(mockOnDoubleClickFn.mock.calls.length).toBe(1);
      expect(instance.state.lastClickTime === -Infinity).toBe(true);
    });

    it("should emit onDoubleClick and change state on triple click", () => {
      findByTestAtrr(wrapper, "container").simulate("click");
      findByTestAtrr(wrapper, "container").simulate("click");
      findByTestAtrr(wrapper, "container").simulate("click");

      expect(mockOnDoubleClickFn.mock.calls.length).toBe(1);
      expect(instance.state.lastClickTime === -Infinity).toBe(false);
    });

    it("should emit onDoubleClick twice and reset state on quadra click", () => {
      findByTestAtrr(wrapper, "container").simulate("click");
      findByTestAtrr(wrapper, "container").simulate("click");
      findByTestAtrr(wrapper, "container").simulate("click");
      findByTestAtrr(wrapper, "container").simulate("click");

      expect(mockOnDoubleClickFn.mock.calls.length).toBe(2);
      expect(instance.state.lastClickTime === -Infinity).toBe(true);
    });

    it("should NOT emit onDoubleClick when second click is too late", async () => {
      findByTestAtrr(wrapper, "container").simulate("click");
      await new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, timeBetweenClicks + 300);
      });

      findByTestAtrr(wrapper, "container").simulate("click");
      expect(mockOnDoubleClickFn.mock.calls.length).toBe(0);
    });
  });
});
