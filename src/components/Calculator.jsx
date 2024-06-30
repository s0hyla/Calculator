// src/components/Calculator.js
import { useState } from "react";
import Display from "./Display";
import Button from "./Button";
import "./Calculator.css"; // Add CSS for styling

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState("0");
  const [operator, setOperator] = useState(null);
  const [firstOperand, setFirstOperand] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const handleButtonClick = (label) => {
    if (!isNaN(label)) {
      handleNumber(label);
    } else {
      handleOperator(label);
    }
  };

  const handleNumber = (number) => {
    if (waitingForSecondOperand) {
      setDisplayValue(number);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === "0" ? number : displayValue + number);
    }
  };

  const handleOperator = (nextOperator) => {
    if (nextOperator === "=") {
      performCalculation();
      return;
    }

    if (operator && waitingForSecondOperand) {
      setOperator(nextOperator);
      return;
    }

    if (firstOperand == null) {
      setFirstOperand(parseFloat(displayValue));
    } else if (operator) {
      const newValue = calculate(
        firstOperand,
        parseFloat(displayValue),
        operator
      );
      setDisplayValue(String(newValue));
      setFirstOperand(newValue);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (firstOperand, secondOperand, operator) => {
    switch (operator) {
      case "+":
        return firstOperand + secondOperand;
      case "-":
        return firstOperand - secondOperand;
      case "*":
        return firstOperand * secondOperand;
      case "/":
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  const performCalculation = () => {
    if (firstOperand != null && operator != null && !waitingForSecondOperand) {
      const newValue = calculate(
        firstOperand,
        parseFloat(displayValue),
        operator
      );
      setDisplayValue(String(newValue));
      setFirstOperand(newValue);
      setOperator(null);
      setWaitingForSecondOperand(false);
    }
  };

  const handleClear = () => {
    setDisplayValue("0");
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  return (
    <div className="calculator">
      <Display value={displayValue} />
      <div className="buttons">
        <Button label="Clear" onClick={handleClear} />
        {["/", "*", "-", "+"].map((op) => (
          <Button key={op} label={op} onClick={handleButtonClick} />
        ))}
        {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num) => (
          <Button key={num} label={num} onClick={handleButtonClick} />
        ))}
        <Button label="=" onClick={handleButtonClick} />
      </div>
    </div>
  );
};

export default Calculator;
