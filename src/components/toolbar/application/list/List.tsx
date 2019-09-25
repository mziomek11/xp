import React from "react";

import SelectApplication from "../SelectApplication";
import Application from "../Application";

type Props = {
  appWidth: number;
  multipleApps: { [appName: string]: string[] };
  singleApps: string[];
};

const List: React.FC<Props> = ({ appWidth, multipleApps, singleApps }) => {
  return (
    <div className="toolbar__applications" data-test="list">
      {Object.keys(multipleApps).map(key => (
        <SelectApplication
          application={key}
          key={key}
          ids={multipleApps[key]}
          width={appWidth}
          data-test="select-application"
        />
      ))}
      {singleApps.map(id => (
        <Application
          id={id}
          key={id}
          width={appWidth}
          data-test="application"
        />
      ))}
    </div>
  );
};

export default List;
