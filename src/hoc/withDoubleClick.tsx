import React from "react";

type State = {
  lastClickTime: number;
};

function withDoubleClick<T>(
  Component: React.ComponentType<T>,
  timeBetweenClick: number = 500
): React.ComponentClass<Omit<T, "checkForDoubleClick">, State> {
  return class EnchancedComponent extends React.Component<
    Omit<T, "checkForDoubleClick">,
    State
  > {
    readonly state: State = {
      lastClickTime: -Infinity
    };

    checkForDoubleClick = (onDoubleClick: () => void) => {
      const currentTime: number = Date.now();
      const { lastClickTime } = this.state;

      if (currentTime - lastClickTime < timeBetweenClick) {
        this.setState({ lastClickTime: -Infinity });
        onDoubleClick();
      } else {
        this.setState({ lastClickTime: currentTime });
      }
    };

    render() {
      return (
        <Component
          {...(this.props as any)}
          checkForDoubleClick={this.checkForDoubleClick}
          data-test="component"
        />
      );
    }
  };
}

export default withDoubleClick;
