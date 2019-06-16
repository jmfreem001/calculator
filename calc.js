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

function power(a, b) {
	return Math.pow(a, b)
}

function factorial(a) {
	let counter = a;
	let total = 1;
	while (counter > 1){
		total *= counter;
		counter--;
	}
	return total;
}

function operate(){
    //takes an operator and 2 numbers and then calls a function on the numbers.
}