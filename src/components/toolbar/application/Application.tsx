import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { RootState } from "MyTypes";
import { toggleMinimalize } from "../../../store/window/actions";

type OwnProps = {
  id: string;
  width: number;
};

type StateProps = {
  name: string;
};

type DispatchProps = {
  toggleMinimalize: () => void;
};

type Props = OwnProps & StateProps & DispatchProps;

export class Application extends React.Component<Props, {}> {
  handleClick = () => this.props.toggleMinimalize();

  render() {
    const { name, width } = this.props;
    return (
      <div
        className="toolbar__application"
        onClick={this.handleClick}
        style={{ width }}
        data-test="application"
      >
        <span className="toolbar__application-text" data-test="text">
          {name}
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState, { id }: OwnProps): StateProps => ({
  name: state.window.byId[id].name
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  { id }: OwnProps
): DispatchProps => ({
  toggleMinimalize: () => dispatch(toggleMinimalize(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Application);
