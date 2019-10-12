import React from "react";
import { shallow } from "enzyme";

import { List } from "./List";
import { findByTestAtrr } from "../../../../../testingUtils";

const ctx = { path: [], setPath: jest.fn(), historyPosition: 0 } as any;
const wrapper = shallow(<List filesystem={ctx} />);

describe("Filesystem Folders List component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "tree").length).toBe(1);
    });
  });
});
