import React, { Component } from "react";

import Options from "./Options";
import Option, { Props as OptionProps } from "./Option";
import withContext from "../../../../../hoc/withContext";
import { PaintContextType } from "ContextType";
import { Brush as BrushType, BrushSize } from "../../models";
import { getClassName } from "../../../../../utils";

type CtxProps = {
  paint: PaintContextType;
};

export class BrushOptions extends Component<CtxProps> {
  private circleClass = "paint__toolbar__options__circle";
  private squareClass = "paint__toolbar__options__square";
  private slashClass = "paint__toolbar__options__slash";

  shouldComponentUpdate(nextProps: CtxProps) {
    const { type, size } = this.props.paint.options.brush;

    return (
      type !== nextProps.paint.options.brush.type ||
      size !== nextProps.paint.options.brush.size
    );
  }

  getOptionData = (
    type: BrushType,
    size: BrushSize
  ): [OptionProps, string, React.CSSProperties] => {
    const props = this.getProps(type, size);
    const className = this.getClassName(type, size);
    const inlineStyles = this.getiInlineStyles(type, size);

    return [props, className, inlineStyles];
  };

  getProps = (ownType: BrushType, ownSize: BrushSize): OptionProps => {
    const { type, size } = this.props.paint.options.brush;

    const focused = size === ownSize && type === ownType;
    const onClick = () => this.handleClick(ownType, ownSize);

    return { focused, onClick };
  };

  handleClick = (type: BrushType, size: BrushSize) => {
    this.props.paint.setOptions({ brush: { type, size } });
  };

  getClassName = (type: BrushType, size: BrushSize): string => {
    switch (type) {
      case "circle":
        return getClassName(this.circleClass, { big: size === BrushSize.Big });
      case "rect":
        return this.squareClass;
      case "slash":
        return this.slashClass;
      case "backSlash":
        return getClassName(this.slashClass, {}, ["back"]);
      default:
        throw Error("Unknown brush type");
    }
  };

  getiInlineStyles = (
    type: BrushType,
    size: BrushSize
  ): React.CSSProperties => {
    switch (type) {
      case "rect":
        return this.getRectInlineStyles(size);
      case "circle":
        return this.getCircleInlineStyles(size);
      case "slash":
      case "backSlash":
        return this.getSlashInlineStyles(size);
      default:
        throw Error("Unknown brush type");
    }
  };

  getRectInlineStyles = (size: BrushSize) => ({ width: size, height: size });

  getCircleInlineStyles = (size: BrushSize) => ({
    height: Math.max(size - 1, 1),
    width: size === BrushSize.Small ? 1 : size === BrushSize.Medium ? 2 : 3
  });

  getSlashInlineStyles = (size: BrushSize) => ({ width: size + 1, height: 1 });

  render() {
    const types: BrushType[] = ["circle", "rect", "slash", "backSlash"];
    const sizes: BrushSize[] = [
      BrushSize.Big,
      BrushSize.Medium,
      BrushSize.Small
    ];

    return (
      <Options modifiers={["brush"]}>
        {types.map(type =>
          sizes.map(size => {
            const [props, className, style] = this.getOptionData(type, size);

            return (
              <Option {...props} key={`${type}-${size}`} data-test="option">
                <div className={className} style={style} />
              </Option>
            );
          })
        )}
      </Options>
    );
  }
}

export default withContext(BrushOptions, "paint");
