// Array of operators
const operators = ["+","-","x","/"];

// Array of numbers
const numbers = ["0","1","2","3","4","5","6","7","8","9","."];

// Get references to DOM elements
const partialResult = document.querySelector("#partial-result");
const partialImput = document.querySelector("#partial-imput");
const partialOperator = document.querySelector("#partial-operator")

// Initialize variables
let tempResult = 0;
partialOperator.textContent = "";
partialResult.textContent = "";
partialImput.textContent = "0";

// Function to add two numbers
let add = function(num1, num2 = 0){
    return parseFloat(num1) + parseFloat(num2);
}

// Function to subtract two numbers
let subtract = function(num1, num2 = 0){
    return parseFloat(num1) - parseFloat(num2);
}

// Function to multiply two numbers
let multiply = function(num1, num2 = 1){
    return parseFloat(num1) * parseFloat(num2);
}

// Function to divide two numbers
let divide = function(num1, num2 = 1){
    if (num2 == "0") return "No se puede dividir entre 0."
    return parseFloat(num1) / parseFloat(num2);
}

// Function to round a number to three decimal places
function roundToThreeDecimals(number) {
    const decimalCount = (number.toString().split('.')[1] || '').length;
    if (decimalCount > 3) {
      return parseFloat(number.toFixed(3));
    }
    return parseFloat(number);
}

// Function to perform the operation based on the operator
let operate = function(num1, num2, operator){
    let result = 0;
    if (operator == "+") result = add(num1, num2);
    else if (operator == "x") result = multiply(num1, num2);
    else if (operator == "-") result = subtract(num1, num2);
    else if (operator == "/") result = divide(num1, num2);
    if (result == "No se puede dividir entre 0.") return "No se puede dividir entre 0.";
    result = roundToThreeDecimals(result);
    return result
}

// SHOW

// Function to display the result
let showResult = function(value){
    partialResult.textContent = value;
}

// Function to display the input
let showImput = function(value){
    partialImput.textContent += value;
}

// Function to display the operator
let showOperator = function(value){
    partialOperator.textContent = value;
}

// CLEAR

// Function to clear the operator
let clearOperator = function(){
    partialOperator.textContent = "";
}

// Function to clear the result
let clearResult = function(){
    partialResult.textContent = "";
}

// Function to clear the input
let clearImput = function(value = "0"){
    partialImput.textContent = value;
}

// EVENT BUTTONS

// Get all the buttons
const buttons = document.querySelectorAll("#calc-buttons > button");

// Add click event listener to each button
buttons.forEach((button) => {
    button.addEventListener("click", () =>{
        if (numbers.includes(button.id)) {
            // If the button is a number, append it to the input
            if (partialImput.textContent == "0") clearImput(""); 
            showImput(button.id); // 
        } else if (operators.includes(button.id)){
            // If the button is an operator
            if (partialResult.textContent == ""){
                // If there is no previous result, update the operator and display 
                // the current input as the result
                showOperator(button.id);
                showResult(partialImput.textContent);
                clearImput();
            } else{
                // If there is a previous result
                if(partialOperator.textContent == "") {
                    // If there is no previous operator, update the operator
                    showOperator(button.id);
                } else {
                    // If there is a previous operator, perform the operation with the 
                    // previous result, current input, and previous operator
                    tempResult = operate(partialResult.textContent,
                                        partialImput.textContent,
                                        partialOperator.textContent);
                    showResult(tempResult);                
                    showOperator(button.id);
                    clearImput();
                }
            }
        } else if (button.id == "="){
            // If the button is the equal sign
            if(partialResult.textContent == "" || partialOperator.textContent == "") {
                // If there is no previous result or operator, display the current input
                // as the result
                showResult(partialImput.textContent);
                clearImput();
            } else{
                // If there is a previous result and operator, perform the operation and
                // display the result
                tempResult = operate(partialResult.textContent,
                                     partialImput.textContent,
                                     partialOperator.textContent);
                showResult(tempResult);
                clearImput();
            }
            clearOperator();
        } else if (button.id == "ans"){
            // If the button is the "ANS" button, clear the input and display the 
            // previous result as the new input
            clearImput(""); 
            showImput(partialResult.textContent);
        } else if (button.id == "clear"){
            // If the button is the "CLEAR" button, clear the result, operator, and input
            clearResult();
            clearOperator();
            clearImput();
        } else if (button.id == "erase") {
            // If the button is the "ERASE" button, clear the input
            clearImput();
        }
    })
});