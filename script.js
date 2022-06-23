
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
