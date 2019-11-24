import React from "react";
import { shallow } from "enzyme";

import Container, { Operiation } from "./CalculatorContainer";
import config from "./config";
import { findByTestAtrr } from "../../../../testingUtils";

const createWrapper = () => shallow<Container>(<Container />);
const wrapper = createWrapper();
const instance = wrapper.instance();

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
    let instance: Container;
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
        expect(mockHandleOperationClick.mock.calls[0]).toEqual([
          Operiation.Add
        ]);
      });
    });

    describe("subtract", () => {
      it("should call handleOperationClick with subtract operation", () => {
        instance.subtract();

        expect(mockHandleOperationClick.mock.calls.length).toBe(1);
        expect(mockHandleOperationClick.mock.calls[0]).toEqual([
          Operiation.Subtract
        ]);
      });
    });

    describe("multiple", () => {
      it("should call handleOperationClick with multiple operation", () => {
        instance.multiple();

        expect(mockHandleOperationClick.mock.calls.length).toBe(1);
        expect(mockHandleOperationClick.mock.calls[0]).toEqual([
          Operiation.Multiple
        ]);
      });
    });

    describe("divide", () => {
      it("should call handleOperationClick with divide operation", () => {
        instance.divide();

        expect(mockHandleOperationClick.mock.calls.length).toBe(1);
        expect(mockHandleOperationClick.mock.calls[0]).toEqual([
          Operiation.Divide
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
    const ev = (s: string) => ({ currentTarget: { textContent: s } } as any);
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
});
