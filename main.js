let varFirst = "";
let operator = "";
let varSecond = "";

const inputDisplay = document.querySelector("input");

const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (button.parentElement.className === "digits") {
      inputDisplay.value += button.textContent;
      console.log(button.textContent);
      console.log(button.parentElement.className);
    } else if (button.parentElement.className === "operators") {
      varFirst = inputDisplay.value;
      operator = button.textContent;

      console.log("varFirst", varFirst);
      console.log("operator", operator);

      inputDisplay.value += button.textContent;
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
