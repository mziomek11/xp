import React from "react";

import WindowContainer from "../WindowContainer";
import Context from "./Context";
import { StartProps, OwnProps as WindowCtxOwnProps } from "../Context";

export type ParentProps = {
  width: number;
  height: number;
  left: number;
  top: number;
  fullScr: boolean;
  focused: boolean;
  changePriority: () => void;
  removeFocus: (e: MouseEvent) => void;
};

type OwnProps = {
  name: string;
  onClose: () => void;
};

export type MinMaxProps = Omit<WindowCtxOwnProps, "id">;

export type Props = OwnProps &
  MinMaxProps &
  StartProps & {
    parent: ParentProps;
  };

export type SWProps = Omit<Props, "name">;

const SubWindow: React.FC<Props> = ({ children, ...ctxProps }) => {
  return (
    <Context {...ctxProps} data-test="ctx">
      <WindowContainer classModifiers={["fixed"]} data-test="window">
        {children}
      </WindowContainer>
    </Context>
  );
};

export default SubWindow;
