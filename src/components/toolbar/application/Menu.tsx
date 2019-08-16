import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { RootState } from "MyTypes";
import { WindowById } from "../../../store/window/models";
import { toggleMinimalize } from "../../../store/window/actions";

type OwnProps = {
  ids: string[];
  closeMenu: () => void;
};

type DispatchProps = {
  toggleMinimalize: (id: string) => void;
};

type StateProps = {
  windowById: WindowById;
};

type Props = OwnProps & DispatchProps & StateProps;
type State = { isOpeningClick: boolean };

export class Menu extends React.Component<Props, State> {
  readonly state: State = {
    isOpeningClick: true
  };

  shouldComponentUpdate({ ids }: Props) {
    if (ids.length !== this.props.ids.length) return true;
    for (let i = 0; i < ids.length; i++) {
      if (ids[i] !== this.props.ids[i]) return true;
    }
    return false;
  }

  componentDidMount() {
    window.addEventListener("click", this.handleClickOutsideMenu);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.handleClickOutsideMenu);
  }

  handleClickOutsideMenu = (e: MouseEvent) => {
    const { isOpeningClick } = this.state;
    if (this.clickedOutsideMenu(e) && !isOpeningClick) this.props.closeMenu();
    else if (isOpeningClick) this.setState({ isOpeningClick: false });
  };

  clickedOutsideMenu = (e: MouseEvent) => {
    const expectedClass: string = "toolbar__application-menu-list";

    return !(e.target as Element).classList.contains(expectedClass);
  };

  handleListItemClick = (id: string) => {
    this.props.toggleMinimalize(id);
  };

  render() {
    const { ids, windowById } = this.props;
    return (
      <div className="toolbar__application-menu" data-test="menu">
        {ids.map(id => (
          <div
            className="toolbar__application-menu-item"
            key={id}
            onClick={() => this.handleListItemClick(id)}
            data-test="menu-item"
          >
            {windowById[id].name}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  windowById: state.window.byId
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  toggleMinimalize: (id: string) => dispatch(toggleMinimalize(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
