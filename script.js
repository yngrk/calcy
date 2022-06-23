// define Elements
const numBtn = document.querySelectorAll('.num');
const lcdTop = document.querySelector('.lcd-history');
const lcdBot = document.querySelector('.lcd-current');
const ACBtn = document.querySelector('.ac');
const DelBtn = document.querySelector('.del');


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
        case 'add':
            return add(a, b);
        case 'subtract':
            return sub(a, b);
        case 'multiply':
            return multiply(a, b);
        case 'divide':
            return divide(a, b);
        default:
            return 'Err: unkown error'
    }
}

// check validity of input for printToScreen()
function isValid(str) {
    const lcd = lcdBot.textContent;

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

function printToScreen(str) {
    if (isValid(str)) {
        if (lcdBot.textContent.length % 20 == 0) {
            lcdBot.textContent += '\n';
        }
        lcdBot.textContent += `${str}`;
    }
}

function clear() {
    // clears all displays
    lcdBot.textContent = '';
}

function del() {
    // removes last input from lcd
    let lcd = lcdBot.textContent;
    if (lcd.length > 0) {
        lcdBot.textContent = lcd.substring(0, lcd.length - 1);
    }
}

// AC Button
ACBtn.addEventListener('click', clear);

// DEL Button
DelBtn.addEventListener('click', del);

// add functionality to buttons 1-9:
// populate display when buttons pressed
numBtn.forEach(btn => btn.addEventListener('click', function() {
    printToScreen(btn.textContent);
}));

// store the number in a variable when number ends
// (e.g. when operation button pressed)