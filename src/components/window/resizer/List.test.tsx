import React from "react";

import ResizerList from "./List";
import { shallow } from "enzyme";
import { findByTestAtrr } from "../../../../testingUtils";

const id = "asdasdasdasd";
const wrapper = shallow(<ResizerList id={id} />);

const testRenderResizer = (name: string, testData: string) => {
  it(`should render ${name}Resizer Component`, () => {
    const resizer = findByTestAtrr(wrapper, testData);

    expect(resizer.length).toBe(1);
    expect(resizer.prop("id")).toBe(id);
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
