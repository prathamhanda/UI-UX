/*
Q3. Form Validation
Name: Pratham Handa
Roll No: 102317106
*/

function validateForm() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let age = parseInt(document.getElementById("age").value.trim());

    if (name === "") {
        alert("Name cannot be empty!");
        return false;
    }

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Invalid email format!");
        return false;
    }

    if (isNaN(age) || age < 18 || age > 100) {
        alert("Age must be a number between 18 and 100.");
        return false;
    }

    alert("Form submitted successfully!");
    return true;
}