import React from "react";
import { shallow } from "enzyme";

import { Notepad } from "./Notepad";
import { findByTestAtrr } from "../../../../testingUtils";

const createWrapper = (
  isOpening: boolean = false,
  isSaving: boolean = false
) => {
  const props = { notepad: { isOpening, isSaving } as any };

  return shallow<Notepad>(<Notepad {...props} />);
};

const wrapper = createWrapper();

describe("Notepad Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "notepad").length).toBe(1);
    });

    it("should render Menu component", () => {
      expect(findByTestAtrr(wrapper, "menu").length).toBe(1);
    });

    it("should render TextArea component", () => {
      expect(findByTestAtrr(wrapper, "textarea").length).toBe(1);
    });

    it("should render Save component", () => {
      const wrapper = createWrapper(false, true);
      expect(findByTestAtrr(wrapper, "save").length).toBe(1);
    });

    it("should render Open component", () => {
      const wrapper = createWrapper(true, false);
      expect(findByTestAtrr(wrapper, "open").length).toBe(1);
    });

    it("should NOT render Save component", () => {
      const wrapper = createWrapper(false, false);
      expect(findByTestAtrr(wrapper, "save").length).toBe(0);
    });

    it("should NOT render Open component", () => {
      const wrapper = createWrapper(false, false);
      expect(findByTestAtrr(wrapper, "open").length).toBe(0);
    });
  });
});
