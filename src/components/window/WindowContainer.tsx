import React, { Component } from "react";

import Window from "./Window";
import withContext from "../../hoc/withContext";
import { WindowContextType } from "ContextType";
import { getClassName, areObjectsEqual } from "../../utils";

type OwnProps = {
  context: WindowContextType;
  children: React.ReactNode;
};

type Props = OwnProps;
type State = {
  mouseDownAtWindow: boolean;
};

export class WindowContainer extends Component<Props, State> {
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

  shouldComponentUpdate({ context }: Props) {
    const values = [
      "width",
      "height",
      "top",
      "left",
      "focused",
      "minimalized",
      "fullscreened"
    ];

    return !areObjectsEqual(this.props.context, context, values);
  }

  checkForMouseDownPosition = (e: MouseEvent) => {
    if (!this.props.context.focused) return;

    const mouseDownAtWindow = this.clickedWindow(e);
    if (this.state.mouseDownAtWindow !== mouseDownAtWindow) {
      this.setState({ mouseDownAtWindow });
    }
  };

  checkForUnfocus = (e: MouseEvent) => {
    const { context } = this.props;
    const { removeFocus, focused } = context;
    if (!focused) return;

    if (this.shouldUnfocus(e)) {
      removeFocus();
    }
  };

  shouldUnfocus = (e: MouseEvent) => {
    const { mouseDownAtWindow } = this.state;
    return (
      !mouseDownAtWindow &&
      !this.clickedWindow(e) &&
      !this.clickedOnToolbarApp(e)
    );
  };

  clickedWindow = ({ clientX, clientY }: MouseEvent) => {
    const { left, top, width, height, fullscreened } = this.props.context;
    if (fullscreened) return true;

    const isXProper = clientX >= left && clientX <= left + width;
    const isYProper = clientY >= top && clientY <= top + height;

    return isXProper && isYProper;
  };

  clickedOnToolbarApp = (e: MouseEvent) => {
    const elementClassList = (e.target as Element).classList;
    if (!elementClassList[0]) return false;

    return elementClassList[0].indexOf("toolbar__application") > -1;
  };

  handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!(e.target as Element).classList.contains("window__action")) {
      this.props.context.changePriority();
    }
  };

  getClassName = () => {
    const { focused, fullscreened } = this.props.context;
    const modifiersObj = { focused, fullscreen: fullscreened };

    return getClassName("window", modifiersObj);
  };

  getInlineStyles = () => {
    const {
      fullscreened,
      minimalized,
      top,
      left,
      width,
      height
    } = this.props.context;

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
      <Window
        className={className}
        inlineStyles={inlineStyles}
        children={children}
        onMouseDown={this.handleMouseDown}
        data-test="window"
      />
    );
  }
}

export default withContext(WindowContainer, "window");
