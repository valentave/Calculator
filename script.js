const operators = ["+","-","x","/"];
const numbers = ["0","1","2","3","4","5","6","7","8","9","."];
const breakers = ["=","clear","clean"];
const partialResult = document.querySelector("#partial-result");
const partialImput = document.querySelector("#partial-imput");
const partialOperator = document.querySelector("#partial-operator")
partialOperator.textContent = "";
partialResult.textContent = "";
partialImput.textContent = "0";

// OPERATORS

let add = function(num1, num2 = 0){
    return parseFloat(num1) + parseFloat(num2);
}

let subtract = function(num1, num2 = 0){
    return parseFloat(num1) - parseFloat(num2);
}

let multiply = function(num1, num2 = 1){
    return parseFloat(num1) * parseFloat(num2);
}

let divide = function(num1, num2 = 1){
    if (num2 == "0") return "No se puede dividir entre 0."
    return parseFloat(num1) / parseFloat(num2);
}

function roundToThreeDecimals(number) {
    const decimalCount = (number.toString().split('.')[1] || '').length;
    if (decimalCount > 3) {
      return parseFloat(number.toFixed(3));
    }
    return parseFloat(number);
}

// OPERATE

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

let showResult = function(value){
    partialResult.textContent = value;
}

let showImput = function(value){
    partialImput.textContent += value;
}

let showOperator = function(value){
    partialOperator.textContent = value;
}

// CLEAR

let clearOperator = function(){
    partialOperator.textContent = "";
}

let clearResult = function(){
    partialResult.textContent = "";
}

let clearImput = function(value = "0"){
    partialImput.textContent = value;
}

// EVENT BUTTONS

const buttons = document.querySelectorAll("#calc-buttons > button");
buttons.forEach((button) => {
    button.addEventListener("click", () =>{
        if (numbers.includes(button.id)) {
            if (partialImput.textContent == "0") clearImput(""); 
            showImput(button.id);
        } else if (operators.includes(button.id)){
            if (partialResult.textContent == ""){
                showOperator(button.id);
                showResult(partialImput.textContent);
                clearImput();
            } else{
                if(partialOperator.textContent == "") {
                    showOperator(button.id);
                } else {
                    tempResult = operate(partialResult.textContent,
                                        partialImput.textContent,
                                        partialOperator.textContent);
                    showResult(tempResult);                
                    showOperator(button.id);
                    clearImput();
                }
            }
        } else if (button.id == "="){
            if(partialResult.textContent == "" || partialOperator.textContent == "") {
                showResult(partialImput.textContent);
                clearImput();
            } else{
                tempResult = operate(partialResult.textContent,
                                    partialImput.textContent,
                                    partialOperator.textContent);
                showResult(tempResult);
                clearImput();
            }
            clearOperator();
        } else if (button.id == "ans"){
            clearImput(""); 
            showImput(partialResult.textContent);
        } else if (button.id == "clear"){
            clearResult();
            clearOperator();
            clearImput();
        } else if (button.id == "erase") {
            clearImput();
        }
    })
});