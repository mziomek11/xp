import React from "react";

export type Props = {
  image: string;
  text: string;
  textBefore?: string;
  onClick: () => void;
};

const Content: React.FC<Props> = ({ image, text, textBefore, onClick }) => {
  return (
    <div className="popup" data-test="popup">
      <div className="popup__divider">
        <div className="popup__left">
          <img
            src={image}
            className="popup__image"
            alt="popup icon"
            data-test="icon"
          />
        </div>
        <div className="popup__right">
          {textBefore && (
            <p className="popup__text" data-test="text-before">
              {textBefore}
            </p>
          )}
          <p className="popup__text" data-test="text">
            {text}
          </p>
        </div>
      </div>
      <div className="popup__accept">
        <button className="button" onClick={onClick} data-test="btn">
          OK
        </button>
      </div>
    </div>
  );
};

export default Content;
