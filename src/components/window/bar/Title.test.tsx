import React from "react";
import { shallow } from "enzyme";

import { Title } from "./Title";
import { findByTestAtrr } from "../../../../testingUtils";

const staticWindowName = "THIS IS STATIC TITLE";
const name = "THIS IS TITLE";

describe("Window Bar Title Component", () => {
  describe("render", () => {
    it("should render title", () => {
      const wrapper = shallow(<Title window={{ name } as any} />);
      const titleElement = findByTestAtrr(wrapper, "title");

      expect(titleElement.length).toBe(1);
      expect(titleElement.text()).toBe(name);
    });

    it("should render static title", () => {
      const comp = <Title window={{ name, staticWindowName } as any} />;
      const wrapper = shallow(comp);
      const titleElement = findByTestAtrr(wrapper, "title");

      expect(titleElement.length).toBe(1);
      expect(titleElement.text()).toBe(staticWindowName);
    });
  });
});
