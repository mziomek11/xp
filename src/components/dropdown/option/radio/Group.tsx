import React from "react";

import RadioOption, { OwnProps as RadioOptionType } from "./Option";

type Props = {
  onClick: (value: string) => void;
  checkedValue: string;
  options: RadioOptionType[];
};

const Group: React.FC<Props> = ({ onClick, options, checkedValue }) => {
  return (
    <>
      {options.map(({ name, value }) => (
        <RadioOption
          name={name}
          value={value}
          isChecked={checkedValue === value}
          onClick={onClick}
          key={name}
          data-test="option"
        />
      ))}
    </>
  );
};

export default Group;
