import React from "react";
import File from "./File";

const Computer = () => {
  return (
    <File
      name="Computer"
      startWindowName="Computer"
      application="filesystem"
      data-test="file"
    />
  );
};

export default Computer;
