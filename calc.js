function add (a, b) {
	return a + b;
}

function subtract (a, b) {
	return a - b;
}

function multiply (list) {
	let product = list.reduce((total, value) => {
		return total * value;
	});
	return product;
}

function divide(list){
	let output = list.reduce((total, value) => {
		return total / value;
	});
	return output;
}

function operate(a, b, op){
	//takes an operator and 2 numbers and then calls a function on the numbers.
	let array = [];
	array.push(a);
	array.push(b);
	if (op === "+"){
		return add(a,b);
	}else if(op === "-"){
		return subtract(a,b);
	}else if (op ==="*"){
		return multiply(array);
	}else if (op ==="/"){
		if (b === 0){
			alert("Can't divide by zero!");
			return "error"
		}
		return divide(array);
	}
}

const display = document.querySelector(".display");
const input = document.querySelector(".input");
const dot = document.querySelector(".dot");
const clear = document.getElementById("clear");
const buttons = document.querySelectorAll("button");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const undo = document.querySelector(".undo");

numbers.forEach(number => number.addEventListener("click", buttonHandler));
operators.forEach(operator => operator.addEventListener("click", buttonHandler));


window.addEventListener("keydown", keyboardHandler);
equals.addEventListener("click", makeCalculation); 
dot.addEventListener("click", buttonHandler);
// Add a flag to mark when the keyboard input should not use the decimal. 
canDot = true;
undo.addEventListener("click", deleteLastInput);
clear.addEventListener("click", resetCalculator);

let operatorArray = ["+", "-","/","*"];

let displayValue = "";
let inputValue = "";
let operation = "";
let total = 0;

function keyboardHandler(e){
	if (e.key >= 0 && e.key < 10 || e.key ==="." && canDot === true){
		updateInputDisplay(e.key);
	}else if(operatorArray.includes(e.key)){
		e.preventDefault();
		storeInput(e.key);
	}else if(e.key ==="Enter"){
		//to prevent unintended effects when mixing button and keyboard inputs. 
		e.preventDefault();
		makeCalculation();
	}else if(e.key === "c"){
		resetCalculator();
	}else if (e.key ==="Backspace"){
		deleteLastInput();
	}

}

function buttonHandler(e){
	value = e.target.textContent;
	if (value >= 0 && value < 10|| value === "."){
		updateInputDisplay(value);
	}else if(operatorArray.includes(value)){
		storeInput(value);
	}

}

function updateInputDisplay(value){
	// Displays the value of a number as it is pressed. 
	input.textContent += value;
	inputValue = input.textContent;
	if(value === "."){
		dot.removeEventListener("click", buttonHandler);
		canDot = false;
	}
	console.log(`Displaying input numbers`)
}

function deleteLastInput(){
	let inputString = input.textContent;

	// Add event listener for decimal back in if it was deleted. 
	if (inputString.charAt(inputString.length -1) === "."){
		dot.addEventListener("click", buttonHandler);
		canDot = true;	
	}
	// remove the last letter from input and replace string. 
	input.textContent = inputString.slice(0, inputString.length-1);

}

function storeInput(value){
	//TODO be able to string several together and still get teh right answer. Add a running total

	// Move input when pressing an operation key to the stored data display so a new value can be input. 
	displayValue = inputValue;

	lastCharacter = display.textContent.charAt(display.textContent.length-1);
	// add on to display only if last character is an operator or if display is blank.
	if (display.textContent === "" || operatorArray.includes(lastCharacter)){
		display.textContent += displayValue;
	}
	if (operatorArray.includes(lastCharacter)){
		// operation uses operation before it is reassigned to the new value
		total = operate(Number(total), Number(displayValue), operation);
	}else if (total === 0){
		total = displayValue;
	}
	operation = value;
	display.textContent += " " + operation;
	console.log(`storing input `)
	resetInput()
	//Add decimal point handlers back in. 
	dot.addEventListener("click", buttonHandler);
	canDot = true;
}

function makeCalculation(e){
	// updates total and displays when equals button is pressed
	if (inputValue === ""){
		alert("Please enter a value.")
	}else if (displayValue ===""){
		alert("No operation selected.")
		return;
	}
	let startingValue = total === 0 ? displayValue: total;
	console.log(`Calculating ${startingValue} ${operation} ${inputValue}`)
	result = operate(Number(startingValue), Number(inputValue), operation);
	if (result === "error"){
		resetCalculator();
		return 
	}
	// If result is not a whole number round it to X decimals.
	if (result % 1 !== 0){
		resultString = `${result}`;
		splitResult = resultString.split(".");
		let decimalPlaces = splitResult[1].length;
		console.log(`Decimal places ${decimalPlaces}`);
		if (decimalPlaces > 8){
			decimalPlaces = 8;
		}
		result = result.toFixed(decimalPlaces);
	}
	resetInput()
	display.textContent = result;
	console.log(`Make calculation = ${display.textContent}`);
	//update result with the ongoing calculation
	total = result;
	// alert(`Make calculation: posttotal display box = ${display.textContent}`);
	
}

function resetCalculator(){
	resetInput();
	inputValue = "";
	displayValue = "";
	display.textContent = "";
	console.log(`resetting Calculator`)
	operation = "";
	total = 0;
	//Add decimal point handlers back in. 
	dot.addEventListener("click", buttonHandler);
	canDot = true;
}

function resetInput(){
	input.textContent = "";
}


