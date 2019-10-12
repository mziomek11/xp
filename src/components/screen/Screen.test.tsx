import React from "react";
import { shallow } from "enzyme";

import { Screen } from "./Screen";
import { findByTestAtrr } from "../../../testingUtils";

const mockSetSizeFn = jest.fn();
const wrapper = shallow<Screen>(<Screen setSize={mockSetSizeFn} />);

describe("Screen Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "screen").length).toBe(1);
    });

    it("should render Desktop Componenet", () => {
      expect(findByTestAtrr(wrapper, "desktop").length).toBe(1);
    });

    it("should render Toolbar Componenet", () => {
      expect(findByTestAtrr(wrapper, "toolbar").length).toBe(1);
    });
  });

  describe("handleWindowResize", () => {
    it("should call setSize", () => {
      wrapper.instance().handleWindowResize();

      expect(mockSetSizeFn.mock.calls.length).toBe(1);
      expect(mockSetSizeFn.mock.calls[0]).toEqual([
        window.innerWidth,
        window.innerHeight
      ]);
    });
  });
});
