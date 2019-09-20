import React from "react";

import DefaultOption from "../default/Option";

export type OwnProps = {
  name: string;
  value: string;
};

type GroupProps = {
  isChecked: boolean;
  onClick: (name: string) => void;
};

type Props = OwnProps & GroupProps;

const Option: React.FC<Props> = ({ name, isChecked, onClick, value }) => {
  const handleClick = () => onClick(value);

  return (
    <DefaultOption
      name={name}
      isChecked={isChecked}
      onClick={handleClick}
      checkType="circle"
      data-test="option"
    />
  );
};

export default Option;
