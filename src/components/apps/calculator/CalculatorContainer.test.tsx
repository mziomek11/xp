import React from "react";
import { shallow } from "enzyme";

import { Operation, CalculatorContainer } from "./CalculatorContainer";
import config from "./config";
import { findByTestAtrr } from "../../../../testingUtils";

const createWrapper = () => {
  return shallow<CalculatorContainer>(<CalculatorContainer {...({} as any)} />);
};
const wrapper = createWrapper();
const instance = wrapper.instance();

const ev = (s: string) => ({ currentTarget: { textContent: s } } as any);

describe("CalculatorContainer Component", () => {
  describe("render", () => {
    it("should render without throwing an error", () => {
      expect(findByTestAtrr(wrapper, "view").length).toBe(1);
    });
  });

  describe("addDigitToDisplayText", () => {
    describe("update state", () => {
      it("should replace 0 with another digit", () => {
        instance.setState({ displayText: "0" });
        instance.addDigitToDisplayText("4");

        expect(instance.state.displayText).toBe("4");
      });

      it("should add digit to the end", () => {
        instance.setState({ displayText: "5" });
        instance.addDigitToDisplayText("4");

        expect(instance.state.displayText).toBe("54");
      });
    });

    describe("NOT update state", () => {
      it("has too long string", () => {
        const longNum = new Array(config.maxTextLength + 1).fill("1").join();
        instance.setState({ displayText: longNum });
        instance.addDigitToDisplayText("5");

        expect(instance.state.displayText).toBe(longNum);
      });
    });
  });

  describe("startNewDisplayText", () => {
    it("should update state display to given digit", () => {
      instance.setState({ displayText: "1234.12345" });
      instance.startNewDisplayText("8");

      expect(instance.state.displayText).toBe("8");
    });
  });

  describe("operations", () => {
    let instance: CalculatorContainer;
    let mockHandleOperationClick: jest.Mock;

    beforeEach(() => {
      mockHandleOperationClick = jest.fn();
      instance = createWrapper().instance();
      instance.handleOperationClick = mockHandleOperationClick;
    });

    describe("add", () => {
      it("should call handleOperationClick with add operation", () => {
        instance.add();

        expect(mockHandleOperationClick.mock.calls.length).toBe(1);
        expect(mockHandleOperationClick.mock.calls[0]).toEqual([Operation.Add]);
      });
    });

    describe("subtract", () => {
      it("should call handleOperationClick with subtract operation", () => {
        instance.subtract();

        expect(mockHandleOperationClick.mock.calls.length).toBe(1);
        expect(mockHandleOperationClick.mock.calls[0]).toEqual([
          Operation.Subtract
        ]);
      });
    });

    describe("multiple", () => {
      it("should call handleOperationClick with multiple operation", () => {
        instance.multiple();

        expect(mockHandleOperationClick.mock.calls.length).toBe(1);
        expect(mockHandleOperationClick.mock.calls[0]).toEqual([
          Operation.Multiple
        ]);
      });
    });

    describe("divide", () => {
      it("should call handleOperationClick with divide operation", () => {
        instance.divide();

        expect(mockHandleOperationClick.mock.calls.length).toBe(1);
        expect(mockHandleOperationClick.mock.calls[0]).toEqual([
          Operation.Divide
        ]);
      });
    });
  });

  describe("handleOperationClick", () => {
    it("should call equal", () => {
      const mockEqualFn = jest.fn();
      const instance = createWrapper().instance();
      instance.equal = mockEqualFn;
      instance.handleOperationClick(1);

      expect(mockEqualFn.mock.calls.length).toBe(1);
    });
  });

  describe("equal", () => {
    it("should update state with number from getOperationResult", () => {
      const fnResult = 10;
      const mockGetOperationResultFn = jest.fn(() => fnResult);
      const instance = createWrapper().instance();

      instance.getOperationResult = mockGetOperationResultFn;
      instance.setState({ displayText: "5" });
      instance.add();
      instance.startNewDisplayText("10000");
      instance.equal();

      expect(instance.state.displayText).toBe("10");
    });
  });

  describe("making operations", () => {
    const instance = createWrapper().instance();

    it("should add numbers", () => {
      instance.handleValueClick(ev("1"));
      instance.add();
      instance.handleValueClick(ev("2"));
      instance.equal();

      expect(instance.state.displayText).toBe("3");
    });

    it("should subtract numbers", () => {
      instance.handleValueClick(ev("1"));
      instance.subtract();
      instance.handleValueClick(ev("2"));
      instance.equal();

      expect(instance.state.displayText).toBe("-1");
    });

    it("should multiple numbers", () => {
      instance.handleValueClick(ev("1"));
      instance.multiple();
      instance.handleValueClick(ev("2"));
      instance.equal();

      expect(instance.state.displayText).toBe("2");
    });

    it("should divide numbers", () => {
      instance.handleValueClick(ev("1"));
      instance.divide();
      instance.handleValueClick(ev("2"));
      instance.equal();

      expect(instance.state.triedToDivideByZero).toBe(false);
      expect(instance.state.displayText).toBe("0.5");
    });

    it("should update triedToDivideByZero", () => {
      instance.handleValueClick(ev("1"));
      instance.divide();
      instance.handleValueClick(ev("0"));
      instance.equal();

      expect(instance.state.triedToDivideByZero).toBe(true);
    });
  });

  describe("dot", () => {
    it("should add dot to the end of displayText", () => {
      instance.setState({ displayText: "123" });
      instance.dot();

      expect(instance.state.displayText).toBe("123.");
    });

    it("should NOT add dot to the end of displayText", () => {
      instance.setState({ displayText: "123." });
      instance.dot();
      expect(instance.state.displayText).toBe("123.");

      instance.setState({ displayText: "123.1" });
      instance.dot();
      expect(instance.state.displayText).toBe("123.1");
    });
  });

  describe("number manipulation", () => {
    let instance: CalculatorContainer;
    let mockSetFloatIntoText: jest.Mock;

    beforeEach(() => {
      mockSetFloatIntoText = jest.fn();
      instance = createWrapper().instance();
      instance.setFloatPointNumberIntoDisplayText = mockSetFloatIntoText;
    });

    describe("squareRoot", () => {
      it("should call setFloatPointNumberIntoDisplayText with root", () => {
        instance.setState({ displayText: "4" });
        instance.squareRoot();

        expect(mockSetFloatIntoText.mock.calls.length).toBe(1);
        expect(mockSetFloatIntoText.mock.calls[0]).toEqual([2]);
      });

      it("should wrongArgumentFunction to true", () => {
        instance.setState({ displayText: "-1", wrongFunctionArgument: false });
        instance.squareRoot();

        expect(instance.state.wrongFunctionArgument).toBe(true);
      });
    });

    describe("opposite", () => {
      it("should call update displayText with - at start", () => {
        instance.setState({ displayText: "4" });
        instance.opposite();

        expect(instance.state.displayText).toBe("-4");
      });

      it("should call displayText without - at start", () => {
        instance.setState({ displayText: "-4" });
        instance.opposite();

        expect(instance.state.displayText).toBe("4");
      });
    });

    describe("inverse", () => {
      it("should call setFloatPointNumberIntoDisplayText with inversed num", () => {
        instance.setState({ displayText: "2" });
        instance.inverse();

        expect(mockSetFloatIntoText.mock.calls.length).toBe(1);
        expect(mockSetFloatIntoText.mock.calls[0]).toEqual([0.5]);
      });

      it("should set triedToDivideByZero to true", () => {
        instance.setState({ displayText: "0", triedToDivideByZero: false });
        instance.inverse();

        expect(instance.state.triedToDivideByZero).toBe(true);
      });
    });

    describe("percent", () => {
      it("should call setFloatPointNumberIntoDisplayText with percent of last num", () => {
        instance.handleValueClick(ev("5"));
        instance.handleValueClick(ev("0"));
        instance.add();
        instance.handleValueClick(ev("10"));
        instance.percent();

        expect(mockSetFloatIntoText.mock.calls.length).toBe(1);
        expect(mockSetFloatIntoText.mock.calls[0]).toEqual([5]);
      });
    });
  });

  describe("setFloatPointNumberIntoDisplayText", () => {
    it("should update state", () => {
      instance.setState({ displayText: "1" });
      instance.setFloatPointNumberIntoDisplayText(2.01);

      expect(instance.state.displayText).toBe("2.01");
    });
  });

  describe("backspace", () => {
    const instance = createWrapper().instance();

    describe("with minus", () => {
      it("should remove one digit", () => {
        instance.setState({ displayText: "-123" });
        instance.backspace();

        expect(instance.state.displayText).toBe("-12");
      });

      it("should change to zero", () => {
        instance.setState({ displayText: "-1" });
        instance.backspace();

        expect(instance.state.displayText).toBe("0");
      });
    });

    describe("without minus", () => {
      it("should remove one digit", () => {
        instance.setState({ displayText: "123" });
        instance.backspace();

        expect(instance.state.displayText).toBe("12");
      });

      it("should change to zero", () => {
        instance.setState({ displayText: "1" });
        instance.backspace();

        expect(instance.state.displayText).toBe("0");
      });
    });
  });

  describe("clearAll", () => {
    it("should resetState expect memory and grouping", () => {
      instance.setState({
        displayText: "123",
        triedToDivideByZero: true,
        wrongFunctionArgument: true,
        groupNumbers: true,
        memory: "12345"
      });
      instance.clearAll();

      expect(instance.state).toEqual({
        displayText: "0",
        triedToDivideByZero: false,
        wrongFunctionArgument: false,
        groupNumbers: true,
        memory: "12345"
      });
    });
  });

  describe("clear", () => {
    it("should set displayText to zero", () => {
      instance.setState({ displayText: "123" });
      instance.clear();

      expect(instance.state.displayText).toBe("0");
    });
  });

  describe("memory", () => {
    describe("clearMemory", () => {
      it("should set state memory to null", () => {
        instance.setState({ memory: "123" });
        instance.clearMemory();

        expect(instance.state.memory).toBe(null);
      });
    });

    describe("memoryRecall", () => {
      it("should set state display text to '0'", () => {
        instance.setState({ displayText: "123", memory: null });
        instance.memoryRecall();

        expect(instance.state.displayText).toBe("0");
      });

      it("should set state display text to memory", () => {
        instance.setState({ displayText: "123", memory: "-15" });
        instance.memoryRecall();

        expect(instance.state.displayText).toBe("-15");
      });
    });

    describe("memoryStore", () => {
      it("should set state memory to display text", () => {
        instance.setState({ displayText: "123", memory: null });
        instance.memoryStore();

        expect(instance.state.memory).toBe("123");
      });
    });

    describe("memoryAdd", () => {
      it("should add displayText to existing memory", () => {
        instance.setState({ displayText: "2", memory: "1" });
        instance.memoryAdd();

        expect(instance.state.memory).toBe("3");
      });

      it("should set display text to memory", () => {
        instance.setState({ displayText: "2", memory: null });
        instance.memoryAdd();

        expect(instance.state.memory).toBe("2");
      });
    });
  });

  describe("toggleGroupNumbers", () => {
    it("should set groupNumbers to true", () => {
      instance.setState({ groupNumbers: false });
      instance.toggleGroupNumbers();

      expect(instance.state.groupNumbers).toBe(true);
    });

    it("should set groupNumbers to false", () => {
      instance.setState({ groupNumbers: true });
      instance.toggleGroupNumbers();

      expect(instance.state.groupNumbers).toBe(false);
    });
  });
});
