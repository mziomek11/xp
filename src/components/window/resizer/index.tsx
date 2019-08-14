import React from "react";
import windowConfig from "../../../store/window/config";
import { RootState } from "MyTypes";
import { Dispatch } from "redux";
import { connect } from "react-redux";
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

export class WindowResizer extends React.Component<Props, State> {
  readonly state: State = {
    endX: 0,
    edgeDistanceX: 0,
    edgeDistanceY: 0
  };

  shouldComponentUpdate(nextProps: Props) {
    const { fullscreened } = this.props.windowData;
    return fullscreened !== nextProps.windowData.fullscreened;
  }

  componentWillUnmount() {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
  }

  handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const { windowData, isLeft, isBottom, resizesWidth } = this.props;
    const { left, width, top, height } = windowData;
    const { clientX, clientY } = e;
    const newState: State = { ...this.state };

    if (isBottom) newState.edgeDistanceY = clientY - top - height;
    if (resizesWidth) {
      newState.edgeDistanceX = clientX - left - (isLeft ? 0 : width);
      if (isLeft) newState.endX = left + width;
    }

    this.setState(newState);

    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
  };

  handleMouseMove = (ev: MouseEvent) => {
    const { clientX, clientY } = ev;
    const { endX, edgeDistanceX, edgeDistanceY } = this.state;
    const {
      resize,
      isLeft,
      isBottom,
      resizesWidth,
      moveAndResize
    } = this.props;
    const { top, height, width, left } = this.props.windowData;
    const newSize: { height: number; width: number } = { width, height };

    if (resizesWidth) {
      if (isLeft) newSize.width = endX - clientX + edgeDistanceX;
      else newSize.width = clientX - left - edgeDistanceX;
    }

    if (isBottom) {
      const calculatedHeight: number = clientY - top - edgeDistanceY;
      newSize.height = Math.min(calculatedHeight, window.innerHeight);
    }

    if (resizesWidth && isLeft) {
      const newLeft: number = Math.min(
        clientX - edgeDistanceX,
        endX - windowConfig.MINIMAL_SIZE
      );
      moveAndResize(newLeft, top, newSize.width, newSize.height);
    } else resize(newSize.width, newSize.height);
  };

  handleMouseUp = () => {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
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

const mapStateToProps = (state: RootState, { id }: OwnProps): StateProps => {
  return {
    windowData: state.window.byId[id]
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  { id }: OwnProps
): DispatchProps => {
  return {
    resize: (width, height) => dispatch(resize(id, width, height)),
    moveAndResize: (x, y, w, h) => dispatch(moveAndResize(id, x, y, w, h))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WindowResizer);
