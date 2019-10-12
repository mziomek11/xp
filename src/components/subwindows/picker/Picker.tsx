import React from "react";
import { connect } from "react-redux";

import Content, { OwnProps as ContentProps } from "./content/Content";
import { toolbarConfig } from "../../../config";
import { RootState } from "MyTypes";
import { StartProps } from "../../window/Context";
import SubWindow, {
  SWProps,
  MinMaxProps
} from "../../window/subwindow/SubWindow";

type OwnProps = {
  name: string;
};

type StateProps = {
  screenWidth: number;
  screenHeight: number;
};

type OmittedSWProps = Omit<SWProps, keyof MinMaxProps | keyof StartProps>;
export type PassProps = OmittedSWProps & ContentProps;

type Props = StateProps & OwnProps & PassProps;

export const Picker: React.FC<Props> = ({
  children,
  screenWidth,
  screenHeight,
  name,
  id,
  filePath,
  ...subWindowProps
}) => {
  const startWidth: number = 450;
  const startHeight: number = 450;

  const startProps: StartProps = {
    startFullscreened: false,
    startHeight: startHeight,
    startWidth: startWidth,
    startLeft: 0,
    startTop: 0
  };

  const minMaxProps: MinMaxProps = {
    minWidth: startWidth,
    maxWidth: screenWidth,
    minHeight: startHeight,
    maxHeight: screenHeight - toolbarConfig.HEIGHT
  };

  const sbProps = { name, ...subWindowProps, ...startProps, ...minMaxProps };

  return (
    <SubWindow {...sbProps} data-test="container">
      <Content id={id} filePath={filePath}>
        {children}
      </Content>
    </SubWindow>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  screenWidth: state.screen.width,
  screenHeight: state.screen.height
});

export default connect(mapStateToProps)(Picker);
