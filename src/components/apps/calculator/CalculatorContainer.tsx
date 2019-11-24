import React, { Component } from "react";

import CalculatorView from "./CalculatorView";
import config from "./config";

export enum Operiation {
  Add = 1,
  Subtract = 2,
  Multiple = 3,
  Divide = 4
}

type State = {
  displayText: string;
  triedToDivideByZero: boolean;
};

class CalculatorContainer extends Component<{}, State> {
  private wasTextClearned: boolean = true;

  private lastOperation: Operiation | null = null;
  private lastNumber: number = 0;

  readonly state: State = {
    displayText: "0",
    triedToDivideByZero: false
  };

  clearMemory = () => {};

  memoryRecall = () => {};

  memoryStore = () => {};

  memoryAdd = () => {};

  backspace = () => {};

  clearAll = () => {};

  clear = () => {};

  handleValueClick = (e?: React.MouseEvent<HTMLButtonElement>) => {
    const { textContent } = e!.currentTarget;

    if (this.wasTextClearned) this.addDigitToDisplayText(textContent!);
    else this.startNewDisplayText(textContent!);
  };

  addDigitToDisplayText = (buttonValue: string) => {
    const { displayText } = this.state;
    if (displayText.length >= config.maxTextLength) return;

    let newDisplayText: string = "";

    if (displayText === "0") newDisplayText = buttonValue!;
    else newDisplayText = displayText + buttonValue;

    this.setState({ displayText: newDisplayText });
  };

  startNewDisplayText = (buttonValue: string) => {
    const parsedDisplay = parseFloat(this.state.displayText);

    this.lastNumber = parsedDisplay;
    this.wasTextClearned = true;

    this.setState({ displayText: buttonValue });
  };

  add = () => this.handleOperationClick(Operiation.Add);

  subtract = () => this.handleOperationClick(Operiation.Subtract);

  multiple = () => this.handleOperationClick(Operiation.Multiple);

  divide = () => this.handleOperationClick(Operiation.Divide);

  handleOperationClick = (operation: Operiation) => {
    this.equal();
    this.lastOperation = operation;
    this.wasTextClearned = false;
  };

  equal = () => {
    if (!this.lastOperation || !this.wasTextClearned) return;

    const newNumber = this.getOperationResult();
    this.wasTextClearned = false;
    this.lastOperation = null;

    const newNumberAsString = newNumber!.toString();
    this.setState({ displayText: newNumberAsString });
  };

  getOperationResult = (): number => {
    const currentNumber = parseFloat(this.state.displayText);
    let result = 0;
    switch (this.lastOperation) {
      case Operiation.Add:
        result = this.lastNumber + currentNumber;
        break;
      case Operiation.Subtract:
        result = this.lastNumber - currentNumber;
        break;
      case Operiation.Multiple:
        result = this.lastNumber * currentNumber;
        break;
      case Operiation.Divide:
        if (currentNumber === 0) {
          this.setState({ triedToDivideByZero: true });
          result = 0;
        } else result = this.lastNumber / currentNumber;
        break;
      default:
        throw Error("Operation failed");
    }

    return parseFloat(result.toFixed(10));
  };

  squareRoot = () => {};

  opposite = () => {};

  inverse = () => {};

  percent = () => {};

  dot = () => {
    const { displayText } = this.state;
    if (displayText.indexOf(".") === -1) {
      this.setState({ displayText: displayText + "." });
    }
  };

  render() {
    return (
      <CalculatorView
        triedToDivideByZero={this.state.triedToDivideByZero}
        displayText={this.state.displayText}
        onAddClick={this.add}
        onBackspaceClick={this.backspace}
        onClearAllClick={this.clearAll}
        onClearClick={this.clearAll}
        onClearMemoryClick={this.clearMemory}
        onDivideClick={this.divide}
        onDotClick={this.dot}
        onEqualClick={this.equal}
        onInverseClick={this.inverse}
        onMemoryAddClick={this.memoryAdd}
        onMemoryRecallClick={this.memoryRecall}
        onMemoryStoreClick={this.memoryStore}
        onMultipleClick={this.multiple}
        onOppositeClick={this.opposite}
        onPercentClick={this.percent}
        onSquareRootClick={this.squareRoot}
        onSubtractClick={this.subtract}
        onValueClick={this.handleValueClick}
        data-test="view"
      />
    );
  }
}

export default CalculatorContainer;
