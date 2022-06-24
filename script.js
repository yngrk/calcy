// define Elements
const lcdHistory = document.querySelector('.lcd-history');
const lcdCalc = document.querySelector('.lcd-current');
const lcdOpType = document.querySelector('.lcd-op-op');
const lcdOpNum = document.querySelector('.lcd-op-num');
const numBtn = document.querySelectorAll('.num');
const ACBtn = document.querySelector('.ac');
const DelBtn = document.querySelector('.del');
const opBtn = document.querySelectorAll('.op');
const enterBtn = document.querySelector('.enter');

// Variables
let currentOperation = '';
let currentA = 0;
let currentB = 0;

// OPERATIONS
function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return 'Err: Division by 0';
    }

    return a / b;
}

// OPERATIONS END

function operate(operator, a, b) {
    // takes an operator and two numbers
    // calls the operation on the numbers

    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return sub(a, b);
        case '×':
            return multiply(a, b);
        case '÷':
            return divide(a, b);
        default:
            return 'Err: unkown error'
    }
}

// check validity of input for printToScreen()
function isValid(str) {
    const lcd = lcdCalc.textContent;

    // lcd already has decimal
    if (lcd.includes('.') && str === '.') {
        return false;
    }

    // lcd begins with 0
    if (lcd.length == 0 && str === '0') {
        return false;
    }

    // negative symbol only as first character

    return true;
}

function printCalc(str) {
    if (isValid(str)) {
        if (lcdCalc.textContent.length % 20 == 0) {
            lcdCalc.textContent += '\n';
        }
        lcdCalc.textContent += `${str}`;
    }
}

function clear() {
    // clears calculation and operation screen

    // reset to default values
    currentOperation = '';
    currentA = '';
    currentB = '';

    // update
    lcdCalc.textContent = currentB;
    lcdOpNum.textContent = currentA;
    lcdOpType.textContent = currentOperation;
}

function del() {
    // removes last input from lcd
    let lcd = lcdCalc.textContent;
    if (lcd.length > 0) {
        lcdCalc.textContent = lcd.substring(0, lcd.length - 1);
    }
}

// AC Button
ACBtn.addEventListener('click', clear);

// DEL Button
DelBtn.addEventListener('click', del);

// add functionality to buttons 1-9:
// populate display when buttons pressed
numBtn.forEach(btn => btn.addEventListener('click', function() {
    printCalc(btn.textContent);
}));

// operations button functionality:
// when operation button is clicked move lcd content one up
// update operation type, store num in A
// user types num in bottom lcd
// when ENTER clicked, store num in B
// perform operation, clean lcd, print result in bottom lcd and in history

// operation Button
opBtn.forEach(btn => btn.addEventListener('click', function() {
    // calc screen empty
    if (lcdCalc.textContent.length == 0 && lcdOpNum.textContent.length == 0) {
        return;
    }

    // operation num not empty
    // change operation type only
    if (lcdOpNum.textContent.length !== 0) {
        currentOperation = btn.textContent;
        lcdOpType.textContent = btn.textContent;
        return;
    }

    // set calc num as A and button name as operator
    currentA = lcdCalc.textContent;
    currentOperation = btn.textContent;
    lcdCalc.textContent = '';

    // print current A and operation type in operation screen
    lcdOpNum.textContent = currentA;
    lcdOpType.textContent = currentOperation;
}));

// Enter button
enterBtn.addEventListener('click', function() {
    // operation type empty (means no prior operation done)
    if (lcdOpType.textContent.length == 0) {
        return;
    }

    // calc screen empty (cannot store B)
    if (lcdCalc.textContent.length == 0) {
        return;
    }

    // operation num empty
    // move calc num to operation num
    // if calc num empty do nothing
    if (lcdOpNum.textContent.length == 0 && lcdCalc.textContent.length == 0) {
        return;
    } 

    if (lcdOpNum.textContent.length === 0) {
        lcdOpNum.textContent = lcdCalc.textContent;
        lcdCalc.textContent = '';
        return;
    }

    currentA = lcdOpNum.textContent;
    currentB = lcdCalc.textContent;

    // execute operation
    const a = Number(currentA);
    const b = Number(currentB);
    const op = currentOperation;

    const result = operate(op, a, b);

    // print result to history and calc screen
    lcdCalc.textContent = result;

    // clear operation num 
    lcdOpNum.textContent = '';
});