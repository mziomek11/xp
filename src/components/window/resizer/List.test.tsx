import React from "react";

import ResizerList from "./List";
import { shallow } from "enzyme";
import { findByTestAtrr } from "../../../../testingUtils";

const wrapper = shallow(<ResizerList />);

const testRenderResizer = (name: string, testData: string) => {
  it(`should render ${name}Resizer Component`, () => {
    const resizer = findByTestAtrr(wrapper, testData);

    expect(resizer.length).toBe(1);
  });
};

const resizerNameWithDataAttr: { [name: string]: string } = {
  TopLeft: "NW",
  Top: "N",
  TopRight: "NE",
  Right: "N",
  BottomRight: "SE",
  Bottom: "S",
  BottomLeft: "SW",
  Left: "W"
};

describe("WindowResizerList Componenet", () => {
  Object.keys(resizerNameWithDataAttr).forEach(name => {
    testRenderResizer(name, resizerNameWithDataAttr[name] as string);
  });
});
