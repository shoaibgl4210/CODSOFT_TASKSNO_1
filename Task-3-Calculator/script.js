const resultEl = document.getElementById("result");
const expressionEl = document.getElementById("expression");

const MAX_DIGITS = 15;
const SYMBOLS = { "+": "+", "-": "−", "*": "×", "/": "÷" };

const state = {
  current: "0",       // number being typed or shown
  previous: null,     // first operand
  operator: null,     // pending operator
  awaitingNext: false, // true right after an operator is chosen
  justEvaluated: false,
  error: false,
};

function formatNumber(str) {
  if (state.error) return str;
  const negative = str.startsWith("-");
  const [intPart, decPart] = str.replace("-", "").split(".");
  const withCommas = Number(intPart).toLocaleString("en-US");
  return (negative ? "-" : "") + withCommas + (decPart !== undefined ? "." + decPart : "");
}

function updateDisplay(expression = null) {
  resultEl.textContent = formatNumber(state.current);
  resultEl.classList.toggle("small", state.error);
  if (expression !== null) {
    expressionEl.textContent = expression;
  } else if (state.operator && state.previous !== null) {
    expressionEl.textContent = `${formatNumber(state.previous)} ${SYMBOLS[state.operator]}`;
  } else {
    expressionEl.textContent = "";
  }
}

function resetAll() {
  state.current = "0";
  state.previous = null;
  state.operator = null;
  state.awaitingNext = false;
  state.justEvaluated = false;
  state.error = false;
}

function calculate(a, b, op) {
  const x = parseFloat(a);
  const y = parseFloat(b);
  let value;
  if (op === "+") value = x + y;
  else if (op === "-") value = x - y;
  else if (op === "*") value = x * y;
  else if (op === "/") {
    if (y === 0) return null;
    value = x / y;
  }
  return parseFloat(value.toPrecision(12)); // avoids 0.1 + 0.2 = 0.30000000000000004
}

function showError(message) {
  resetAll();
  state.current = message;
  state.error = true;
}

function inputDigit(digit) {
  if (state.error) resetAll();
  if (state.awaitingNext || state.justEvaluated) {
    state.current = digit;
    state.awaitingNext = false;
    state.justEvaluated = false;
  } else if (state.current === "0") {
    state.current = digit;
  } else if (state.current.replace(/[-.]/g, "").length < MAX_DIGITS) {
    state.current += digit;
  }
  updateDisplay();
}

function inputDecimal() {
  if (state.error) resetAll();
  if (state.awaitingNext || state.justEvaluated) {
    state.current = "0.";
    state.awaitingNext = false;
    state.justEvaluated = false;
  } else if (!state.current.includes(".")) {
    state.current += ".";
  }
  updateDisplay();
}

function chooseOperator(op) {
  if (state.error) return;
  // Changing your mind: just swap the operator
  if (state.operator && state.awaitingNext) {
    state.operator = op;
    updateDisplay();
    return;
  }
  // Chain calculations: 2 + 3 + ... computes 2 + 3 first
  if (state.operator && state.previous !== null) {
    const result = calculate(state.previous, state.current, state.operator);
    if (result === null) {
      showError("Cannot divide by zero");
      updateDisplay();
      return;
    }
    state.previous = String(result);
    state.current = String(result);
  } else {
    state.previous = state.current;
  }
  state.operator = op;
  state.awaitingNext = true;
  state.justEvaluated = false;
  updateDisplay();
}

function evaluate() {
  if (state.error || !state.operator || state.awaitingNext) return;
  const a = state.previous;
  const b = state.current;
  const op = state.operator;
  const result = calculate(a, b, op);
  if (result === null) {
    showError("Cannot divide by zero");
    updateDisplay();
    return;
  }
  const expression = `${formatNumber(a)} ${SYMBOLS[op]} ${formatNumber(b)} =`;
  state.current = String(result);
  state.previous = null;
  state.operator = null;
  state.justEvaluated = true;
  updateDisplay(expression);
}

function deleteLast() {
  if (state.error) { resetAll(); updateDisplay(); return; }
  if (state.awaitingNext || state.justEvaluated) return;
  state.current = state.current.slice(0, -1);
  if (state.current === "" || state.current === "-") state.current = "0";
  updateDisplay();
}

function percent() {
  if (state.error) return;
  state.current = String(parseFloat((parseFloat(state.current) / 100).toPrecision(12)));
  updateDisplay();
}

function toggleSign() {
  if (state.error || state.current === "0") return;
  state.current = state.current.startsWith("-") ? state.current.slice(1) : "-" + state.current;
  updateDisplay();
}

// Mouse / touch input
document.querySelector(".keys").addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const { action, value } = button.dataset;
  if (action === "digit") inputDigit(value);
  else if (action === "decimal") inputDecimal();
  else if (action === "operator") chooseOperator(value);
  else if (action === "equals") evaluate();
  else if (action === "clear") { resetAll(); updateDisplay(); }
  else if (action === "delete") deleteLast();
  else if (action === "percent") percent();
  else if (action === "sign") toggleSign();
});

// Keyboard input
document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (/^[0-9]$/.test(key)) inputDigit(key);
  else if (key === ".") inputDecimal();
  else if (["+", "-", "*", "/"].includes(key)) { event.preventDefault(); chooseOperator(key); }
  else if (key === "Enter" || key === "=") { event.preventDefault(); evaluate(); }
  else if (key === "Backspace") deleteLast();
  else if (key === "Escape" || key.toLowerCase() === "c") { resetAll(); updateDisplay(); }
  else if (key === "%") percent();
});

updateDisplay();
