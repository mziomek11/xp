import React from "react";

import Title from "./Title";
import withContext from "../../../hoc/withContext";
import { FilesystemContextType } from "ContextType";

type Props = {
  context: FilesystemContextType;
};

export const FilesystemTitle: React.FC<Props> = ({ context }) => {
  const { path } = context;
  const text = path.length === 0 ? "Computer" : path[path.length - 1];

  return <Title data-test="title" text={text} />;
};

export default withContext(FilesystemTitle, "filesystem");
