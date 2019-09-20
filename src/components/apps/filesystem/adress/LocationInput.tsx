import React, { forwardRef } from "react";

type Props = {
  text: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnterPress: () => void;
};

type Ref = HTMLInputElement;

const LocationInput = forwardRef<Ref, Props>(
  ({ text, onChange, onEnterPress }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") onEnterPress();
    };

    return (
      <input
        type="text"
        className="filesystem__location-input"
        data-test="input"
        value={text}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        ref={ref}
      />
    );
  }
);

export default LocationInput;
