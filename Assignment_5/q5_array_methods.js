/*
Q5. Array Functions (map, filter, reduce)
Name: Pratham Handa
Roll No: 102317106
*/

function processArray(arr) {
    let result = arr
        .filter(num => num % 2 === 0)   // Remove odd numbers
        .map(num => num * 2);          // Multiply even numbers by 2

    let sum = result.reduce((acc, val) => acc + val, 0);

    console.log("Original Array: ", arr);
    console.log("Processed Array (Even*2): ", result);
    console.log("Sum of Processed Array: ", sum);
}

// Example
processArray([1, 2, 3, 4, 5, 6, 7, 8]);