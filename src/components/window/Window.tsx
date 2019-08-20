import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import Bar from "./bar/Bar";
import Resizers from "./resizer/List";
import { changePriority, toggleFullscreen } from "../../store/window/actions";
import { RootState } from "MyTypes";

type OwnProps = {
  id: string;
};

type DispatchProps = {
  changePriority: () => void;
  toggleFullscreen: () => void;
};

type StateProps = {
  top: number;
  left: number;
  width: number;
  height: number;
  minimalized: boolean;
  fullscreened: boolean;
};

type Props = OwnProps & StateProps & DispatchProps;

export class Window extends React.Component<Props, {}> {
  handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!(e.target as Element).classList.contains("window__action")) {
      this.props.changePriority();
    }
  };

  getStyles = () => {
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
        className={`window${
          this.props.fullscreened ? " window--fullscreen" : ""
        }`}
        style={this.getStyles()}
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

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  const window = state.window.byId[ownProps.id];
  const { left, top, width, height, minimalized, fullscreened } = window;
  return { left, top, width, height, minimalized, fullscreened };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  { id }: OwnProps
): DispatchProps => ({
  changePriority: () => dispatch(changePriority(id)),
  toggleFullscreen: () => dispatch(toggleFullscreen(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Window);
