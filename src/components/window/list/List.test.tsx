import React from "react";
import { shallow } from "enzyme";
import { List } from "./";
import { findByTestAtrr } from "../../../utils/testing";

describe("WindowList Component", () => {
  it("should render windows", () => {
    const comp = <List windowsIds={["1", "2", "3"]} />;
    const wrapper = shallow(comp);

    expect(findByTestAtrr(wrapper, "window").length).toBe(3);
  });

  it("should not render windows", () => {
    const comp = <List windowsIds={[]} />;
    const wrapper = shallow(comp);

    expect(findByTestAtrr(wrapper, "window").length).toBe(0);
  });
});
