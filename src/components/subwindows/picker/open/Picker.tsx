import React from "react";

import Picker, { PassProps as PickerProps } from "../Picker";
import Open, { OwnProps as OpenProps } from "./Open";

type Props = PickerProps & OpenProps;

const OpenPicker: React.FC<Props> = ({ fileType, ...pickerProps }) => {
  return (
    <Picker {...pickerProps} name="Open" data-test="picker">
      <Open id={pickerProps.id} fileType={fileType} />
    </Picker>
  );
};

export default OpenPicker;
