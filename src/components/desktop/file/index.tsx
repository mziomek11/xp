import React from "react";

type Props = {
  name: string;
  top: number;
  left: number;
};

const File: React.FC<Props> = ({ name, left, top }) => {
  return (
    <div className="file" style={{ left, top }}>
      {name}
    </div>
  );
};

export default File;
