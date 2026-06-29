let a = 2,
  b = 3;
console.log(add(a, b));
console.log(divide(a, b));

let operator = "/";
console.log(operate(operator, a, b));

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
