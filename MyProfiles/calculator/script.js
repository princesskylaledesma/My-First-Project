const result = document.getElementById("result");

function append(value) {
  if (result.value === "0" && value !== ".") {
    result.value = value;
  } else {
    result.value += value;
  }
}

function clearResult() {
  result.value = "0";
}

function delChar() {
  if (result.value.length <= 1) {
    result.value = "0";
  } else {
    result.value = result.value.slice(0, -1);
  }
}

function calculate() {
  try {
    // Replace display symbols with JavaScript operators
    let expression = result.value
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/%/g, "/100");   // basic % handling

    // Very simple safety check
    if (/[^0-9.+\-*/()% ]/.test(expression)) {
      result.value = "Error";
      return;
    }

    const answer = eval(expression);

    // Show clean number
    result.value = Number.isInteger(answer) ? answer : Number(answer.toFixed(8));
  } catch (err) {
    result.value = "Error";
  }
}

// Optional: prevent typing directly into the input
result.addEventListener('keydown', (e) => {
  e.preventDefault();
});