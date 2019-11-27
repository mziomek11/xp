import React from "react";
import { connect } from "react-redux";

import { RootState } from "MyTypes";

import Screen from "./components/screen/Screen";

type StateProps = {
  powerOn: boolean;
};

export const App: React.FC<StateProps> = ({ powerOn }) => {
  return powerOn ? (
    <Screen data-test="screen" />
  ) : (
    <div className="app__off" data-test="off" />
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  powerOn: state.power.on
});

export default connect(mapStateToProps)(App);
