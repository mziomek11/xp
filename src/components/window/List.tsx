import React from "react";
import { connect } from "react-redux";

import Window from "./Window";
import { RootState } from "MyTypes";

type StateProps = {
  windowsIds: string[];
};

type Props = StateProps;

export const List: React.FC<Props> = ({ windowsIds }) => {
  return (
    <React.Fragment>
      {windowsIds.map(id => (
        <Window id={id} key={id} data-test="window" />
      ))}
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  windowsIds: state.window.allIds
});

export default connect(mapStateToProps)(List);
