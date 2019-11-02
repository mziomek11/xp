import React from "react";
import { shallow } from "enzyme";

import { Paint } from "./Paint";
import { findByTestAtrr } from "../../../../testingUtils";

const craeteWrapper = (showError: boolean) =>
  shallow(<Paint paint={{ showError } as any} />);
const wrapper = craeteWrapper(false);

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

    it("should render ColorBar component", () => {
      expect(findByTestAtrr(wrapper, "colorbar").length).toBe(1);
    });

    it("should render ErrorPopUp component", () => {
      const wrapper = craeteWrapper(true);
      expect(findByTestAtrr(wrapper, "error").length).toBe(1);
    });

    it("should NOT render ErrorPopUp component", () => {
      const wrapper = craeteWrapper(false);
      expect(findByTestAtrr(wrapper, "error").length).toBe(0);
    });
  });
});
