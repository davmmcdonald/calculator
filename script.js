const buttons = document.querySelectorAll('[class^="btn"]');
const input = document.querySelector('.input');
const history = document.querySelector('.history');

let firstNum = 0;
let secondNum = 0;
let operator = '';

function compute() {
    firstNum = parseFloat(firstNum);
    secondNum = parseFloat(secondNum);
    switch (operator) {
        case ('%'):
            return firstNum % secondNum;
        case ('÷'):
            return firstNum / secondNum;
        case ('x'):
            return firstNum * secondNum;
        case ('+'):
            return firstNum + secondNum;
        case ('-'):
            return firstNum - secondNum;
    }
}

function pressed() {
    this.classList.add('pressed');
    switch (this.getAttribute('data-type')) {
        case ('number'):
            if (input.textContent === '0') {
                input.textContent = this.textContent;
            } else {
                input.textContent += this.textContent;
            }
            break;
        case ('operator'):
            if (input.textContent != 0 && secondNum === 0) {
                firstNum = input.textContent;
                operator = this.textContent;
                history.textContent = `${firstNum} ${operator}`;
                input.textContent = '0';
            }
            break;
        case ('point'):
            if (!input.textContent.includes('.')) {
                input.textContent += '.';
            }
            break;
        case ('swap'):
            input.textContent *= -1;
            break;
        case ('equals'):
            if (firstNum !== 0) {
                secondNum = input.textContent;
                history.textContent = `${firstNum} ${operator} ${secondNum} =`;
                input.textContent = compute();
                firstNum = 0;
                secondNum = 0;
                operator = '';
            }
            break;
        case ('clear'):
            history.textContent = '';
            input.textContent = '0';
            firstNum = 0;
            secondNum = 0;
            operator = '';
            break;
    }
}

function unpressed() {
    this.classList.remove("pressed");
}

buttons.forEach(button => button.addEventListener('click',pressed));
buttons.forEach(button => button.addEventListener('transitionend',unpressed));