import React from "react";
import { shallow } from "enzyme";

import withDoubleClick from "./withDoubleClick";
import { findByTestAtrr } from "../../testingUtils";

type Props = {
  checkForDoubleClick: (onDouble: () => void) => void;
};

let mockOnDoubleClickFn = jest.fn();
const timeBetweenClicks: number = 200;
const TestComponent: React.FC<Props> = ({ checkForDoubleClick }) => {
  const handleClick = () => checkForDoubleClick(mockOnDoubleClickFn);
  return (
    <h1 data-test="click-element" onClick={handleClick}>
      Text
    </h1>
  );
};

const EnchancedComponent = withDoubleClick(TestComponent, timeBetweenClicks);
let comp = <EnchancedComponent />;
let wrapper = shallow(comp);

describe("Higher Order Component withDoubleClick", () => {
  describe("render", () => {
    it("render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "component").length).toBe(1);
    });
  });

  describe("onClick", () => {
    let instance: InstanceType<typeof EnchancedComponent>;

    beforeEach(() => {
      mockOnDoubleClickFn = jest.fn();
      comp = <EnchancedComponent />;
      wrapper = shallow<typeof EnchancedComponent>(comp);
      instance = (wrapper.instance() as any) as InstanceType<
        typeof EnchancedComponent
      >;
    });

    it("should change state on single click", () => {
      findByTestAtrr(wrapper.dive(), "click-element").simulate("click");

      expect(instance.state.lastClickTime === -Infinity).toBe(false);
    });

    it("should emit onDoubleClick and reset state on double click", () => {
      findByTestAtrr(wrapper.dive(), "click-element").simulate("click");
      findByTestAtrr(wrapper.dive(), "click-element").simulate("click");

      expect(mockOnDoubleClickFn.mock.calls.length).toBe(1);
      expect(instance.state.lastClickTime === -Infinity).toBe(true);
    });

    it("should emit onDoubleClick and change state on triple click", () => {
      findByTestAtrr(wrapper.dive(), "click-element").simulate("click");
      findByTestAtrr(wrapper.dive(), "click-element").simulate("click");
      findByTestAtrr(wrapper.dive(), "click-element").simulate("click");

      expect(mockOnDoubleClickFn.mock.calls.length).toBe(1);
      expect(instance.state.lastClickTime === -Infinity).toBe(false);
    });

    it("should emit onDoubleClick twice and reset state on quadra click", () => {
      findByTestAtrr(wrapper.dive(), "click-element").simulate("click");
      findByTestAtrr(wrapper.dive(), "click-element").simulate("click");
      findByTestAtrr(wrapper.dive(), "click-element").simulate("click");
      findByTestAtrr(wrapper.dive(), "click-element").simulate("click");

      expect(mockOnDoubleClickFn.mock.calls.length).toBe(2);
      expect(instance.state.lastClickTime === -Infinity).toBe(true);
    });

    it("should NOT emit onDoubleClick when second click is too late", async () => {
      findByTestAtrr(wrapper.dive(), "click-element").simulate("click");
      await new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, timeBetweenClicks + 300);
      });

      findByTestAtrr(wrapper.dive(), "click-element").simulate("click");
      expect(mockOnDoubleClickFn.mock.calls.length).toBe(0);
    });
  });
});
