import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { powerOff } from "../../../../store/power/actions";

type DispatchProps = {
  powerOff: VoidFunction;
};

export const Shutdown: React.FC<DispatchProps> = ({ powerOff }) => {
  return (
    <div
      className="start__bottom__action"
      onClick={powerOff}
      data-test="shutdown"
    >
      <div className="start__bottom__icon start__bottom__icon--shutdown" />
      Turn off computer
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  powerOff: () => dispatch(powerOff())
});

export default connect(null, mapDispatchToProps)(Shutdown);
