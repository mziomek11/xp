import React from "react";
import { shallow } from "enzyme";

import { ContextProvider } from "./Context";
import { findByTestAtrr } from "../../../../../testingUtils";
import { deepCopy } from "../../../../utils";

const wrapper = shallow<ContextProvider>(
  <ContextProvider>
    <p data-test="child" />
  </ContextProvider>
);

const instance = wrapper.instance();

describe("Paint ContextProvider component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "context").length).toBe(1);
    });

    it("should render children", () => {
      expect(findByTestAtrr(wrapper, "child").length).toBe(1);
    });
  });

  describe("setOptions", () => {
    beforeEach(() => {
      instance.setState({
        options: { ...instance.state.options, pickColor: "red" }
      });
    });

    it("should not change anything other than options", () => {
      const lastState = deepCopy<typeof instance.state>(instance.state);
      delete lastState["options"];

      instance.setOptions({ pickColor: "blue" });
      const { options, ...rest } = instance.state;

      expect(lastState).toEqual(rest);
    });

    it("should change pick option", () => {
      type Options = typeof instance.state.options;
      const lastOptions = deepCopy<Options>(instance.state.options);
      instance.setOptions({ pickColor: "blue" });

      expect(lastOptions.pickColor).not.toBe(instance.state.options.pickColor);
    });
  });

  describe("setColor", () => {
    beforeEach(() => {
      const mockCvsCtx = { fillStyle: "a", strokeStyle: "b" } as any;
      const mockTmpCvsCtx = { fillStyle: "c", strokeStyle: "d" } as any;
      instance.setState({
        canvasCtx: mockCvsCtx,
        tempCanvasCtx: mockTmpCvsCtx
      });
    });

    it("should change canvas contexts color to primary", () => {
      const primary = "this is primary color";
      instance.setState({ primaryColor: primary, secondaryColor: "secondary" });
      instance.setColor(true);

      expect(instance.state.canvasCtx!.fillStyle).toBe(primary);
      expect(instance.state.canvasCtx!.strokeStyle).toBe(primary);

      expect(instance.state.tempCanvasCtx!.fillStyle).toBe(primary);
      expect(instance.state.tempCanvasCtx!.strokeStyle).toBe(primary);
    });

    it("should change canvas contexts color to secondary", () => {
      const secondary = "this is secondary color";
      instance.setState({ primaryColor: "prim", secondaryColor: secondary });
      instance.setColor(false);

      expect(instance.state.canvasCtx!.fillStyle).toBe(secondary);
      expect(instance.state.canvasCtx!.strokeStyle).toBe(secondary);

      expect(instance.state.tempCanvasCtx!.fillStyle).toBe(secondary);
      expect(instance.state.tempCanvasCtx!.strokeStyle).toBe(secondary);
    });
  });

  describe("clearTempCanvas", () => {
    it("should call clearRect on temp canvas with real canvas size", () => {
      const mockClearRectFn = jest.fn();
      const width = 400;
      const height = 500;
      const realCtx = { canvas: { width, height } } as any;
      const tempCtx = { clearRect: mockClearRectFn } as any;

      instance.setState({ canvasCtx: realCtx, tempCanvasCtx: tempCtx });
      instance.clearTempCanvas();

      expect(mockClearRectFn.mock.calls.length).toBe(1);
      expect(mockClearRectFn.mock.calls[0]).toEqual([0, 0, width, height]);
    });
  });
});
