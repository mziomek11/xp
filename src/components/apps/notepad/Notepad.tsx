import React, { useState } from "react";

const Notepad = () => {
  const [text, setText] = useState<string>("");

  return (
    <div className="notepad">
      <textarea
        className="notepad__textarea"
        value={text}
        onChange={e => setText(e.target.value)}
      />
    </div>
  );
};

export default Notepad;
