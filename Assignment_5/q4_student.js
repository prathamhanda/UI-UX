/*
Q4. Student Object
Name: Pratham Handa
Roll No: 102317106
*/

let student = {
    name: "Pratham Handa",
    age: 20,
    grades: "A"
};

// Add new property
student.class = "B.Tech CSE";

// Update grade
student.grades = "A+";

// Display all information
console.log("Student Information:");
for (let key in student) {
    console.log(key + ": " + student[key]);
}
