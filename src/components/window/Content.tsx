import React, { Component } from "react";

type Props = {
  children: React.ReactNode;
};

export class Content extends Component<Props, {}> {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <div className="window__content" data-test="content">
        {this.props.children}
      </div>
    );
  }
}

export default Content;
