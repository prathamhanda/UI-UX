/*
Q2. Array Operations
Name: Pratham Handa
Roll No: 102317106
*/

let arr = [25, 10, 45, 5, 30];
console.log("Original Array: ", arr);

let largest = Math.max(...arr);
let smallest = Math.min(...arr);

console.log("Largest Number: " + largest);
console.log("Smallest Number: " + smallest);

let ascending = [...arr].sort((a, b) => a - b);
let descending = [...arr].sort((a, b) => b - a);

console.log("Sorted Ascending: ", ascending);
console.log("Sorted Descending: ", descending);
