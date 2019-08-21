import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import Bar from "./bar/Bar";
import Resizers from "./resizer/List";
import { RootState } from "MyTypes";
import {
  changePriority,
  toggleFullscreen,
  removeFocus
} from "../../store/window/actions";

type OwnProps = {
  id: string;
};

type DispatchProps = {
  changePriority: () => void;
  toggleFullscreen: () => void;
  removeFocus: () => void;
};

type StateProps = {
  top: number;
  left: number;
  width: number;
  height: number;
  minimalized: boolean;
  fullscreened: boolean;
  focused: boolean;
};

type Props = OwnProps & StateProps & DispatchProps;

export class Window extends React.Component<Props, {}> {
  componentDidMount() {
    window.addEventListener("mousedown", this.ckeckForClickOutsideWindow);
  }

  componentWillUnmount() {
    window.removeEventListener("mousedown", this.ckeckForClickOutsideWindow);
  }

  ckeckForClickOutsideWindow = (e: MouseEvent) => {
    if (!this.props.focused) return;

    const elementClassList = (e.target as Element).classList;
    if (!elementClassList[0]) {
      this.props.removeFocus();
      return;
    }

    const clickedWindow = elementClassList[0].indexOf("window") > -1;
    if (!clickedWindow) {
      this.props.removeFocus();
    }
  };

  handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!(e.target as Element).classList.contains("window__action")) {
      this.props.changePriority();
    }
  };

  getClassName = () => {
    const { fullscreened, focused } = this.props;
    const defualtClassName: string = "window";
    let className: string = defualtClassName;
    if (fullscreened) className += " " + defualtClassName + "--fullscreen";
    if (focused) className += " " + defualtClassName + "--focused";

    return className;
  };

  getInlineStyles = () => {
    const { fullscreened, minimalized, top, left, width, height } = this.props;
    return {
      top: fullscreened ? 0 : top,
      left: fullscreened ? 0 : left,
      width: fullscreened ? "100%" : width,
      height: fullscreened ? "100%" : height,
      display: minimalized ? "none" : "block"
    };
  };

  render() {
    const { children, id, toggleFullscreen } = this.props;
    return (
      <div
        className={this.getClassName()}
        style={this.getInlineStyles()}
        data-test="window"
        onMouseDown={this.handleMouseDown}
      >
        <Bar id={id} data-test="bar" onDoubleClick={toggleFullscreen} />
        <div className="window__content" data-test="content">
          {children}
        </div>
        <Resizers id={id} data-test="resizers" />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState, { id }: OwnProps) => {
  const window = state.window.byId[id];
  const focused = state.window.focused === id;
  const { left, top, width, height, minimalized, fullscreened } = window;
  return { left, top, width, height, minimalized, fullscreened, focused };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  { id }: OwnProps
): DispatchProps => ({
  changePriority: () => dispatch(changePriority(id)),
  toggleFullscreen: () => dispatch(toggleFullscreen(id)),
  removeFocus: () => dispatch(removeFocus())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Window);
