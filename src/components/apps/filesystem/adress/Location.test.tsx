import React from "react";
import { shallow } from "enzyme";

import { AdressLocation } from "./Location";
import { findByTestAtrr } from "../../../../../testingUtils";

const filesystem = { setPath: jest.fn(), path: [], historyPositon: 0 } as any;
const wrapper = shallow(<AdressLocation filesystem={filesystem} />);

describe("Filesystem Location Component", () => {
  it("should render without throwing an error", () => {
    expect(findByTestAtrr(wrapper, "location").length).toBe(1);
  });
});
