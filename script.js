const resultElement = document.getElementById("result");
const clearBtn = document.getElementById("clear-button");
const deleteBtn = document.getElementById("delete-button");
const divideBtn = document.getElementById("divide-button");
const multiplyBtn = document.getElementById("multiply-button");
const subtractBtn = document.getElementById("subtract-button");
const addBtn = document.getElementById("add-button");
const decimalBtn = document.getElementById("decimal-button");
const equalBtn = document.getElementById("equal-button");
const numberBtns = document.querySelectorAll(".number");

// Initialize the variable
let result = '';
let operation = '';
let previousOperand = 0;

// Function to append number
const appendNumber = (number)=> {
    if(number === '.' && result.includes('.')){
        return;
    }
    result += number;
    resultElement.innerText = result;
    updateDisplay();
}

// Function to update display

const updateDisplay = () =>{
    if(operation){
        resultElement.innerText = `${previousOperand} ${operation} ${result}`;
    }
    else{
        resultElement.innerText = result;
    }

}

// Function to select Operator

const selectOperator = (operatorValue) => {
    if(result === '') return;

    if(operation !== '' && previousOperand !== ''){
        calculateResult();
    }
    operation = operatorValue;
    previousOperand = result;
    result = '';
    updateDisplay();
}

// Function to calculate Result yha se kal chalu karna hai

const calculateResult = () => {
    let evaluatedResult;
    const prev = parseFloat(previousOperand);
    const current = result;

    if(isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            evaluatedResult = prev + current;
            break;
        case '-':
            evaluatedResult = prev - current;
            break;
        case '*':
            evaluatedResult = prev * current;
            break;
        case '/':
            evaluatedResult = prev/current;
            break;
        
        default:
            return;
    }
    result = evaluatedResult.toString();
    operation = '';
    previousOperand = '';
}
//Add event listener to number buttons
numberBtns.forEach(button => {
    button.addEventListener('click',()=>{
        appendNumber(button.innerText);
        
    })
})

decimalBtn.addEventListener('click',() => appendNumber('.'));
addBtn.addEventListener('click',() => selectOperator('+'));
subtractBtn.addEventListener('click',() => selectOperator('-'));
multiplyBtn.addEventListener('click',() => selectOperator('*'));
divideBtn.addEventListener('click',() => selectOperator('/'));
equalBtn.addEventListener('click',()=>{
    if(result==='') return;
    calculateResult();
    updateDisplay();
})