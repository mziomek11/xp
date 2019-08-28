import React from "react";
import Start from "../start/Start";
import ApplicationsListContainer from "./application/ListContainer";
import Time from "../time/Time";

import { toolbarConfig } from "../../config";

const Toolbar = () => {
  const styles = { height: toolbarConfig.HEIGHT };
  return (
    <div className="toolbar" style={styles} data-test="toolbar">
      <div className="toolbar__left-side">
        <Start data-test="start" />
        <ApplicationsListContainer data-test="applications" />
      </div>
      <Time data-test="time" />
    </div>
  );
};

export default Toolbar;
