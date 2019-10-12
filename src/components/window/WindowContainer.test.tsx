import React from "react";
import { shallow } from "enzyme";

import { WindowContainer } from "./WindowContainer";
import { testContextData } from "./Context.test";
import { findByTestAtrr, getEventTargetClassList } from "../../../testingUtils";

let mockChangePriority: jest.Mock;
const createWrapper = (context: Partial<typeof testContextData> = {}) => {
  mockChangePriority = jest.fn();
  const newContext = {
    ...testContextData,
    changePriority: mockChangePriority,
    ...context
  };

  const comp = <WindowContainer window={newContext} children={{}} />;
  return shallow<WindowContainer>(comp);
};

const comp = (
  <WindowContainer window={testContextData}>
    <div data-test="child" />
    <div data-test="child" />
  </WindowContainer>
);
let wrapper = createWrapper();
let instance = wrapper.instance();

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
      const instance = createWrapper({ fullscreened: true }).instance();
      const inlineStyles = instance.getInlineStyles();

      expect(inlineStyles.left).toBe(0);
      expect(inlineStyles.top).toBe(0);
      expect(inlineStyles.width).toBe("100%");
      expect(inlineStyles.height).toBe("100%");
    });

    it("should calculate inline styles when NOT minimalized", () => {
      const instance = createWrapper({ minimalized: false }).instance();
      const inlineStyles = instance.getInlineStyles();

      expect(inlineStyles.display).toBe("block");
    });

    it("should calculate inline styles when minimalized", () => {
      const instance = createWrapper({ minimalized: true }).instance();
      const inlineStyles = instance.getInlineStyles();

      expect(inlineStyles.display).toBe("none");
    });
  });

  describe("getClassName", () => {
    const baseClass: string = "window";
    const fullscreenModifier: string = " " + baseClass + "--fullscreen";
    const focusModifier: string = " " + baseClass + "--focused";

    it("should return base class", () => {
      const wrapper = createWrapper({ focused: false, fullscreened: false });
      const instance = wrapper.instance();
      const expectedClass = baseClass;

      expect(instance.getClassName()).toBe(expectedClass);
    });

    it("should return base class with fullscreen modifier", () => {
      const wrapper = createWrapper({ focused: false, fullscreened: true });
      const instance = wrapper.instance();

      expect(instance.getClassName()).toContain(fullscreenModifier);
    });

    it("should return base class with focus modifier", () => {
      const wrapper = createWrapper({ focused: true, fullscreened: false });
      const instance = wrapper.instance();

      expect(instance.getClassName()).toContain(focusModifier);
    });

    it("should return base class with fullscreen and focus modifier", () => {
      const wrapper = createWrapper({ focused: true, fullscreened: true });
      const instance = wrapper.instance();

      expect(instance.getClassName()).toContain(fullscreenModifier);
      expect(instance.getClassName()).toContain(focusModifier);
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
