import React from "react";
import Bar from "./bar";

type Props = {
  name?: string;
};

type State = {
  top: number;
  left: number;
  width: number;
  height: number;
};

class Window extends React.Component<Props, State> {
  readonly state: State = {
    top: window.innerHeight / 2,
    left: window.innerWidth / 2,
    width: 170,
    height: 170
  };

  setPosition = (left: number, top: number) => this.setState({ top, left });

  render() {
    const { children, name } = this.props;
    const { top, left, width, height } = this.state;
    return (
      <div className="window" style={{ top, left, width, height }}>
        <Bar
          name={name}
          onWindowMove={this.setPosition}
          lastWindowX={left}
          lastWindowY={top}
          windowHeight={height}
          windowWidth={width}
        />
        {children}
      </div>
    );
  }
}

export default Window;
