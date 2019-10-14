import React from "react";

const Canvas = () => {
  return (
    <div className="paint__canvas-container" data-test="canvas">
      <canvas className="paint__canvas" />
    </div>
  );
};

export default Canvas;
