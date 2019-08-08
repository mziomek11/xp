import React from "react";
import { connect } from "react-redux";

import Window from "../";
import { RootState } from "MyTypes";

type StateProps = {
  windowsIds: string[];
};

const List: React.FC<StateProps> = ({ windowsIds }) => {
  return (
    <React.Fragment>
      {windowsIds.map(id => (
        <Window id={id} key={id} />
      ))}
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    windowsIds: state.window.allIds
  };
};

export default connect(mapStateToProps)(List);
