import React from "react";
import { shallow } from "enzyme";

import { ContextProvider } from "./Context";
import { WindowContextType } from "ContextType";
import { windowConfig } from "../../config";
import { findByTestAtrr } from "../../../testingUtils";

const ownProps = {
  id: "window-id",
  startFullscreened: false
};

const stateProps = {
  name: "WindowName",
  focused: true,
  minimalized: false
};

const dispatchProps = {
  toggleMinimalize: jest.fn(),
  changePriority: jest.fn(),
  close: jest.fn(),
  removeFocus: jest.fn(),
  setContext: jest.fn()
};

const state = {
  width: windowConfig.INITIAL_WIDTH,
  height: windowConfig.INITIAL_HEIGHT,
  left: windowConfig.INITIAL_LEFT,
  top: windowConfig.INITIAL_TOP,
  fullscreened: false
};

export const testContextData: WindowContextType = {
  ...stateProps,
  ...dispatchProps,
  ...state
};

const props = { ...ownProps, ...dispatchProps, ...stateProps };
const wrapper = shallow(<ContextProvider {...props} />);

describe("WindowContextProvider", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "context").length).toBe(1);
    });
  });
});
