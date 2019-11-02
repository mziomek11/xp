import React from "react";
import { shallow } from "enzyme";

import Content from "./Content";
import { findByTestAtrr } from "../../../../testingUtils";

const mockOnClickFn = jest.fn();
const text = "this is text";
const textBefore = "this is text before";
const image = "this is image";
const wrapper = shallow(
  <Content
    onClick={mockOnClickFn}
    text={text}
    textBefore={textBefore}
    image={image}
  />
);

describe("Popup Content Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "popup").length).toBe(1);
    });

    it("should render icon", () => {
      const icon = findByTestAtrr(wrapper, "icon");

      expect(icon.length).toBe(1);
      expect(icon.prop("src")).toBe(image);
    });

    it("should render text", () => {
      const textElement = findByTestAtrr(wrapper, "text");

      expect(textElement.length).toBe(1);
      expect(textElement.text()).toBe(text);
    });

    describe("textBefore", () => {
      it("should be rendered", () => {
        const textBeforeElement = findByTestAtrr(wrapper, "text-before");

        expect(textBeforeElement.length).toBe(1);
        expect(textBeforeElement.text()).toBe(textBefore);
      });

      it("should NOT be rendered", () => {
        const wrapper = shallow(
          <Content onClick={mockOnClickFn} text={text} image={image} />
        );

        expect(findByTestAtrr(wrapper, "text-before").length).toBe(0);
      });
    });
  });

  describe("onClick", () => {
    it("should call onClick fn", () => {
      findByTestAtrr(wrapper, "btn").simulate("click");
      expect(mockOnClickFn.mock.calls.length).toBe(1);
    });
  });
});
