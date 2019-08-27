import React from "react";
import { shallow } from "enzyme";

import { WindowContainer } from "./WindowContainer";
import { testContextData } from "./Context.test";
import { findByTestAtrr } from "../../../testingUtils";

let comp = (
  <WindowContainer context={testContextData}>
    <div data-test="child" />
    <div data-test="child" />
  </WindowContainer>
);
let wrapper = shallow<WindowContainer>(comp);
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
      const context = { ...testContextData, fullscreened: true };
      const fullScrComp = <WindowContainer context={context} />;
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
      const context = { ...testContextData, minimalized: true };
      const minimaliedComp = <WindowContainer context={context} />;
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
      const context = {
        ...testContextData,
        changePriority: mockChangePriority
      };
      wrapper = shallow<WindowContainer>(<WindowContainer context={context} />);
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
      const context = {
        ...testContextData,
        focused: false,
        fullscreened: false
      };
      const wrapper = shallow<WindowContainer>(
        <WindowContainer context={context} />
      );
      const instance = wrapper.instance();
      const expectedClass = baseClass;

      expect(instance.getClassName()).toBe(expectedClass);
    });

    it("should return base class with fullscreen modifier", () => {
      const context = {
        ...testContextData,
        focused: false,
        fullscreened: true
      };
      const wrapper = shallow<WindowContainer>(
        <WindowContainer context={context} />
      );
      const instance = wrapper.instance();
      const expectedClass = baseClass + fullscreenModifier;

      expect(instance.getClassName()).toBe(expectedClass);
    });

    it("should return base class with focus modifier", () => {
      const context = {
        ...testContextData,
        focused: true,
        fullscreened: false
      };
      const wrapper = shallow<WindowContainer>(
        <WindowContainer context={context} />
      );
      const instance = wrapper.instance();
      const expectedClass = baseClass + focusModifier;

      expect(instance.getClassName()).toBe(expectedClass);
    });

    it("should return base class with fullscreen and focus modifier", () => {
      const context = {
        ...testContextData,
        focused: true,
        fullscreened: true
      };
      const wrapper = shallow<WindowContainer>(
        <WindowContainer context={context} />
      );
      const instance = wrapper.instance();
      const expectedClass = baseClass + fullscreenModifier + focusModifier;

      expect(instance.getClassName()).toBe(expectedClass);
    });
  });

  describe("checkForClickOutsideWindow", () => {
    let mockRemoveFocusFocusedFn: jest.Mock;
    let instance: any;

    beforeEach(() => {
      mockRemoveFocusFocusedFn = jest.fn();
      const context = {
        ...testContextData,
        focused: true,
        removeFocus: mockRemoveFocusFocusedFn
      };
      instance = shallow<WindowContainer>(
        <WindowContainer context={context} />
      ).instance();
    });
    describe("should NOT call removeFocus when", () => {
      it("element has NOT focus", () => {
        const mockRemoveFocus = jest.fn();
        const context = {
          ...testContextData,
          focused: false,
          removeFocus: mockRemoveFocus
        };
        const wrapper = shallow<WindowContainer>(
          <WindowContainer context={context} />
        );
        wrapper.instance().ckeckForClickOutsideWindow({} as MouseEvent);

        expect(mockRemoveFocus.mock.calls.length).toBe(0);
      });

      it("element has window class", () => {
        let e = { target: { classList: ["window"] } } as any;
        instance.ckeckForClickOutsideWindow(e);

        e = { target: { classList: ["window__action"] } } as any;
        instance.ckeckForClickOutsideWindow(e);

        expect(mockRemoveFocusFocusedFn.mock.calls.length).toBe(0);
      });
    });

    describe("should call removeFocus when", () => {
      it("element has NOT class", () => {
        const e = { target: { classList: [] } } as any;
        instance.ckeckForClickOutsideWindow(e);

        expect(mockRemoveFocusFocusedFn.mock.calls.length).toBe(1);
      });

      it("element has NOT window class", () => {
        const e = { target: { classList: ["example"] } } as any;
        instance.ckeckForClickOutsideWindow(e);

        expect(mockRemoveFocusFocusedFn.mock.calls.length).toBe(1);
      });
    });
  });
});
