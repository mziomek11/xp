import React, { Component } from "react";

import ArrowLeft from "./ArrowLeft";
import ArrowRight from "./ArrowRight";
import HistoryArrow from "./HistoryArrow";
import withContext from "../../../../../hoc/withContext";
import { FilesystemContextType } from "ContextType";
import { getClassName, areArraysEqual } from "../../../../../utils";

export type DirectionArrowProps = {
  disabled: boolean;
  containerClass: string;
  onClick: any;
  historyArrow: JSX.Element;
};

type Props = {
  isLeft: boolean;
  context: FilesystemContextType;
};

type State = {
  isOpen: boolean;
};

export class Arrow extends Component<Props, State> {
  readonly state: State = {
    isOpen: false
  };

  shouldComponentUpdate({ context }: Props, prevState: State) {
    const { shortcuts, history, historyPosition } = this.props.context;
    const { back, forward } = shortcuts;

    if (prevState.isOpen !== this.state.isOpen) return true;
    if (context.shortcuts.back.disabled !== back.disabled) return true;
    if (context.shortcuts.forward.disabled !== forward.disabled) return true;
    if (historyPosition !== context.historyPosition) return true;
    if (!areArraysEqual(history, context.history)) return true;

    for (let i = 0; i < history.length; i++) {
      if (!areArraysEqual(history[i], context.history[i])) return true;
    }

    return false;
  }

  setOpen = (value: boolean) => this.setState({ isOpen: value });

  handleClick = (
    { target }: React.MouseEvent<HTMLDivElement>,
    container: Element,
    arrow: Element,
    text: Element | null = null
  ) => {
    const { isLeft, context } = this.props;
    const { back, forward } = context.shortcuts;

    const shouldChange = this.shouldChangeHistory(
      target as Element,
      container,
      arrow,
      text
    );

    if (shouldChange) {
      if (isLeft) back.emit();
      else forward.emit();
    }
  };

  shouldChangeHistory = (
    target: Element,
    container: Element,
    arrow: Element,
    text: Element | null
  ) => {
    if (this.isDisabled()) return false;

    const isContainer = target.isEqualNode(container);
    const isArrow = target.isEqualNode(arrow);
    const isText = text && target.isEqualNode(text);

    return isContainer || isArrow || isText;
  };

  getContainerClassName = (disabled: boolean) => {
    const baseClass = "filesystem__action";
    const modifiers = { disabled, open: this.state.isOpen };
    const baseModifiers = ["with-arrow"];

    return getClassName(baseClass, modifiers, baseModifiers);
  };

  getOptionsData = () => {
    const { isLeft, context } = this.props;
    const { historyPosition, getLocationOptions, history } = context;

    const start = historyPosition + (isLeft ? -1 : 1);
    const end = isLeft ? 0 : history.length;

    return getLocationOptions(start, end, !isLeft);
  };

  isDisabled = () => {
    const { isLeft, context } = this.props;
    const { back, forward } = context.shortcuts;

    return isLeft ? back.disabled : forward.disabled;
  };

  render() {
    const disabled = this.isDisabled();
    const containerClass = this.getContainerClassName(disabled);
    const dropdownOptions = this.getOptionsData();

    const historyArrow = (
      <HistoryArrow
        disabled={disabled}
        dropdownOptions={dropdownOptions}
        isOpen={this.state.isOpen}
        setOpen={this.setOpen}
      />
    );

    const arrowProps = {
      disabled,
      containerClass,
      onClick: this.handleClick,
      historyArrow
    };

    if (this.props.isLeft) {
      return <ArrowLeft {...arrowProps} data-test="arrow-left" />;
    }
    return <ArrowRight {...arrowProps} data-test="arrow-right" />;
  }
}

export default withContext(Arrow, "filesystem");
