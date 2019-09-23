import React from "react";

type Props = {
  text: string;
};

const Title: React.FC<Props> = ({ text }) => {
  return (
    <h4 className="window__title" data-test="title">
      {text}
    </h4>
  );
};

export default Title;
