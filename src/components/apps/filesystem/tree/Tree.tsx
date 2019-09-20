import React from "react";

import ComputerNode from "./ComputerNode";
import { getClassName } from "../../../../utils";

export type OwnProps = {
  selectedPath: string[] | null;
  onClick: (path: string[]) => void;
  withToggler: boolean;
};

type StyleProps = {
  classModifers?: string[];
  showOverflowX?: boolean;
};

type Props = OwnProps & StyleProps;

const Tree: React.FC<Props> = ({
  selectedPath,
  onClick,
  withToggler,
  showOverflowX = true,
  classModifers = []
}) => {
  const treeClass = getClassName("filesystem__tree", {}, classModifers);
  const styles: React.CSSProperties = {
    overflowX: showOverflowX ? "auto" : "hidden"
  };

  return (
    <ul className={treeClass} style={styles} data-test="container">
      <ComputerNode
        onClick={onClick}
        selectedPath={selectedPath}
        withToggler={withToggler}
      />
    </ul>
  );
};

export default Tree;
