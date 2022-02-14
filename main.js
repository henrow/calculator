'use strict'

const buttons = document.querySelectorAll('button');
const calculatorArray = ['0','1','2','3','4','5','6','7','8','9','+', '-', '/', '*'];
const display = document.querySelector('#display');
const dotBtn = document.querySelector('#dot');
const equalsBtn = document.querySelector('#equals');
const numberBtns = document.querySelectorAll('.number-btn');
const operatorBtns = document.querySelectorAll('.operator-btn');
const receipt = document.querySelector('.receipt');
const resetBtn = document.querySelector('#reset');

let currentNum = 0;
let currentOperator = null;
let exact = true;
let lastButton = 'number';
let lastNum = null;
let result = null;

// Event Listeners
buttons.forEach((button) => {
    button.addEventListener('transitionend', ()=> {
        button.classList.remove('active');
    });
});

dotBtn.addEventListener('click', addDot);  

equalsBtn.addEventListener('click', () => {
    if (lastButton === 'number' && lastNum && currentOperator) {
        operate(currentOperator, lastNum, currentNum);
    }
});

numberBtns.forEach((button) => {
    button.addEventListener('click', updateNumber);
});

operatorBtns.forEach((button) => {
    button.addEventListener('click', updateOperator);
});

resetBtn.addEventListener('click', reset);

window.addEventListener('keydown', keyboardHandler);



// INITIALIZATION
display.textContent = currentNum;
updateDisplay();

// FUNCTIONS

function addDot () {
    if (lastButton === 'operator' || lastButton === 'equals') { 
        lastNum = currentNum;
        currentNum = 0;
    }
    if (!currentNum.toString().includes('.')) {
        currentNum += '.';
        updateDisplay();
    }
    lastButton = 'number';
}

function backspaceNumber() {
    if (currentNum.toString() !== '0') {
        currentNum = currentNum.toString().slice(0, -1);
        if ( currentNum === "" ) {
            currentNum = 0;
        }
    }
    updateDisplay();
}


function keyboardHandler(event) {
    let key = event.key;
    let target = null;
    if (calculatorArray.includes(key)) {
        target = document.getElementById(`${key}`);
        keyClick(event);
    } else if ( key === 'Enter' || key === '=' ) {
        target = document.getElementById('equals');
        keyClick(event);
    } else if ( key === '.' ) {
        target = document.getElementById('dot');
        keyClick(event);
    } else if ( key === 'c' || key ==='C' ) {
        target = document.getElementById('reset');
        keyClick(event);
    } else if ( key === 'Backspace' ) {
        backspaceNumber();
    }

    function keyClick(event) {
        target.classList.add('active');
        target.click();
    }
}

// MATH FUNCTIONS
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

function operate (operator, a, b) {
    exact = true;
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

    if (result.toString().length > 15) { exact = false; }

    let resultText = document.createElement("p");
    resultText.textContent = `${formatNumber(lastNum)} ${currentOperator} ${formatNumber(currentNum)} ${ exact ? '=' : '≈' } ${formatNumber(result)}`;
    receipt.prepend(resultText);

    lastNum = currentNum;
    currentNum = result;
    updateDisplay();
    currentOperator = null;
    lastButton = 'equals';
}

function reset() {
    currentNum = 0;
    lastNum = null;
    currentOperator = null;
    lastButton = 'number';
    result = null;
    updateDisplay();
}

function formatNumber(input) {
    let thisResult = input;
    if (thisResult.toString().length > 15) {
        thisResult = +(Math.round(Number(thisResult) + 'e+3') + 'e-3');
        if (thisResult.toString().length > 15) {
            thisResult = Number(thisResult).toExponential(2);
        }
    }
    return thisResult;
}

function updateDisplay() {
        let displayResult = currentNum; 
        display.textContent = formatNumber(displayResult);
}

function updateNumber() {
    if (lastButton === 'operator' || lastButton === 'equals') { 
        lastNum = currentNum;
        currentNum = 0;
    }
    if (currentNum === 0) {
        currentNum += Number(this.id);
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

