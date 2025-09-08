/*
Q1. Arithmetic Operations
Name: Pratham Handa
Roll No: 102317106
*/

let num1 = parseFloat(prompt("Enter first number: "));
let num2 = parseFloat(prompt("Enter second number: "));

console.log("Sum: " + (num1 + num2));
console.log("Difference: " + (num1 - num2));
console.log("Product: " + (num1 * num2));
if (num2 !== 0) {
    console.log("Quotient: " + (num1 / num2));
} else {
    console.log("Division by zero is not allowed.");
}
