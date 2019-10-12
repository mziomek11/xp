import React from "react";
import { shallow } from "enzyme";

import { ContextProvider } from "./Context";
import { WindowContextType } from "ContextType";
import { windowConfig, toolbarConfig } from "../../config";
import { findByTestAtrr } from "../../../testingUtils";

const ownProps = {
  id: "window-id",
  minWidth: windowConfig.MINIMAL_WIDTH,
  maxWidth: window.innerWidth,
  minHeight: windowConfig.MINIMAL_HEIGHT,
  maxHeight: window.innerHeight - toolbarConfig.HEIGHT
};

const startProps = {
  startFullscreened: false,
  startWidth: windowConfig.INITIAL_WIDTH,
  startHeight: windowConfig.INITIAL_HEIGHT,
  startLeft: window.innerWidth / 2 - windowConfig.INITIAL_WIDTH / 2,
  startTop: window.innerHeight / 2 - windowConfig.INITIAL_HEIGHT / 2
};

const stateProps = {
  name: "WindowName",
  icon: "icon",
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

const optionalProps = {
  hideMinimalize: false,
  hideFullscreen: false,
  hideExit: false,
  hideIcon: false,
  staticWindowName: null
};

const state = {
  width: windowConfig.INITIAL_WIDTH,
  height: windowConfig.INITIAL_HEIGHT,
  left: window.innerWidth / 2 - windowConfig.INITIAL_WIDTH / 2,
  top: window.innerHeight / 2 - windowConfig.INITIAL_HEIGHT / 2,
  fullscreened: false,
  disabled: false,
  resizing: false
};

export const testContextData: WindowContextType = {
  ...ownProps,
  ...startProps,
  ...stateProps,
  ...dispatchProps,
  ...state,
  ...optionalProps,
  getSubWindowProps: jest.fn() as any
};

const props = { ...ownProps, ...dispatchProps, ...stateProps, ...startProps };
const wrapper = shallow(<ContextProvider {...props} />);

describe("WindowContextProvider", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "context").length).toBe(1);
    });
  });
});
