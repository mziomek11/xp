import React from "react";
import { shallow } from "enzyme";

import { WindowContainer } from "./WindowContainer";
import { testContextData } from "./Context.test";
import { findByTestAtrr, getEventTargetClassList } from "../../../testingUtils";

let comp = (
  <WindowContainer context={testContextData}>
    <div data-test="child" />
    <div data-test="child" />
  </WindowContainer>
);
let wrapper = shallow<WindowContainer>(comp);
let instance = wrapper.instance();

const createComp = (context: Partial<typeof testContextData>) => {
  const newContext = { ...testContextData, ...context };
  return <WindowContainer context={newContext} children={{}} />;
};

describe("WindowContainer Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "window").length).toBe(1);
    });
  });

  describe("getInlineStyles", () => {
    it("should calculate inline styles when NOT fullscreened", () => {
      const inlineStyles = instance.getInlineStyles();

      expect(inlineStyles.left).toBe(testContextData.left);
      expect(inlineStyles.top).toBe(testContextData.top);
      expect(inlineStyles.width).toBe(testContextData.width);
      expect(inlineStyles.height).toBe(testContextData.height);
    });

    it("should calculate inline styles when when fullscreened", () => {
      const fullScrComp = createComp({ fullscreened: true });
      const instance = shallow<WindowContainer>(fullScrComp).instance();
      const inlineStyles = instance.getInlineStyles();

      expect(inlineStyles.left).toBe(0);
      expect(inlineStyles.top).toBe(0);
      expect(inlineStyles.width).toBe("100%");
      expect(inlineStyles.height).toBe("100%");
    });

    it("should calculate inline styles when NOT minimalized", () => {
      const inlineStyles = instance.getInlineStyles();

      expect(inlineStyles.display).toBe("block");
    });

    it("should calculate inline styles when minimalized", () => {
      const minimaliedComp = createComp({ minimalized: true });
      const instance = shallow<WindowContainer>(minimaliedComp).instance();
      const inlineStyles = instance.getInlineStyles();

      expect(inlineStyles.display).toBe("none");
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
      const comp = createComp({ changePriority: mockChangePriority });
      wrapper = shallow<WindowContainer>(comp);
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

  describe("getClassName", () => {
    const baseClass: string = "window";
    const fullscreenModifier: string = " " + baseClass + "--fullscreen";
    const focusModifier: string = " " + baseClass + "--focused";

    it("should return base class", () => {
      const comp = createComp({ focused: false, fullscreened: false });
      const wrapper = shallow<WindowContainer>(comp);
      const instance = wrapper.instance();
      const expectedClass = baseClass;

      expect(instance.getClassName()).toBe(expectedClass);
    });

    it("should return base class with fullscreen modifier", () => {
      const comp = createComp({ focused: false, fullscreened: true });
      const wrapper = shallow<WindowContainer>(comp);
      const instance = wrapper.instance();

      expect(instance.getClassName()).toContain(fullscreenModifier);
    });

    it("should return base class with focus modifier", () => {
      const comp = createComp({ focused: true, fullscreened: false });
      const wrapper = shallow<WindowContainer>(comp);
      const instance = wrapper.instance();

      expect(instance.getClassName()).toContain(focusModifier);
    });

    it("should return base class with fullscreen and focus modifier", () => {
      const comp = createComp({ focused: true, fullscreened: true });
      const wrapper = shallow<WindowContainer>(comp);
      const instance = wrapper.instance();

      expect(instance.getClassName()).toContain(fullscreenModifier);
      expect(instance.getClassName()).toContain(focusModifier);
    });
  });

  describe("clickedOnWindow", () => {
    const clickEvent = {
      clientX: 150,
      clientY: 150
    };

    it("should return true when window is fullscreened", () => {
      const comp = createComp({ left: -100, fullscreened: true });
      const instance = shallow<WindowContainer>(comp).instance();
      expect(instance.clickedWindow(clickEvent as any)).toBe(true);
    });

    it("should return false when is on left", () => {
      const comp = createComp({ left: -100, width: 10 });
      const instance = shallow<WindowContainer>(comp).instance();
      expect(instance.clickedWindow(clickEvent as any)).toBe(false);
    });

    it("should return false when x is on right", () => {
      const comp = createComp({ left: 5000, width: 10 });
      const instance = shallow<WindowContainer>(comp).instance();
      expect(instance.clickedWindow(clickEvent as any)).toBe(false);
    });

    it("should return false when y is on top", () => {
      const comp = createComp({ top: -100, height: 10 });
      const instance = shallow<WindowContainer>(comp).instance();
      expect(instance.clickedWindow(clickEvent as any)).toBe(false);
    });

    it("should return false when y is on bottom", () => {
      const comp = createComp({ top: 5000, height: 10 });
      const instance = shallow<WindowContainer>(comp).instance();
      expect(instance.clickedWindow(clickEvent as any)).toBe(false);
    });

    it("should return true", () => {
      const clickedOnWindowContextData = {
        width: 200,
        height: 200,
        left: 100,
        top: 100,
        fullscreened: false
      };

      const comp = createComp(clickedOnWindowContextData);
      const instance = shallow<WindowContainer>(comp).instance();
      expect(instance.clickedWindow(clickEvent as any)).toBe(true);
    });
  });

  describe("clickedOnToolbarApp", () => {
    describe("returns false", () => {
      it("classlist is empty", () => {
        const event = getEventTargetClassList([]);
        expect(instance.clickedOnToolbarApp(event as any)).toBe(false);
      });

      it("classlist does NOT contain toolbar__application", () => {
        const event = getEventTargetClassList([
          "aaa__application",
          "toolbar__adasdadasdsad"
        ]);
        expect(instance.clickedOnToolbarApp(event as any)).toBe(false);
      });
    });

    describe("returns true", () => {
      it("classlist contains toolbar__application", () => {
        const event = getEventTargetClassList([
          "toolbar__application",
          "another"
        ]);
        expect(instance.clickedOnToolbarApp(event as any)).toBe(true);
      });
    });
  });
});
