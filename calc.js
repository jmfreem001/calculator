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

numbers.forEach(number => number.addEventListener("click", buttonHandler));
// operators.forEach(operator => operator.addEventListener("click", resetDisplay));
operators.forEach(operator => operator.addEventListener("click", buttonHandler));

//TODO update handlers to get the string value from them so they can be passed into a generic function
//that can proces inputs from keyboard or mouse clicks. 

window.addEventListener("keydown", keyboardHandler);

equals.addEventListener("click", makeCalculation);

operatorArray = ["+", "-","/","*"];

function keyboardHandler(e){

	if (e.key >= 0 && e.key < 10){
		updateInputDisplay(e.key);
	}else if(operatorArray.includes(e.key)){
		// TODO slash not working as there is a default keybinding
		e.preventDefault;
		storeInput(e.key);
	}else if(e.keyCode == 13){
		//to prevent unintended effects when mixing button and keyboard inputs. 
		e.preventDefault();
		makeCalculation();
	}
}

function buttonHandler(e){
	value = e.target.textContent;
	if (value >= 0 && value < 10){
		updateInputDisplay(value);
	}else if(operatorArray.includes(value)){
		storeInput(value);
	}

}

function updateInputDisplay(value){
	// Displays the value of a number as it is pressed. 
	input.textContent += value;
	inputValue = input.textContent;
	console.log(`Displaying input numbers`)
}


function storeInput(value){
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
}

function makeCalculation(e){
	// updates total and displays when equals button is pressed
	if (inputValue === ""){
		alert("Please enter a value.")
	}
	let startingValue = total === 0 ? displayValue: total;
	console.log(`Calculating ${startingValue} ${operation} ${inputValue}`)
	result = operate(Number(startingValue), Number(inputValue), operation);
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
