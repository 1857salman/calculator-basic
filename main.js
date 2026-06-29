let varFirst = "";
let operator = "";
let varSecond = "";
let varDigit = "";
const inputDisplay = document.querySelector("input");

const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (button.parentElement.className === "digits") {
      // to hold only digit, use varDigit which becomes
      // varFirst or varSecond depending on varFirst is empty or not.
      // inputDisplay shows all the input including operators
      // inputDisplay.value += button.textContent; //old content
      varDigit += button.textContent;
      inputDisplay.value += button.textContent;

      console.log(button.textContent);
      console.log(button.parentElement.className);
      console.log("varDigit", varDigit);
    } else if (button.parentElement.className === "operators" && !varFirst) {
      varFirst = varDigit;
      operator = button.textContent;
      varDigit = "";

      inputDisplay.value += button.textContent;

      console.log("varFirst", varFirst);
      console.log("operator", operator);
    } else if (button.parentElement.className === "operators" && varFirst) {
      varSecond = varDigit;
      console.log("varSecond", varSecond);
      const a = Number(varFirst);
      const b = Number(varSecond);
      varFirst = operate(operator, a, b);

      varFirst = String(varFirst);
      varSecond = "";
      varDigit = "";

      inputDisplay.value = varFirst;

      console.log(a, b);

      operator = button.textContent;
      inputDisplay.value += button.textContent;
      console.log("varFirst", varFirst);
      console.log("varSecond", varSecond);
      console.log("operator", operator);
    }
  });
});

// This piece of code works fine! tested and adpated above
// ---------------------------------------------------------
// const opButton = document.querySelector(".operators button");
// opButton.addEventListener("click", () => {
//   inputDisplay.value = opButton.textContent;
// });
// console.log(opButton.parentElement);
// let operator = opButton.textContent;
// let a = 4.0,
//   b = 2.0;
// console.log(operate(operator, a, b));
// --------------------------------------------------------

function operate(operation, a, b) {
  switch (operation) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return (a / b).toFixed(4);
}
