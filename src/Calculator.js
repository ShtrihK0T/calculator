import styles from "./Calculator.module.css";
import data from "./buttons.json";
import { useState } from "react";

export const Calculator = () => {
  const [calcButtons] = useState(data);
  const [operand1, setOperand1] = useState("");
  const [operand2, setOperand2] = useState("");

  const handlSignClick = (event) => {
    const btn = event.target.innerText;
    if (activeOperand === "operand2") {
      setOperand2(operand2.replace(/[-+]/g, `${btn}`));
    } else {
      if(operand1 === "" || operand1 === "-") {
        if(btn === "+") {
          setOperand1("");
        } else (setOperand1("-"));
      } else {
        setOperand2(`${btn}`);
        setActiveOperand("operand2");
      }
    }
  };
  const handleEqualClick = (event) => {
    if(operand2.length > 1) {
      setOperand1(String(Number(operand1) + Number(operand2)));
      setOperand2("");
      setActiveOperand("stateEqual")
    } else {
      setIsAnimated(true);
      setTimeout(() => {setIsAnimated(false)}, 350);
    }
  };
  const handleClearClick = (event) => {
    console.log("долгое нажатие отчищает всю строку");
    clearTimeout(clearHoldingTimer);
    if(activeOperand === "operand2") {
      if(operand2) {
        setOperand2(prevText => prevText.slice(0,-1))
      } else {
        setActiveOperand("operand1");
        setOperand1(prevText => prevText.slice(0,-1))
      }
    } else {
      setActiveOperand("operand1");
      setOperand1(prevText => prevText.slice(0,-1));
    }
  };
  const handleClearHold = () => {
    const timer = setTimeout(() => {
        setActiveOperand("operand1");
        setOperand1("");
        setOperand2("");
    }, 500);
    setClearHoldingTimer(timer);

  }
  const handleButtonClick = (event) => {
    const btn = event.target.innerText;
    if(activeOperand === "operand2" && operand2.length < 14) {
      if(operand2.length < 14) {
        setOperand2(prevText => prevText + btn);
      } else {
        setIsAnimated(true);
        setTimeout(() => {setIsAnimated(false)}, 350);
      }
    } else{
      setActiveOperand("operand1");
      if(operand1.length < 14) {
        setOperand1(prevText => prevText + btn);
      } else {
        setIsAnimated(true);
        setTimeout(() => {setIsAnimated(false)}, 350);
      }
    }
  };

  const [activeOperand, setActiveOperand] = useState("operand1");
  const [isAnimated, setIsAnimated] = useState(false);
  const [clearHoldingTimer, setClearHoldingTimer] = useState(null);

  return (
    <div className={styles["calculator-body"]}>
      <div className={styles["display-container"]}>
        <span
          className={
            styles.display +
            (activeOperand === "stateEqual"
              ? " " + styles["display-state-equal"]
              : "") + (isAnimated ? " " + styles["horizontal-shake"] : "")
          }
        >
          {activeOperand === "stateEqual" ? operand1 : `${operand1}${operand2}`}
        </span>
      </div>
      <div className={styles["buttons-container"]}>
        {calcButtons.map((calcButton) => {
          return (
            <button
              key={calcButton.id}
              className={
                styles.button +
                (calcButton.text === "C" ? " " + styles["clear-button"] : "") +
                (calcButton.text === "=" ? " " + styles["equal-button"] : "")
              }
              onClick={
                "+-".includes(calcButton.text)
                  ? handlSignClick
                  : "=".includes(calcButton.text)
                  ? handleEqualClick
                  : "C".includes(calcButton.text)
                  ? handleClearClick
                  : handleButtonClick
              }
              onMouseDown={("C".includes(calcButton.text) ? handleClearHold : null)}
            >
              {calcButton.text}
            </button>
          );
        })}
      </div>
    </div>
  );
};
