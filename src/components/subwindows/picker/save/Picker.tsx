import React from "react";

import Picker, { PassProps as PickerProps } from "../Picker";
import Saving, { OwnProps as SavingProps } from "./Saving";

type Props = PickerProps & SavingProps;

const SavePicker: React.FC<Props> = ({
  content,
  setFilePath,
  fileType,
  ...pickerProps
}) => {
  return (
    <Picker {...pickerProps} name="Save as" data-test="picker">
      <Saving
        id={pickerProps.id}
        content={content}
        fileType={fileType}
        setFilePath={setFilePath}
      />
    </Picker>
  );
};

export default SavePicker;
