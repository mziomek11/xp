import React from "react";
import { shallow } from "enzyme";
import { Window } from ".";
import { findByTestAtrr } from "../../utils/testing";

describe("Window Component", () => {
  let mockChangePriority = jest.fn();
  const windowProps = {
    id: "abc",
    top: 20,
    left: 40,
    width: 120,
    height: 150,
    minimalized: false,
    fullscreened: false,
    toggleFullscreen: jest.fn()
  };
  let comp = (
    <Window {...windowProps} changePriority={mockChangePriority}>
      <div data-test="child" />
      <div data-test="child" />
    </Window>
  );
  let wrapper = shallow(comp);

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

    it("should render bar", () => {
      expect(findByTestAtrr(wrapper, "bar").length).toBe(1);
    });
  });

  describe("props", () => {
    it("should apply position styles from props when NOT fullscreened", () => {
      const styles = findByTestAtrr(wrapper, "window").prop("style");

      expect(styles).toHaveProperty("top", 20);
      expect(styles).toHaveProperty("left", 40);
      expect(styles).toHaveProperty("width", 120);
      expect(styles).toHaveProperty("height", 150);
    });

    it("should apply static style rules when fullscreened", () => {
      const propsWhenFullScr = { ...windowProps, fullscreened: true };
      const fullScrComp = (
        <Window {...propsWhenFullScr} changePriority={mockChangePriority} />
      );
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
      const propsWhenMinimalized = { ...windowProps, minimalized: true };
      const minimaliedComp = (
        <Window {...propsWhenMinimalized} changePriority={mockChangePriority} />
      );
      const minimalizedWrapper = shallow(minimaliedComp);
      const styles = findByTestAtrr(minimalizedWrapper, "window").prop("style");

      expect(styles).toHaveProperty("display", "none");
    });
  });

  describe("mouseDown", () => {
    beforeEach(() => {
      mockChangePriority = jest.fn();
      comp = (
        <Window {...windowProps} changePriority={mockChangePriority}>
          <div data-test="child" />
          <div data-test="child" />
        </Window>
      );
      wrapper = shallow(comp);
    });

    it("should call mockChangePriority", () => {
      findByTestAtrr(wrapper, "window").simulate("mousedown", {
        target: {
          classList: {
            contains: () => false
          }
        }
      });

      expect(mockChangePriority.mock.calls.length).toBe(1);
    });

    it("should NOT call mockChangePriority when clicked action", () => {
      findByTestAtrr(wrapper, "window").simulate("mousedown", {
        target: {
          classList: {
            contains: () => true
          }
        }
      });

      expect(mockChangePriority.mock.calls.length).toBe(0);
    });
  });
});
