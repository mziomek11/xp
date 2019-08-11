import React from "react";
import { shallow, ShallowWrapper } from "enzyme";

import { File } from "./";
import { findByTestAtrr } from "../../../utils/testing";

describe("File Component", () => {
  let openWindowMockfn: jest.Mock;
  let comp: JSX.Element;
  let wrapper: ShallowWrapper<any, any, File>;

  beforeEach(() => {
    openWindowMockfn = jest.fn();
    comp = (
      <File name="MyFile" left={20} top={40} openWindow={openWindowMockfn} />
    );
    wrapper = shallow<File>(comp);
  });

  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "file").length).toBe(1);
    });
  });

  describe("handleClick", () => {
    it("should change state on single click", () => {
      findByTestAtrr(wrapper, "file").simulate("click");

      expect(wrapper.instance().state.lastTimeClicked == -Infinity).toBe(false);
    });

    it("should open one window and reset state on double click", () => {
      findByTestAtrr(wrapper, "file").simulate("click");
      findByTestAtrr(wrapper, "file").simulate("click");

      expect(openWindowMockfn.mock.calls.length).toBe(1);
      expect(wrapper.instance().state.lastTimeClicked == -Infinity).toBe(true);
    });

    it("should open one window and change state on triple click", () => {
      findByTestAtrr(wrapper, "file").simulate("click");
      findByTestAtrr(wrapper, "file").simulate("click");
      findByTestAtrr(wrapper, "file").simulate("click");

      expect(openWindowMockfn.mock.calls.length).toBe(1);
      expect(wrapper.instance().state.lastTimeClicked == -Infinity).toBe(false);
    });

    it("should open two windows and reset state on quadra click", () => {
      findByTestAtrr(wrapper, "file").simulate("click");
      findByTestAtrr(wrapper, "file").simulate("click");
      findByTestAtrr(wrapper, "file").simulate("click");
      findByTestAtrr(wrapper, "file").simulate("click");

      expect(openWindowMockfn.mock.calls.length).toBe(2);
      expect(wrapper.instance().state.lastTimeClicked == -Infinity).toBe(true);
    });

    it("should NOT open window when second click is too late", async () => {
      findByTestAtrr(wrapper, "file").simulate("click");
      await new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 600);
      });

      findByTestAtrr(wrapper, "file").simulate("click");
      expect(openWindowMockfn.mock.calls.length).toBe(0);
    });
  });
});
