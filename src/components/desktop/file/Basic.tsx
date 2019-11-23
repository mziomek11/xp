import React from "react";

import File from "./File";
import { Application } from "../../../store/models";
import { capitalize } from "../../../utils";

type Props = {
  app: Application;
};

const Basic: React.FC<Props> = ({ app }) => {
  const capitalizedApp = capitalize(app);
  return (
    <File
      name={capitalizedApp}
      startWindowName={capitalizedApp}
      application={app}
      data-test="file"
    />
  );
};

export default Basic;
