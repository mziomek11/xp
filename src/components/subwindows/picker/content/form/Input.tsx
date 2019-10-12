import React from "react";

type Props = {
  setText: (text: string) => void;
  text: string;
};

const Input: React.FC<Props> = ({ setText, text }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <input
      type="text"
      onChange={handleChange}
      value={text}
      className="picker__form__input"
      spellCheck={false}
      data-test="input"
    />
  );
};

export default Input;
