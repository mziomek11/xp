import React from "react";
import { RootState } from "MyTypes";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { windowConfig, toolbarConfig } from "../../../config";
import { resize, moveAndResize } from "../../../store/window/actions";
import { Window } from "../../../store/window/models";

type OwnProps = {
  id: string;
  resizesWidth: boolean;
  resizesHeight: boolean;
  isLeft: boolean;
  isTop: boolean;
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
  endY: number;
  edgeDistanceX: number;
  edgeDistanceY: number;
};

export const initState: State = {
  endX: 0,
  endY: 0,
  edgeDistanceX: 0,
  edgeDistanceY: 0
};

export class WindowResizer extends React.Component<Props, State> {
  readonly state: State = initState;

  static defaultProps = {
    resizesWidth: false,
    resizesHeight: false,
    isLeft: false,
    isTop: false
  };

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
    const newState = this.calculateNewState(e.clientX, e.clientY);

    this.setState(newState);
    this.addListeners();
  };

  calculateNewState = (clientX: number, clientY: number): State => {
    const newStateDataX = this.calculateStateDataX(clientX);
    const newStateDataY = this.calculateStateDataY(clientY);
    const newState: State = { ...newStateDataX, ...newStateDataY };

    return newState;
  };

  calculateStateDataX = (clientX: number) => {
    const { endY, edgeDistanceY, ...calculatedStateData } = this.state;
    const { windowData, isLeft, resizesWidth } = this.props;
    const { left, width } = windowData;

    if (resizesWidth) {
      if (isLeft) calculatedStateData.endX = left + width;
      calculatedStateData.edgeDistanceX = clientX - left - (isLeft ? 0 : width);
    }

    return calculatedStateData;
  };

  calculateStateDataY = (clientY: number) => {
    const { endX, edgeDistanceX, ...calculatedStateData } = this.state;
    const { windowData, isTop, resizesHeight } = this.props;
    const { top, height } = windowData;

    if (resizesHeight) {
      if (isTop) calculatedStateData.endY = top + height;
      calculatedStateData.edgeDistanceY = clientY - top - (isTop ? 0 : height);
    }

    return calculatedStateData;
  };

  handleMouseMove = (e: MouseEvent) => {
    const convertedMousePos = this.convertMousePos(e);
    const newSize = this.calculateNewSize(convertedMousePos);
    this.changeSize(newSize);
  };

  convertMousePos = ({ clientX, clientY }: MouseEvent) => {
    const { min, max } = Math;
    const { innerHeight } = window;

    const x = clientX;
    const y = max(0, min(clientY, innerHeight - toolbarConfig.HEIGHT));

    return { x, y };
  };

  calculateNewSize = (client: {
    x: number;
    y: number;
  }): { width: number; height: number } => {
    const newWidth: number = this.calculateNewWidth(client.x);
    const newHeight: number = this.calculateNewHeight(client.y);
    const newSize = { width: newWidth, height: newHeight };

    return newSize;
  };

  calculateNewWidth = (clientX: number): number => {
    const { isLeft, resizesWidth, windowData } = this.props;
    const { endX, edgeDistanceX } = this.state;
    const { width, left } = windowData;

    let newWidth: number = width;

    if (resizesWidth) {
      if (isLeft) newWidth = endX - clientX + edgeDistanceX;
      else newWidth = clientX - left - edgeDistanceX;

      newWidth = Math.min(window.innerWidth, newWidth);
    }

    return newWidth;
  };

  calculateNewHeight = (clientY: number): number => {
    const { isTop, resizesHeight, windowData } = this.props;
    const { edgeDistanceY, endY } = this.state;
    const { top, height } = windowData;
    const { innerHeight } = window;

    let newHeight: number = height;

    if (resizesHeight) {
      if (isTop) newHeight = endY - clientY + edgeDistanceY;
      else newHeight = clientY - top - edgeDistanceY;

      newHeight = Math.min(innerHeight - toolbarConfig.HEIGHT, newHeight);
    }

    return newHeight;
  };

  changeSize = (newSize: { width: number; height: number }): void => {
    const { isTop, isLeft, moveAndResize, resize } = this.props;
    const { top, left } = this.props.windowData;
    const { endX, endY } = this.state;

    if (!isLeft && !isTop) {
      resize(newSize.width, newSize.height);
      return;
    }

    const minWidth = windowConfig.MINIMAL_WIDTH;
    const minHeight = windowConfig.MINIMAL_HEIGHT;
    const newPos: { x: number; y: number } = { x: left, y: top };

    if (isLeft) {
      newPos.x = Math.min(endX - newSize.width, endX - minWidth);
    }

    if (isTop) {
      newPos.y = Math.min(endY - newSize.height, endY - minHeight);
    }

    moveAndResize(newPos.x, newPos.y, newSize.width, newSize.height);
  };

  getClassModifier() {
    const { isTop, resizesWidth, resizesHeight, isLeft } = this.props;
    const defaultClass: string = "window__resizer";
    let newClass: string = defaultClass;

    if (resizesHeight)
      newClass += ` ${defaultClass}--${isTop ? "top" : "bottom"}`;

    if (resizesWidth)
      newClass += ` ${defaultClass}--${isLeft ? "left" : "right"}`;

    return newClass;
  }

  render() {
    if (this.props.windowData.fullscreened) return null;
    return (
      <div
        className={this.getClassModifier()}
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
