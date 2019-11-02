import React from "react";

import PopUp, { TypedPopUpProps } from "./PopUp";

import errorImage from "../../../assets/popup/error.png";

const ErrorPopUp: React.FC<TypedPopUpProps> = props => {
  return (
    <PopUp
      textBefore="An error occured:"
      image={errorImage}
      name="Error"
      {...props}
      data-test="error"
    />
  );
};

export default ErrorPopUp;
