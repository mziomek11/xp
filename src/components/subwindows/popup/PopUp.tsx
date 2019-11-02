import React from "react";

import SubWindow, { SWProps } from "../../window/subwindow/SubWindow";
import Content, { Props as ContentProps } from "./Content";

type OwnProps = {
  name: string;
  width: number;
  height: number;
};

type Props = OwnProps & SWProps & Omit<ContentProps, "onClick">;
export type TypedPopUpProps = Omit<Props, "name" | "image" | "onClick">;

export const PopUp: React.FC<Props> = ({
  name,
  image,
  text,
  textBefore,
  width,
  height,
  ...rest
}) => {
  const subWindowProps = {
    resizable: false,
    startFullscreened: false,
    startWidth: width,
    startHeight: height,
    name: name,
    ...rest
  };

  return (
    <SubWindow {...subWindowProps} data-test="container">
      <Content
        image={image}
        text={text}
        textBefore={textBefore}
        onClick={rest.onClose}
        data-test="content"
      />
    </SubWindow>
  );
};

export default PopUp;
