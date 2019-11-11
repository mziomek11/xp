import React, { Component } from "react";

import Options from "./Options";
import Option, { Props as OptionProps } from "./Option";
import withContext from "../../../../../hoc/withContext";
import { PaintContextType } from "ContextType";

import defaultImage from "../../../../../assets/paint/select.png";
import transparentImage from "../../../../../assets/paint/select-transparent.png";

type CtxProps = {
  paint: PaintContextType;
};

type ImageProps = {
  src: string;
  className: string;
  alt: string;
};

export class TransparencyOptions extends Component<CtxProps> {
  private transparencyClass = "paint__toolbar__options__transparency";

  shouldComponentUpdate(nextProps: CtxProps) {
    const { isTransparent } = this.props.paint.options.select;

    return isTransparent !== nextProps.paint.options.select.isTransparent;
  }

  getOptionData = (isTransparent: boolean): [OptionProps, ImageProps] => {
    const optionProps = this.getOptionProps(isTransparent);
    const imageProps = this.getImageProps(isTransparent);

    return [optionProps, imageProps];
  };

  getOptionProps = (isTransparent: boolean) => {
    const { select } = this.props.paint.options;

    const focused = isTransparent === select.isTransparent;
    const onClick = () => this.handleClick(isTransparent);

    return { focused, onClick };
  };

  getImageProps = (isTransparent: boolean): ImageProps => {
    const src = isTransparent ? transparentImage : defaultImage;
    const alt = `${isTransparent ? "" : "no "}transparency`;
    const className = this.transparencyClass;

    return { src, alt, className };
  };

  handleClick = (isTransparent: boolean) => {
    this.props.paint.setSelectOptions({ isTransparent });
  };

  render() {
    const transparencyArray: boolean[] = [false, true];

    return (
      <Options>
        {transparencyArray.map(isTransparent => {
          const key = isTransparent ? "t" : "f";
          const [optionsProps, { alt, ...imgProps }] = this.getOptionData(
            isTransparent
          );

          return (
            <Option {...optionsProps} key={key} data-test="option">
              <img alt={alt} {...imgProps} />
            </Option>
          );
        })}
      </Options>
    );
  }
}

export default withContext(TransparencyOptions, "paint");
