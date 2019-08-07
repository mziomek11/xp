import React from "react";
import Action from "../action";

type Props = {
  onWindowMove: (left: number, top: number) => void;
  lastWindowX: number;
  lastWindowY: number;
  windowWidth: number;
  windowHeight: number;
  name?: string;
  onMinimalize?: () => void;
  onFullscreen?: () => void;
  onExit?: () => void;
};

type State = {
  barX: number;
  barY: number;
  maxBarX: number;
  maxBarY: number;
};

class Bar extends React.Component<Props, State> {
  readonly state: State = {
    barX: 0,
    barY: 0,
    maxBarX: 0,
    maxBarY: 0
  };

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    window.removeEventListener("mouseup", this.handleMouseUp);
    window.removeEventListener("mousemove", this.handleMouseMove);
  }

  handleMouseDown = (ev: React.MouseEvent<HTMLDivElement>) => {
    const { lastWindowX, lastWindowY, windowWidth, windowHeight } = this.props;
    const { clientX, clientY } = ev;
    const { innerWidth, innerHeight } = window;
    this.setState({
      barX: lastWindowX - clientX,
      barY: lastWindowY - clientY,
      maxBarX: innerWidth - windowWidth,
      maxBarY: innerHeight - windowHeight
    });

    window.addEventListener("mouseup", this.handleMouseUp);
    window.addEventListener("mousemove", this.handleMouseMove);
  };

  handleMouseUp = () => {
    window.addEventListener("mouseup", this.handleMouseUp);
    window.removeEventListener("mousemove", this.handleMouseMove);
  };

  handleMouseMove = (e: MouseEvent) => {
    const { barX, barY, maxBarX, maxBarY } = this.state;
    let left: number = Math.max(e.clientX + barX, 0);
    let top: number = Math.max(e.clientY + barY, 0);
    left = Math.min(left, maxBarX);
    top = Math.min(top, maxBarY);

    this.props.onWindowMove(left, top);
  };

  render() {
    const { name, onMinimalize, onFullscreen, onExit } = this.props;
    return (
      <div className="window__bar" onMouseDown={this.handleMouseDown}>
        <h4 className="window__title">{name}</h4>
        <div className="window__actions">
          <Action type={"minimalize"} onClick={onMinimalize} />
          <Action type={"fullscreen"} onClick={onFullscreen} />
          <Action type={"exit"} onClick={onExit} />
        </div>
      </div>
    );
  }
}

export default Bar;
