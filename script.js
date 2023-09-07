// 這是使用監聽方式 不使用function方法寫 下面有使用function的寫法//
let currentInput = "0";
let previousInput = "";
let operation = null;
let memory = roundNumber(parseFloat(localStorage.getItem('memory')), 8) || 0;
const maxDigits = 13;

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

document.addEventListener('keydown', function(event) {
  if ((event.key >= '0' && event.key <= '9') || event.key === '.') {
      const button = document.querySelector(`button[data-value="${event.key}"]`);
      if (button) {
          button.click();
      }
  }
});

keys.addEventListener('click', (e) => {
  if (!e.target.matches('button')) return;
  const key = e.target;
  const action = key.dataset.action;
  const keyValue = key.textContent;

  if ((currentInput.length >= maxDigits)&& !action) { // 新增這一行來限制位數
    return;
  }

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
        if (Math.abs(result - 1) < 1e-7) {
          result = 1;
        }
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

  display.value = formatNumber(currentInput) || '0';
});

function formatNumber(number) {
  const num = parseFloat(number);
  if (Math.abs(num) >= 1e11) {
      return num.toExponential(4);
  } else if (Math.floor(num) != num) {
      const parts = number.split('.');
      let integerPart = parseInt(parts[0], 10).toLocaleString('en-US');
      let decimalPart = parts[1].length > 8 ? parts[1].substring(0, 8) : parts[1];
      return integerPart + '.' + decimalPart;
  } else {
      return num.toLocaleString('en-US');
  }
}

function toggleSkin() {
  calculator.classList.toggle('dark');
}