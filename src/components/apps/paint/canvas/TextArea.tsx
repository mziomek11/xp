import React, { Component } from "react";

import withContext from "../../../../hoc/withContext";
import { PaintContextType } from "ContextType";

type CtxProps = {
  paint: PaintContextType;
};

type State = {
  text: string;
};

export class TextArea extends Component<CtxProps, State> {
  readonly state: State = { text: "" };

  componentWillUnmount() {
    if (this.state.text.length > 0) this.insertTextIntoCanvas();
  }

  insertTextIntoCanvas = () => {
    const { isTransparent } = this.props.paint.options.select;

    if (!isTransparent) this.fillArea();
    this.fillText();
  };

  fillArea = () => {
    const { canvasCtx, options, setColor } = this.props.paint;
    const { size, position } = options.select;

    setColor(false);
    canvasCtx!.fillRect(position.x, position.y, size.x, size.y);
  };

  fillText = () => {
    const { text } = this.state;
    const { canvasCtx, options, setColor } = this.props.paint;
    const { position } = options.select;

    setColor(true);
    canvasCtx!.font = "12px Arial";

    const lines = text.split(/\r?\n/);
    lines.forEach((line, i) => {
      canvasCtx!.fillText(line, position.x + 1, position.y + 12 + 14 * i);
    });
  };

  getInlineStyles = (): React.CSSProperties => {
    const { primaryColor, secondaryColor, options } = this.props.paint;
    const { size, position, isTransparent } = options.select;
    const styles: React.CSSProperties = {
      left: position.x,
      top: position.y,
      width: size.x,
      height: size.y,
      color: primaryColor,
      background: isTransparent ? "transparent" : secondaryColor
    };

    return styles;
  };

  changeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ text: e.target.value });
  };

  render() {
    const { text } = this.state;
    const styles = this.getInlineStyles();

    return (
      <textarea
        onChange={this.changeChange}
        value={text}
        style={styles}
        className="paint__canvas__textarea"
        data-test="textarea"
        spellCheck={false}
        autoFocus
      />
    );
  }
}

export default withContext(TextArea, "paint");
