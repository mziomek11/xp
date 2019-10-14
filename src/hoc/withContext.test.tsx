import React from "react";
import { shallow } from "enzyme";

import withContext from "./withContext";
import { findByTestAtrr } from "../../testingUtils";

const BaseComp = () => <div>Base Comp</div>;

describe("Higher Order Component withContext", () => {
  describe("Window", () => {
    it("should render without throwing an error", () => {
      const Enchanced = withContext(BaseComp, "window");
      const wrapper = shallow(<Enchanced />);

      expect(findByTestAtrr(wrapper, "window").length).toBe(1);
    });
  });

  describe("Filesystem", () => {
    it("should render without throwing an error", () => {
      const Enchanced = withContext(BaseComp, "filesystem");
      const wrapper = shallow(<Enchanced />);

      expect(findByTestAtrr(wrapper, "filesystem").length).toBe(1);
    });
  });

  describe("Notepad", () => {
    it("should render without throwing an error", () => {
      const Enchanced = withContext(BaseComp, "notepad");
      const wrapper = shallow(<Enchanced />);

      expect(findByTestAtrr(wrapper, "notepad").length).toBe(1);
    });
  });

  describe("Paing", () => {
    it("should render without throwing an error", () => {
      const Enchanced = withContext(BaseComp, "paint");
      const wrapper = shallow(<Enchanced />);

      expect(findByTestAtrr(wrapper, "paint").length).toBe(1);
    });
  });
});
