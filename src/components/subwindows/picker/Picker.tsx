import React from "react";

import Content, { OwnProps as ContentProps } from "./content/Content";
import SubWindow, { SWProps } from "../../window/subwindow/SubWindow";

type OwnProps = {
  name: string;
};

export type PassProps = SWProps & ContentProps;
type Props = OwnProps & PassProps;

export const Picker: React.FC<Props> = ({
  children,
  name,
  id,
  filePath,
  ...rest
}) => {
  const subWindowProps = {
    resizable: true,
    startFullscreened: false,
    startHeight: 450,
    startWidth: 450,
    name: name,
    ...rest
  };

  return (
    <SubWindow {...subWindowProps} data-test="container">
      <Content id={id} filePath={filePath} data-test="content">
        {children}
      </Content>
    </SubWindow>
  );
};

export default Picker;
