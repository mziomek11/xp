import React from "react";
import File from "./File";

const Notepad = () => {
  return (
    <File
      name="Notepad"
      startWindowName="Untilted - Notepad"
      application="notepad"
      openData={{
        content: "",
        path: undefined
      }}
      data-test="file"
    />
  );
};

export default Notepad;
