import React from "react";

import WindowContainer from "../WindowContainer";
import Context from "./Context";
import { StartProps, OptionalProps } from "../Context";

type OwnProps = {
  name: string;
  onClose: () => void;
};

type StartPropsToOmit = Pick<StartProps, "startLeft" | "startTop">;
type OmittedStartProps = Omit<StartProps, keyof StartPropsToOmit>;

export type Props = OwnProps & OmittedStartProps & Partial<OptionalProps>;
export type SWProps = Omit<Props, "name" | keyof StartProps>;

const SubWindow: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <Context {...rest} data-test="ctx">
      <WindowContainer classModifiers={["fixed"]} data-test="window">
        {children}
      </WindowContainer>
    </Context>
  );
};

export default SubWindow;
