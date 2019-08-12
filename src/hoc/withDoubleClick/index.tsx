import React from "react";

type Props = {
  onDoubleClick: () => void;
};

type State = {
  lastClickTime: number;
};

function withDoubleClick<T>(
  Component: React.ComponentType<T>,
  timeBetweenClick: number = 500
): React.ComponentClass<T & Props, State> {
  return class EnchancedComponent extends React.Component<T & Props, State> {
    readonly state: State = {
      lastClickTime: -Infinity
    };

    handleClick = () => {
      const currentTime: number = Date.now();
      const { lastClickTime } = this.state;

      if (currentTime - lastClickTime < timeBetweenClick) {
        this.setState({ lastClickTime: -Infinity });
        this.props.onDoubleClick();
      } else {
        this.setState({ lastClickTime: currentTime });
      }
    };

    render() {
      return (
        <div onClick={this.handleClick} data-test="container">
          <Component {...this.props} data-test="component" />
        </div>
      );
    }
  };
}

export default withDoubleClick;
