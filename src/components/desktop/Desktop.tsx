import React from "react";
import { connect } from "react-redux";

import FileList from "./List";
import WindowList from "../window/List";
import { Provider as DesktopContextProvider } from "./context/Context";
import { RootState } from "MyTypes";
import { toolbarConfig } from "../../config";

type StateProps = {
  screenHeight: number;
};

export const Desktop: React.FC<StateProps> = ({ screenHeight }) => {
  const styles = {
    height: screenHeight - toolbarConfig.HEIGHT
  };

  return (
    <div className="desktop" data-test="desktop" style={styles}>
      <DesktopContextProvider>
        <FileList />
        <WindowList />
      </DesktopContextProvider>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  screenHeight: state.screen.height
});

export default connect(mapStateToProps)(Desktop);
