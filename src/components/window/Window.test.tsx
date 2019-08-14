import React from "react";
import { shallow } from "enzyme";

import windowConfig from "../../store/window/config";
import { Window } from "./Window";
import { findByTestAtrr } from "../../../testingUtils";

const windowProps = {
  id: "abc",
  top: windowConfig.INITIAL_TOP,
  left: windowConfig.INITIAL_LEFT,
  width: windowConfig.INITIAL_WIDTH,
  height: windowConfig.INITIAL_HEIGHT,
  minimalized: windowConfig.INITIAL_MINIMALIZED,
  fullscreened: false,
  toggleFullscreen: jest.fn(),
  changePriority: jest.fn()
};
let comp = (
  <Window {...windowProps}>
    <div data-test="child" />
    <div data-test="child" />
  </Window>
);
let wrapper = shallow(comp);

describe("Window Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "window").length).toBe(1);
    });

    it("should render content div", () => {
      expect(findByTestAtrr(wrapper, "content").length).toBe(1);
    });

    it("should render children", () => {
      expect(findByTestAtrr(wrapper, "child").length).toBe(2);
    });

    it("should render Bar Component", () => {
      expect(findByTestAtrr(wrapper, "bar").length).toBe(1);
    });

    it("should render ResizerList Component", () => {
      expect(findByTestAtrr(wrapper, "resizers").length).toBe(1);
    });
  });

  describe("styles", () => {
    it("should apply position styles from props when NOT fullscreened", () => {
      const styles = findByTestAtrr(wrapper, "window").prop("style");

      expect(styles).toHaveProperty("top", windowProps.top);
      expect(styles).toHaveProperty("left", windowProps.left);
      expect(styles).toHaveProperty("width", windowProps.width);
      expect(styles).toHaveProperty("height", windowProps.height);
    });

    it("should apply static style rules when fullscreened", () => {
      const props = { ...windowProps, fullscreened: true };
      const fullScrComp = <Window {...props} />;
      const fullScrWrapper = shallow(fullScrComp);
      const styles = findByTestAtrr(fullScrWrapper, "window").prop("style");

      expect(styles).toHaveProperty("top", 0);
      expect(styles).toHaveProperty("left", 0);
      expect(styles).toHaveProperty("width", "100%");
      expect(styles).toHaveProperty("height", "100%");
    });

    it("should have dispaly block when NOT minimalized", () => {
      const styles = findByTestAtrr(wrapper, "window").prop("style");

      expect(styles).toHaveProperty("display", "block");
    });

    it("should have dispaly none when minimalized", () => {
      const props = { ...windowProps, minimalized: true };
      const minimaliedComp = <Window {...props} />;
      const minimalizedWrapper = shallow(minimaliedComp);
      const styles = findByTestAtrr(minimalizedWrapper, "window").prop("style");

      expect(styles).toHaveProperty("display", "none");
    });
  });

  describe("mouseDown", () => {
    const mouseEv = (contains: boolean) => ({
      target: {
        classList: {
          contains: () => contains
        }
      }
    });

    let mockChangePriority: jest.Mock;

    beforeEach(() => {
      mockChangePriority = jest.fn();
      const props = { ...windowProps, changePriority: mockChangePriority };
      wrapper = shallow(<Window {...props} />);
    });

    it("should call mockChangePriority", () => {
      findByTestAtrr(wrapper, "window").simulate("mousedown", mouseEv(false));

      expect(mockChangePriority.mock.calls.length).toBe(1);
    });

    it("should NOT call mockChangePriority when clicked action", () => {
      findByTestAtrr(wrapper, "window").simulate("mousedown", mouseEv(true));

      expect(mockChangePriority.mock.calls.length).toBe(0);
    });
  });
});
