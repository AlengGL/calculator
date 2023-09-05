// 這是使用監聽方式 不使用function方法寫 下面有使用function的寫法//
let currentInput = "0";
let previousInput = "";
let operation = null;
let memory = roundNumber(parseFloat(localStorage.getItem('memory')), 8) || 0;

const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = document.getElementById('result');

const operators = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
};

function roundNumber(number, decimals) {
  const factor = Math.pow(10, decimals);
  return Math.round(number * factor) / factor;
}

keys.addEventListener('click', (e) => {
  if (!e.target.matches('button')) return;
  const key = e.target;
  const action = key.dataset.action;
  const keyValue = key.textContent;

  switch (action) {
    case 'decimal':
      currentInput += '.';
      break;
    case 'add':
    case 'subtract':
    case 'multiply':
    case 'divide':
      if (operation && previousInput) {
        const num1 = parseFloat(previousInput);
        const num2 = parseFloat(currentInput);
        let result = operators[operation](num1, num2);
        result = roundNumber(result, 8);
        currentInput = result.toString();
      }
      operation = action;
      previousInput = currentInput;
      currentInput = '0';
      break;
    case 'calculate':
      if (operation && previousInput) {
        const num1 = parseFloat(previousInput);
        const num2 = parseFloat(currentInput);
        let result = operators[operation](num1, num2);
        result = roundNumber(result, 8);
        currentInput = result.toString();
        operation = null;
        previousInput = '';
      }
      break;
    case 'clear':
      currentInput = "0";
      previousInput = "";
      operation = null;
      break;
    case 'memoryAdd':
      memory += roundNumber(parseFloat(currentInput), 8);
      localStorage.setItem('memory', roundNumber(memory, 8));
      break;
    case 'memorySubtract':
      memory -= roundNumber(parseFloat(currentInput), 8);
      localStorage.setItem('memory', roundNumber(memory, 8));
      break;
    case 'memoryRecall':
      currentInput = memory.toString();
      break;
    case 'backspace':
      currentInput = currentInput.slice(0, -1);
      if (currentInput === '') {
        currentInput = '0';
      }
      break;
    case 'toggleSkin':
      toggleSkin();
      break;
    default:
      if (currentInput === '0') {
        currentInput = keyValue;
      } else {
        currentInput += keyValue;
      }
      break;
  }

  display.value = currentInput || '0';
});

function toggleSkin() {
  calculator.classList.toggle('dark');
}


// 這是另一種 使用function寫法 要使用HTML需更改//
// 下面寫法直觀 對後續維護及可讀性較高//


// let currentInput = "0";
// let previousInput = "";
// let operation = null;
// let memory = roundNumber(parseFloat(localStorage.getItem('memory')), 8) || 0;
// let display = document.getElementById('result');

// const operators = {
//   add: (a, b) => a + b,
//   subtract: (a, b) => a - b,
//   multiply: (a, b) => a * b,
//   divide: (a, b) => a / b,
// };

// function appendNumber(number) {
//   if (currentInput === '0') {
//     currentInput = number;
//   } else {
//     currentInput += number;
//   }
//   updateDisplay();
// }

// function appendDecimal() {
//   if (!currentInput.includes('.')) {
//     currentInput += '.';
//   }
//   updateDisplay();
// }

// function setOperation(op) {
//   if (operation && previousInput) {
//     const num1 = parseFloat(previousInput);
//     const num2 = parseFloat(currentInput);
//     let result = operators[operation](num1, num2);
//     result = roundNumber(result, 8);
//     currentInput = result.toString();
//   }
//   operation = op;
//   previousInput = currentInput;
//   currentInput = '0';
//   updateDisplay();
// }

// function calculateResult() {
//     if (operation && previousInput) {
//       const num1 = parseFloat(previousInput);
//       const num2 = parseFloat(currentInput);
//       let result = operators[operation](num1, num2);
//       result = roundNumber(result, 8);
//       currentInput = result.toString();
//       operation = null;
//       previousInput = '';
//     }
//     updateDisplay();
// }

// function roundNumber(number, decimals) {
//     const factor = Math.pow(10, decimals);
//     return Math.round(number * factor) / factor;
//   }

// function clearAll() {
//   currentInput = "0";
//   previousInput = "";
//   operation = null;
//   updateDisplay();
// }

// function backspace() {
//   currentInput = currentInput.slice(0, -1);
//   if (currentInput === '') {
//     currentInput = '0';
//   }
//   updateDisplay();
// }

// function addToMemory() {
//   memory += roundNumber(parseFloat(currentInput), 8);
//   localStorage.setItem('memory', roundNumber(memory, 8));
// }

// function subtractFromMemory() {
//   memory -= roundNumber(parseFloat(currentInput), 8);
//   localStorage.setItem('memory', roundNumber(memory, 8));
// }

// function recallMemory() {
//   currentInput = memory.toString();
//   updateDisplay();
// }

// function updateDisplay() {
//   display.value = currentInput;
// }

// function toggleSkin() {
//   const calculator = document.querySelector('.calculator');
//   calculator.classList.toggle('dark');
// }