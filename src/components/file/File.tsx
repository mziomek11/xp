import React from "react";
import { withDoubleClick } from "../../hoc";

type Props = {
  name: string;
  top: number;
  left: number;
};

export const File: React.FC<Props> = ({ name, top, left }) => {
  return (
    <div className="file" style={{ left, top }} data-test="file">
      <span data-test="filename">{name}</span>
    </div>
  );
};

export default withDoubleClick(File);
