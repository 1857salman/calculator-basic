let varFirst = "";
let operator = "";
let varSecond = "";
let varDigit = "";

const decimal = document.querySelector("#decimal");
// function checkDecimal() {
//   const decimal = document.querySelector("#decimal");
//   decimal.disabled = decimal.disabled ? false : true;
//   console.log(decimal.disabled);
// }

const inputDisplay = document.querySelector("input");

//select buttons excluding "=" and clear buttons.
const buttons = document.querySelectorAll("div button");

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (button.parentElement.className === "digits") {
      // to hold only digit, use varDigit which becomes
      // varFirst or varSecond depending on varFirst is empty or not.
      // inputDisplay shows all the input including operators

      // varDigit += button.textContent; //old working code
      // inputDisplay.value += button.textContent;//old working code

      //this part works as expected
      varDigit += button.disabled ? "" : button.textContent;
      inputDisplay.value += button.disabled ? "" : button.textContent;

      console.log(button.textContent);
      console.log(button.parentElement.className);
      console.log("varDigit", varDigit);
      if (varDigit.split(".").length === 2 && e.target.id === "decimal")
        e.target.disabled = true; //decimal is disabled
    } else if (button.parentElement.className === "operators" && !varFirst) {
      varFirst = varDigit;
      operator = button.textContent;

      varDigit = "";
      decimal.disabled = false;

      // do not display "=" sign
      // inputDisplay.value +=
      //   button.textContent === "=" ? "" : button.textContent;

      inputDisplay.value += button.textContent;

      console.log("varFirst", varFirst);
      console.log("operator", operator);
    } else if (button.parentElement.className === "operators" && varFirst) {
      varSecond = varDigit;
      console.log("varSecond", varSecond);

      //Now call the operate function assigning it to varFirst
      const a = Number(varFirst);
      const b = Number(varSecond);
      varFirst = operate(operator, a, b);

      //   stage for the next binary operations with new operator
      varFirst = String(varFirst);
      varSecond = "";
      varDigit = "";
      decimal.disabled = false;
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

const equalBtn = document.querySelector("#equal");
const clearBtn = document.querySelector("#clear");

//Separate treatment for "=" operator: works fine
equalBtn.addEventListener("click", (e) => {
  if (varFirst) {
    varSecond = varDigit;
    console.log("varSecond", varSecond);

    //Now call the operate function assigning it to varFirst
    const a = Number(varFirst);
    const b = Number(varSecond);
    varFirst = operate(operator, a, b);

    //   stage for the next binary operations with new operator
    varFirst = String(varFirst);
    varSecond = "";

    //important: This will make number enter "!vaFirst condition" part in forEach
    varDigit = varFirst; //extremely important step
    varFirst = "";
    inputDisplay.value = varFirst;
    console.log("varFirst", varFirst);
    console.log("varSecond", varSecond);
    console.log("operator", operator);
  }

  inputDisplay.value = varFirst ? varFirst : varDigit;
  varSecond = "";
  if (inputDisplay.value.split(".").length === 2) {
    decimal.disabled = true;
  } else {
    decimal.disabled = false;
  }

  // combines the cases like 3 + followed by "="
  // and 3+2 then "=" folllowed by say "+"
  varDigit = inputDisplay.value;
  operator = "";
});

// Works fine
clearBtn.addEventListener("click", (e) => {
  inputDisplay.value = "";
  varDigit = "";
  varFirst = "";
  varSecond = "";
  operator = "";
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
  return (a + b).toFixed(2);
}

function subtract(a, b) {
  return (a - b).toFixed(2);
}

function multiply(a, b) {
  return (a * b).toFixed(4);
}

function divide(a, b) {
  return (a / b).toFixed(4);
}
