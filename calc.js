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

// function power(a, b) {
// 	return Math.pow(a, b)
// }

// function factorial(a) {
// 	let counter = a;
// 	let total = 1;
// 	while (counter > 1){
// 		total *= counter;
// 		counter--;
// 	}
// 	return total;
// }

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
const dot = document.querySelector("dot");
const clear = document.getElementById("clear");

const buttons = document.querySelectorAll("button");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");

numbers.forEach(number => number.addEventListener("click", updateDisplay));
operators.forEach(operator => operator.addEventListener("click", resetDisplay));
operators.forEach(operator => operator.addEventListener("click", storeInput));

equals.addEventListener("click", makeCalculation);


function updateDisplay(e){
	display.textContent += e.target.textContent;
	displayValue = e.target.textContent;
	console.log(e.target);
}

function resetCalculator(){
	resetDisplay();
	resetValue();
}

function resetDisplay(){
	display.textContent = "";
}

function resetValue(){
	displayValue = "";
}

function storeInput(e){
	displayValue = display.textContent;
	operation = e.target.textContent;
}

function makeCalculation(e){

	result = operate(Number(displayValue), Number(display.textContent), operation);
	resetDisplay()
	display.textContent = result;
	//TODO figure out how to get the second value
}

clear.addEventListener("click", resetCalculator);

let displayValue = "";
let operation = "";


//TODO
// Need to add a second display for diplaying calculation adn result 
//and leave teh other and call it inputDisplay