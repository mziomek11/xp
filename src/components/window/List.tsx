import React from "react";
import { connect } from "react-redux";

import WindowContainer from "./WindowContainer";
import { Provider as WindowContextProvider } from "./Context";
import { RootState } from "MyTypes";

type StateProps = {
  windowsIds: string[];
};

type Props = StateProps;

export const List: React.FC<Props> = ({ windowsIds }) => {
  return (
    <React.Fragment>
      {windowsIds.map(id => (
        <WindowContextProvider id={id} key={id} startFullscreened={false}>
          <WindowContainer data-test="window" />
        </WindowContextProvider>
      ))}
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  windowsIds: state.window.allIds
});

export default connect(mapStateToProps)(List);
