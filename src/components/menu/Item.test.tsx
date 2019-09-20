import React from "react";
import { shallow } from "enzyme";

import { Item } from "./Item";
import { findByTestAtrr } from "../../../testingUtils";

const component = <Item name="MenuItem" />;
const wrapper = shallow<Item>(component);

describe("Item Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "item").length).toBe(1);
    });

    it("should render name", () => {
      const name = findByTestAtrr(wrapper, "name");

      expect(name.length).toBe(1);
      expect(name.text()).toBe("MenuItem");
    });
  });
});
