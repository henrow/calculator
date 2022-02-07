'use strict'

const numberBtns = document.querySelectorAll('.number-btn');
const operatorBtns = document.querySelectorAll('.operator-btn');
const resetBtn = document.querySelector('#reset');
const equalsBtn = document.querySelector('#equals');


const calculatorArray = ['0','1','2','3','4','5','6','7','8','9','+', '-', '/', '*'];

let display = document.querySelector('#display');
let currentNum = 0;
let lastNum = null;
let currentOperator = null;
let lastButton = 'number';
let result = null;

window.addEventListener('keydown', keyboardHandler);
window.addEventListener('keyup', keyboardHandler);

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

// INITIALIZATION
display.textContent = currentNum;
updateDisplay();

function keyboardHandler(event) {
    let key = event.key;
    if (calculatorArray.includes(key)) {
        const target = document.getElementById(`${key}`);
        if (event.type === 'keydown') {
            target.classList.add('active');
            target.click();
        } else {
            target.classList.remove('active');
        }
    } else if ( key === 'Enter' || key === '=' ) {
        const target = document.getElementById('equals');
        if (event.type === 'keydown') {
            target.classList.add('active');
            target.click();
        } else {
            target.classList.remove('active');
        }
    } else if ( key === 'c' || key ==='C' ) {
        const target = document.getElementById('reset');
        if (event.type === 'keydown') {
            target.classList.add('active');
            target.click();
        } else {
            target.classList.remove('active');
        }
    }
}


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
        const displayResult = +(Math.round(Number(currentNum) + 'e+3') + 'e-3');
        if (displayResult.toString().length > 15) {
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
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case '*':
            result = multiply(a, b);
            break;
        case '/':
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
