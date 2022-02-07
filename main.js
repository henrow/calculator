'use strict'

const numberBtns = document.querySelectorAll('.number-btn');
const operatorBtns = document.querySelectorAll('.operator-btn');
const resetBtn = document.querySelector('#reset');
const equalsBtn = document.querySelector('#equals');

let display = document.querySelector('#display');
let currentNum = 0;
let lastNum = null;
let currentOperator = null;
let lastButton = 'number';
let result = null;

display.textContent = currentNum;
numberBtns.forEach((button) => {
    button.addEventListener('click', updateNumber);
});

operatorBtns.forEach((button) => {
    button.addEventListener('click', updateOperator);
});

resetBtn.addEventListener('click', reset);

equalsBtn.addEventListener('click', () => {
    if (lastButton === 'number' && lastNum && currentOperator) {
        operate(currentOperator, lastNum, currentNum);
    }
});

updateDisplay();

function updateNumber() {
    if (lastButton === 'operator' || lastButton === 'equals') { 
        lastNum = currentNum;
        currentNum = 0;
    }
    if (!currentNum) {
        currentNum = this.id;
    } else {
        currentNum += this.id.toString();
    }
    updateDisplay();
    lastButton = 'number';
}

function updateOperator() {
    if (!currentOperator 
        || (currentOperator && lastNum === null)
        || lastButton === 'equals') {
            currentOperator = this.id;
    } else {
        operate(currentOperator, lastNum, currentNum)
        currentOperator = this.id;
    }
    lastButton = 'operator';
}

function updateDisplay() {
        let displayResult = Math.round(Number(currentNum)*1000)/1000;
        if (displayResult.length > 15) {
            display.textContent = displayResult.toExponential(2);
        } else {
            display.textContent = displayResult;  
        }
}
function add (a, b) {
    return +a + +b;
}

function subtract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    if (b == 0) {
        return '0 ERROR';
    } else {
        return a / b;
    }
}

function reset() {
    currentNum = 0;
    lastNum = null;
    currentOperator = null;
    lastButton = 'number';
    result = null;
    updateDisplay();
}

function operate (operator, a, b) {
    switch (operator) {
        case 'plus':
            result = add(a, b);
            break;
        case 'minus':
            result = subtract(a, b);
            break;
        case 'multiply':
            result = multiply(a, b);
            break;
        case 'divide':
            result = divide(a, b);
            break;
        default:
            console.log("sorry im dumb");
    }
    lastNum = currentNum;
    currentNum = result;
    updateDisplay();
    currentOperator = null;
    lastButton = 'equals';
}
