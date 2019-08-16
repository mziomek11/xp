import React from "react";
import { RootState } from "MyTypes";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { windowConfig } from "../../../config";
import { resize, moveAndResize } from "../../../store/window/actions";
import { Window } from "../../../store/window/models";

type OwnProps = {
  id: string;
  resizesWidth: boolean;
  isLeft: boolean;
  isBottom: boolean;
};

type StateProps = {
  windowData: Window;
};

type DispatchProps = {
  resize: (width: number, height: number) => {};
  moveAndResize: (x: number, y: number, w: number, h: number) => {};
};

type Props = OwnProps & StateProps & DispatchProps;

type State = {
  endX: number;
  edgeDistanceX: number;
  edgeDistanceY: number;
};

export const initState: State = {
  endX: 0,
  edgeDistanceX: 0,
  edgeDistanceY: 0
};

export class WindowResizer extends React.Component<Props, State> {
  readonly state: State = initState;

  shouldComponentUpdate(nextProps: Props) {
    const { fullscreened } = this.props.windowData;
    return fullscreened !== nextProps.windowData.fullscreened;
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  addListeners = () => {
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.removeListeners);
  };

  removeListeners = () => {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.removeListeners);
  };

  handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const newState = this.calculateNewState(e);

    this.setState(newState);
    this.addListeners();
  };

  calculateNewState = (e: React.MouseEvent<HTMLDivElement>): State => {
    const { windowData, isLeft, isBottom, resizesWidth } = this.props;
    const { left, width, top, height } = windowData;
    const newState: State = { ...this.state };

    if (isBottom) newState.edgeDistanceY = e.clientY - top - height;
    if (resizesWidth) {
      if (isLeft) newState.endX = left + width;
      newState.edgeDistanceX = e.clientX - left - (isLeft ? 0 : width);
    }

    return newState;
  };

  handleMouseMove = (e: MouseEvent) => {
    const { width, height } = this.calculateNewSize(e);
    this.changeSize(e, width, height);
  };

  calculateNewSize = (e: MouseEvent): { width: number; height: number } => {
    const { endX, edgeDistanceX, edgeDistanceY } = this.state;
    const { isLeft, isBottom, resizesWidth, windowData } = this.props;
    const { top, height, width, left } = windowData;

    const newSize: { height: number; width: number } = { width, height };

    if (resizesWidth) {
      if (isLeft) newSize.width = endX - e.clientX + edgeDistanceX;
      else newSize.width = e.clientX - left - edgeDistanceX;
    }

    if (isBottom) {
      const calculatedHeight: number = e.clientY - top - edgeDistanceY;
      newSize.height = Math.min(calculatedHeight, window.innerHeight);
    }

    return newSize;
  };

  changeSize = (e: MouseEvent, width: number, height: number) => {
    const { resizesWidth, isLeft, moveAndResize, resize } = this.props;
    const { edgeDistanceX, endX } = this.state;
    const { top } = this.props.windowData;

    if (!resizesWidth || !isLeft) resize(width, height);
    else {
      const minSize = windowConfig.MINIMAL_SIZE;
      const newLeft = Math.min(e.clientX - edgeDistanceX, endX - minSize);
      moveAndResize(newLeft, top, width, height);
    }
  };

  getClassModifier() {
    const { isBottom, resizesWidth, isLeft } = this.props;
    let classModifier: string = "";

    if (isBottom) classModifier = "bottom" + (resizesWidth ? "-" : "");
    if (resizesWidth) classModifier += isLeft ? "left" : "right";

    return classModifier;
  }

  render() {
    if (this.props.windowData.fullscreened) return null;
    return (
      <div
        className={`window__resizer window__resizer--${this.getClassModifier()}`}
        data-test="resizer"
        onMouseDown={this.handleMouseDown}
      />
    );
  }
}

const mapStateToProps = (state: RootState, { id }: OwnProps): StateProps => ({
  windowData: state.window.byId[id]
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  { id }: OwnProps
): DispatchProps => ({
  resize: (width, height) => dispatch(resize(id, width, height)),
  moveAndResize: (x, y, w, h) => dispatch(moveAndResize(id, x, y, w, h))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WindowResizer);
