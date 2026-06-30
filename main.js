//Adress the following:
// "=" operator edge cases
//  cosecutive operator case e.g. ++ or +/: take last one
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
const buttonsDigit = document.querySelectorAll(".digits button");
const buttonsOperator = document.querySelectorAll(".operators button");

// only for digits including decimal
buttonsDigit.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (varEq) clear();

    varDigit += button.textContent;
    inputDisplay.value += button.textContent;

    //decimal is disabled
    if (varDigit.split(".").length === 2 && e.target.id === "decimal")
      e.target.disabled = true;
  });
});

//only for math operation excludes "=" and "clear"
buttonsOperator.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (!varFirst && !varDigit) {
      if (varEq) clear();
      //code here for cases like -2 + 7
      varDigit = button.textContent;
      inputDisplay.value = button.textContent;
      // zero is hidden fron display
    } else if (!varFirst && varDigit) {
      varFirst = varDigit;
      operator = button.textContent;
      varDigit = "";
      decimal.disabled = false;

      inputDisplay.value += button.textContent;
      //new : important to add operator to result from =
      varEq = "";

      console.log("varFirst", varFirst);
      console.log("operator", operator);
    } else if (varFirst && !varDigit) {
      inputDisplay.value += button.textContent;
      operator = button.textContent;
      inputDisplay.value = varFirst + operator;
      // code here
    } else if (varFirst && varDigit) {
      varSecond = varDigit;
      console.log("varSecond", varSecond);

      //Now call the operate function assigning it to varFirst
      const a = Number(varFirst);
      const b = Number(varSecond);
      varFirst = operate(operator, a, b);
      //console.log(a, b);

      // Set stage for the next binary operations with new operator
      varFirst = String(varFirst);
      varSecond = "";
      varDigit = "";
      decimal.disabled = false;
      inputDisplay.value = varFirst;

      operator = button.textContent;

      inputDisplay.value += button.textContent;
    }
  });
});

const equalBtn = document.querySelector("#equal");
const clearBtn = document.querySelector("#clear");

//Separate treatment for "=" operator: works fine
equalBtn.addEventListener("click", (e) => {
  if (varEq) inputDisplay.value = varEq;

  if (varFirst && varDigit) {
    //varDigit emty evaluates to zero
    varSecond = varDigit;
    console.log("varSecond", varSecond);

    //Now call the operate function assigning it to varFirst
    const a = Number(varFirst);
    const b = Number(varSecond);
    varFirst = operate(operator, a, b);

    //   stage for the next binary operations with new operator
    varFirst = varFirst.toString();
    varEq = varFirst;
    inputDisplay.value = varEq;

    //important: This will make number enter "!varFirst condition" part in forEach
    varDigit = varFirst; //extremely important step
    varFirst = ""; // important dont miss it
  } else if (varFirst && !varDigit) {
    //3/= gives error
    inputDisplay.value = "Error";
    varEq = "Error";
    varFirst = "";
  } else {
    varEq = varDigit ? Number(varDigit).toString() : "";
    inputDisplay.value = varEq;
    varDigit = inputDisplay.value;
  }

  if (inputDisplay.value.split(".").length === 2) {
    decimal.disabled = true;
  } else {
    decimal.disabled = false;
  }

  // combines the cases like 3 + followed by "="
  // and 3+2 then "=" then folllowed by say "+"
  //varDigit = inputDisplay.value;

  // varDigit = "";
  varSecond = "";
  operator = "";
  console.log("varFirst", varFirst);
  console.log("varSecond", varSecond);
  console.log("varEq", varEq);
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

function reset() {
  varFirst = "";
  varSecond = "";
  varEq = "";
  operator = "";
  decimal.disabled = false;
}

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

// console.log("varFirst", varFirst);
// console.log("varSecond", varSecond);
// console.log("operator", operator);
