import React, { Component } from "react";

import Window from "./Window";
import withContext from "../../hoc/withContext";
import { WindowContextType } from "ContextType";
import { getClassName, areObjectsEqual } from "../../utils";
import { clickedWindow } from "../../utils/window";

type OwnProps = {
  window: WindowContextType;
  children: React.ReactNode;
  classModifiers?: string[];
};

type Props = OwnProps;
type State = {
  mouseDownAtWindow: boolean;
};

export class WindowContainer extends Component<Props, State> {
  public static defaultProps = {
    classModifiers: []
  };

  readonly state: State = {
    mouseDownAtWindow: false
  };
  componentDidMount() {
    window.addEventListener("mousedown", this.checkForMouseDownPosition);
    window.addEventListener("mouseup", this.checkForUnfocus);
  }

  componentWillUnmount() {
    window.removeEventListener("mousedown", this.checkForMouseDownPosition);
    window.removeEventListener("mouseup", this.checkForUnfocus);
  }

  shouldComponentUpdate({ window }: Props) {
    const values = [
      "width",
      "height",
      "top",
      "left",
      "focused",
      "minimalized",
      "fullscreened",
      "disabled"
    ];

    return !areObjectsEqual(this.props.window, window, values);
  }

  checkForMouseDownPosition = (e: MouseEvent) => {
    const { focused, disabled } = this.props.window;
    if (!focused || disabled) return;

    const mouseDownAtWindow = clickedWindow(
      e,
      this.props.window.left,
      this.props.window.top,
      this.props.window.width,
      this.props.window.height,
      this.props.window.fullscreened
    );

    if (this.state.mouseDownAtWindow !== mouseDownAtWindow) {
      this.setState({ mouseDownAtWindow });
    }
  };

  checkForUnfocus = (e: MouseEvent) => {
    const { window } = this.props;
    const { removeFocus, focused, disabled } = window;
    if (!focused || disabled) return;

    if (this.shouldUnfocus(e)) {
      removeFocus(e);
    }
  };

  shouldUnfocus = (e: MouseEvent) => {
    const { left, top, width, height, fullscreened } = this.props.window;
    const { mouseDownAtWindow } = this.state;
    return (
      !mouseDownAtWindow &&
      !clickedWindow(e, left, top, width, height, fullscreened) &&
      !this.clickedOnToolbarApp(e)
    );
  };

  clickedOnToolbarApp = (e: MouseEvent) => {
    const elementClassList = (e.target as Element).classList;
    if (!elementClassList[0]) return false;

    return elementClassList[0].indexOf("toolbar__application") > -1;
  };

  handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const { changePriority, focused } = this.props.window;
    if (focused) return;
    if (!(e.target as Element).classList.contains("window__action")) {
      changePriority();
    }
  };

  getClassName = () => {
    const { focused, disabled, fullscreened } = this.props.window;
    const modifiersObj = {
      focused: focused && !disabled,
      fullscreen: fullscreened,
      disabled
    };

    return getClassName("window", modifiersObj, this.props.classModifiers);
  };

  getInlineStyles = () => {
    const {
      fullscreened,
      minimalized,
      top,
      left,
      width,
      height
    } = this.props.window;

    const styles: React.CSSProperties = {
      top,
      left,
      width,
      height,
      display: "block"
    };

    if (fullscreened) {
      styles.top = 0;
      styles.left = 0;
      styles.width = "100%";
      styles.height = "100%";
    }

    if (minimalized) styles.display = "none";

    return styles;
  };

  render() {
    const { children } = this.props;
    const inlineStyles = this.getInlineStyles();
    const className = this.getClassName();

    return (
      <>
        <Window
          className={className}
          inlineStyles={inlineStyles}
          children={children}
          onMouseDown={this.handleMouseDown}
          data-test="window"
        />
      </>
    );
  }
}

export default withContext(WindowContainer, "window");
