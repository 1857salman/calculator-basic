//Adress the following:
// "=" operator edge cases
//  cosecutive operator case e.g. ++ or +/
//  adress first operator case: +2 , *7 etc

// use varDigit which becomes
// varFirst or varSecond depending on varFirst is empty or not.
// varEq is variable to deal with "=" operator cases.
// operator is math operation excludes "=" and "clear".
// inputDisplay shows all the input including operators

let varFirst = "";
let operator = "";
let varSecond = "";
let varDigit = "";
let varEq = ""; //to check its role in "=" operator

const decimal = document.querySelector("#decimal");
const inputDisplay = document.querySelector("input");

//select buttons excluding "=" and clear buttons.
const buttons = document.querySelectorAll("div button");

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (button.parentElement.className === "digits") {
      //To avoid appending digits to result of "=": to check casses
      if (varEq) clear();

      varDigit += button.textContent; //old working code
      inputDisplay.value += button.textContent; //old working code

      //decimal is disabled
      if (varDigit.split(".").length === 2 && e.target.id === "decimal")
        e.target.disabled = true;

      console.log(button.textContent);
      console.log(button.parentElement.className);
      console.log("varDigit", varDigit);
    } else if (button.parentElement.className === "operators" && !varFirst) {
      varFirst = varDigit;
      operator = button.textContent;
      varDigit = "";
      decimal.disabled = false;

      inputDisplay.value += button.textContent;
      //new : important to add operator to result from =
      varEq = "";

      console.log("varFirst", varFirst);
      console.log("operator", operator);
    } else if (button.parentElement.className === "operators" && varFirst) {
      varSecond = varDigit;
      console.log("varSecond", varSecond);

      //Now call the operate function assigning it to varFirst
      const a = Number(varFirst);
      const b = Number(varSecond);
      varFirst = operate(operator, a, b);

      // Set stage for the next binary operations with new operator
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

    //important: This will make number enter "!varFirst condition" part in forEach
    varDigit = varFirst; //extremely important step
    varFirst = ""; // important dont miss it
    //inputDisplay.value = varFirst;
    console.log("varFirst", varFirst);
    console.log("varSecond", varSecond);
    console.log("operator", operator);
  }

  varEq = varDigit;
  inputDisplay.value = varEq;

  if (inputDisplay.value.split(".").length === 2) {
    decimal.disabled = true;
  } else {
    decimal.disabled = false;
  }

  // combines the cases like 3 + followed by "="
  // and 3+2 then "=" then folllowed by say "+"
  varDigit = inputDisplay.value;
  varSecond = "";
  operator = "";
});

// Works fine
clearBtn.addEventListener("click", clear);

function clear() {
  inputDisplay.value = "";
  varDigit = "";
  varFirst = "";
  varSecond = "";
  varEq = "";
  operator = "";
  decimal.disabled = false;
}
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
