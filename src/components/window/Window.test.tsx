import React from "react";
import { shallow } from "enzyme";
import { Window } from ".";
import { findByTestAtrr } from "../../utils/testing";

describe("Window Component", () => {
  const mockChangePriority = jest.fn();
  const comp = (
    <Window
      id="abc"
      top={20}
      left={40}
      width={120}
      height={150}
      changePriority={mockChangePriority}
    >
      <div data-test="child" />
      <div data-test="child" />
    </Window>
  );
  const wrapper = shallow(comp);

  it("should render without throwing an error", () => {
    expect(findByTestAtrr(wrapper, "window").length).toBe(1);
  });

  it("should render children", () => {
    expect(findByTestAtrr(wrapper, "child").length).toBe(2);
  });

  it("should render bar", () => {
    expect(findByTestAtrr(wrapper, "bar").length).toBe(1);
  });

  it("should apply styles from props", () => {
    const styles = findByTestAtrr(wrapper, "window")
      .at(0)
      .prop("style");

    expect(styles).toHaveProperty("top", 20);
    expect(styles).toHaveProperty("left", 40);
    expect(styles).toHaveProperty("width", 120);
    expect(styles).toHaveProperty("height", 150);
  });

  it("should call mockChangePriority on mouse down", () => {
    findByTestAtrr(wrapper, "window").simulate("mousedown");

    expect(mockChangePriority.mock.calls.length).toBe(1);
  });
});
