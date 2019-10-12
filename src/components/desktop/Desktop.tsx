import React from "react";
import { connect } from "react-redux";

import FileList from "./List";
import WindowList from "../window/List";
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
      <FileList data-test="file-list" />
      <WindowList data-test="window-list" />
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  screenHeight: state.screen.height
});

export default connect(mapStateToProps)(Desktop);
