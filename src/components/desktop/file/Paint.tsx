import React from "react";
import File from "./File";

const Paint = () => {
  return (
    <File
      name="Paint"
      startWindowName="Untilted - Paint"
      application="paint"
      openData={{
        content: "",
        path: undefined
      }}
      data-test="file"
    />
  );
};

export default Paint;
