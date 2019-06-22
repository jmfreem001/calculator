function add (a, b) {
	return a + b;
}

function subtract (a, b) {
	return a - b;
}

function sum (list) {
	return list.reduce((total,value) => total + value, 0);
}

function multiply (list) {
	let product = list.reduce((total, value) => {
		return total * value;
	});
	return product;
}


function operate(a, b, op){
	//takes an operator and 2 numbers and then calls a function on the numbers.
	if (op === "+"){
		return add(a,b);
	}else if(op === "-"){
		return subtract(a,b);
	}
	//TODO, mmultiply and divide. 
}

const display = document.querySelector(".display");
const input = document.querySelector(".input");

const dot = document.querySelector("dot");
const clear = document.getElementById("clear");

const buttons = document.querySelectorAll("button");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");

numbers.forEach(number => number.addEventListener("click", updateInputDisplay));
// operators.forEach(operator => operator.addEventListener("click", resetDisplay));
operators.forEach(operator => operator.addEventListener("click", storeInput));

equals.addEventListener("click", makeCalculation);


function updateInputDisplay(e){
	// Displays the va;ue of a number as it is pressed. 
	input.textContent += e.target.textContent;
	inputValue = input.textContent;
}


function storeInput(e){
	// Move input when pressing an operation keyl to the stored data display so a new value can be input. 
	displayValue = input.textContent;
	display.textContent += displayValue;
	operation = e.target.textContent;
	display.textContent += " " + operation;
	resetDisplay()
}

function makeCalculation(e){
	// updates total and displays when equals button is pressed
	
	let startingValue = total === 0 ? displayValue: total;
	result = operate(Number(startingValue), Number(inputValue), operation);
	resetDisplay()
	display.textContent = result;
	//update result with the ongoing calculation
	total = result;
	
}

clear.addEventListener("click", resetCalculator);

function resetCalculator(){
	resetDisplay();
	inputValue = "";
	display.textContent ="";
	total = 0;
}


function resetDisplay(){
	input.textContent = "";
}


let displayValue = "";
let inputValue = "";
let operation = "";
let total = 0;

