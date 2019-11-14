import React from "react";
import { shallow } from "enzyme";

import { Paint } from "./Paint";
import { findByTestAtrr } from "../../../../testingUtils";

type OptionalProps = {
  showError: boolean;
  isOpening: boolean;
  isSaving: boolean;
  showColorBox: boolean;
};

const craeteWrapper = (optProps: Partial<OptionalProps> = {}) => {
  const optionalProps: OptionalProps = {
    showError: false,
    isOpening: false,
    isSaving: false,
    showColorBox: false,
    ...optProps
  };

  return shallow<Paint>(<Paint paint={{ ...optionalProps } as any} />);
};

const wrapper = craeteWrapper();

describe("Paint component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "paint").length).toBe(1);
    });

    it("should render Menu component", () => {
      expect(findByTestAtrr(wrapper, "menu").length).toBe(1);
    });

    it("should render Toolbar component", () => {
      expect(findByTestAtrr(wrapper, "toolbar").length).toBe(1);
    });

    it("should render Canvas component", () => {
      expect(findByTestAtrr(wrapper, "canvas").length).toBe(1);
    });

    it("should NOT render ErrorPopup, Save, Open and ColorBar components", () => {
      const optProps = { isOpening: false, isSaving: false, showError: false };
      const wrapper = craeteWrapper(optProps);

      expect(findByTestAtrr(wrapper, "error").length).toBe(0);
      expect(findByTestAtrr(wrapper, "save").length).toBe(0);
      expect(findByTestAtrr(wrapper, "open").length).toBe(0);
      expect(findByTestAtrr(wrapper, "colorbar").length).toBe(0);
    });

    it("should render ErrorPopUp component", () => {
      const wrapper = craeteWrapper({ showError: true });
      expect(findByTestAtrr(wrapper, "error").length).toBe(1);
    });

    it("should render Save component", () => {
      const wrapper = craeteWrapper({ isSaving: true });
      expect(findByTestAtrr(wrapper, "save").length).toBe(1);
    });

    it("should render Open component", () => {
      const wrapper = craeteWrapper({ isOpening: true });
      expect(findByTestAtrr(wrapper, "open").length).toBe(1);
    });

    it("should render ColorBar component", () => {
      const wrapper = craeteWrapper({ showColorBox: true });
      expect(findByTestAtrr(wrapper, "colorbar").length).toBe(1);
    });
  });
});
