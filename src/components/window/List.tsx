import React from "react";
import { connect } from "react-redux";

import WindowContainer from "./WindowContainer";
import FileSystem from "../apps/filesystem/FileSystem";
import { Provider as WindowContextProvider } from "./Context";
import { Provider as FilesystemContextProvider } from "../apps/filesystem/context/Context";
import { RootState } from "MyTypes";

type StateProps = {
  windowsIds: string[];
};

type Props = StateProps;

export const List: React.FC<Props> = ({ windowsIds }) => {
  return (
    <React.Fragment>
      {windowsIds.map(id => (
        <WindowContextProvider id={id} startFullscreened={false} key={id}>
          <WindowContainer data-test="window">
            <FilesystemContextProvider id={id}>
              <FileSystem />
            </FilesystemContextProvider>
          </WindowContainer>
        </WindowContextProvider>
      ))}
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  windowsIds: state.window.allIds
});

export default connect(mapStateToProps)(List);
