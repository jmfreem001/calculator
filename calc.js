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


numbers.forEach(number => number.addEventListener("click", buttonHandler));
// operators.forEach(operator => operator.addEventListener("click", resetDisplay));
operators.forEach(operator => operator.addEventListener("click", buttonHandler));


window.addEventListener("keydown", keyboardHandler);

equals.addEventListener("click", makeCalculation);

//TODO Add decimal point button handlers. 
dot.addEventListener("click", buttonHandler);
// Add a flag to mark when the keyboard input should not use the decimal. 
canDot = true;
// TODOAdd a backspace button. 

//TODO make it look nice with CSS. 

operatorArray = ["+", "-","/","*"];

function keyboardHandler(e){
	e.preventDefault();
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
	}
	// else if (e.key ==="." && canDot === true){
	// 	updateInputDisplay(e.key);

	// }
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


function storeInput(value){
	//TODO be able to string several together and still get teh right answer. 

	// Move input when pressing an operation key to the stored data display so a new value can be input. 
	displayValue = inputValue;
	//only add content to display content if no
	lastCharacter = display.textContent.charAt(display.textContent.length-1);
	console.log(lastCharacter)
	// add on to display only if last character is an operator or if display is blank.
	if (display.textContent === "" || operatorArray.includes(lastCharacter)){
		display.textContent += displayValue;
	}
	operation = value;
	// alert(display.textContent)
	display.textContent += " " + operation;
	console.log(`storing input `)
	resetDisplay()
	//Add decimal point button handler back in. 
	dot.addEventListener("click", buttonHandler);
	// Add decimal point keyboard handler back in
	canDot = true;
}

function makeCalculation(e){
	// updates total and displays when equals button is pressed
	if (inputValue === ""){
		alert("Please enter a value.")
	}
	let startingValue = total === 0 ? displayValue: total;
	console.log(`Calculating ${startingValue} ${operation} ${inputValue}`)
	result = operate(Number(startingValue), Number(inputValue), operation);
	if (result === "error"){
		resetCalculator();
		return 
	}
	// TODO if result is not an int make sure to round it to X decimals
	resetDisplay()
	display.textContent = result;
	console.log(`Make calculation = ${display.textContent}`);
	//update result with the ongoing calculation
	total = result;
	// alert(`Make calculation: posttotal display box = ${display.textContent}`);
	
}

clear.addEventListener("click", resetCalculator);

function resetCalculator(){
	resetDisplay();
	inputValue = "";
	displayValue = "";
	display.textContent = "";
	console.log(`resetting Calculator`)
	operation = "";
	total = 0;
}


function resetDisplay(){
	input.textContent = "";
}


let displayValue = "";
let inputValue = "";
let operation = "";
let total = 0;
