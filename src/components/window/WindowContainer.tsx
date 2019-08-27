import React, { Component } from "react";

import Window from "./Window";
import { WindowContextType } from "ContextType";
import { withWindowContext } from "../../hoc";

type OwnProps = {
  context: WindowContextType;
};

type Props = OwnProps;

export class WindowContainer extends Component<Props> {
  componentDidMount() {
    window.addEventListener("mousedown", this.ckeckForClickOutsideWindow);
  }

  componentWillUnmount() {
    window.removeEventListener("mousedown", this.ckeckForClickOutsideWindow);
  }

  ckeckForClickOutsideWindow = (e: MouseEvent) => {
    const { removeFocus, focused } = this.props.context;

    if (!focused) return;

    const elementClassList = (e.target as Element).classList;
    if (!elementClassList[0]) {
      removeFocus();
      return;
    }

    const clickedWindow = elementClassList[0].indexOf("window") > -1;
    if (!clickedWindow) removeFocus();
  };

  handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!(e.target as Element).classList.contains("window__action")) {
      this.props.context.changePriority();
    }
  };

  getClassName = () => {
    const { fullscreened, focused } = this.props.context;
    const defualtClassName: string = "window";
    let className: string = defualtClassName;
    if (fullscreened) className += " " + defualtClassName + "--fullscreen";
    if (focused) className += " " + defualtClassName + "--focused";

    return className;
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
    const className = this.getClassName();
    const inlineStyles = this.getInlineStyles();

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

export default withWindowContext(WindowContainer);