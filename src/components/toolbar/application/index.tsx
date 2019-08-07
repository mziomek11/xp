import React from "react";

type Props = {
  name: string;
};

const Application: React.FC<Props> = ({ name }) => {
  return <div className="toolbar__application">{name}</div>;
};

export default Application;
