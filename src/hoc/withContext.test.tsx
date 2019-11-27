import React from "react";
import { shallow } from "enzyme";

import withContext, { ContextType } from "./withContext";
import { findByTestAtrr } from "../../testingUtils";
import { capitalize } from "../utils";

const BaseComp = () => <div>Base Comp</div>;

describe("Higher Order Component withContext", () => {
  const testRender = (type: ContextType) => {
    describe(capitalize(type), () => {
      it("should render without throwing an error", () => {
        const Enchanced = withContext(BaseComp, type);
        const wrapper = shallow(<Enchanced />);

        expect(findByTestAtrr(wrapper, type).length).toBe(1);
      });
    });
  };

  const contextsToTest: ContextType[] = [
    "window",
    "filesystem",
    "notepad",
    "paint",
    "minesweeper",
    "desktop"
  ];

  contextsToTest.forEach(type => testRender(type));
});
