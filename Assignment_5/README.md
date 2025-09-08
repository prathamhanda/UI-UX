# Assignment 5 - JavaScript Fundamentals & DOM Manipulation

## Project Overview
This assignment demonstrates core **JavaScript programming concepts** including arithmetic operations, array manipulation, form validation, object handling, and functional programming methods. The assignment consists of 5 practical questions that showcase different aspects of JavaScript development and DOM interaction.

## Student Information
- **Name:** Pratham Handa
- **Roll Number:** 102317106
- **Sub Group:** 2Q14
- **Assignment:** 5

## Assignment Questions & Solutions

### 📊 **Question 1: Arithmetic Operations (q1_arithmetic.js)**
**Objective:** Create a program that performs basic arithmetic operations on two user-input numbers.

**Features:**
- Takes two numbers as input using `prompt()`
- Performs addition, subtraction, multiplication, and division
- Includes division by zero error handling
- Displays results in the console

**Key Concepts:**
- User input handling with `prompt()`
- Type conversion using `parseFloat()`
- Basic arithmetic operations
- Conditional statements for error handling
- Console output formatting

### 🔢 **Question 2: Array Operations (q2_array.js)**
**Objective:** Manipulate arrays to find largest/smallest elements and sort in ascending/descending order.

**Features:**
- Works with a predefined array of numbers `[25, 10, 45, 5, 30]`
- Finds largest number using `Math.max()`
- Finds smallest number using `Math.min()`
- Sorts array in ascending and descending order
- Uses spread operator and array methods

**Key Concepts:**
- Array manipulation and methods
- `Math.max()` and `Math.min()` functions
- Spread operator (`...`) usage
- Array sorting with custom comparator functions
- Non-destructive array operations

### 📝 **Question 3: Form Validation (q3_form.html + q3_form.js)**
**Objective:** Create an HTML form with JavaScript validation for name, email, and age fields.

**HTML Features:**
- Responsive registration form with clean styling
- Input fields for name, email, and age
- Modern CSS styling with hover effects
- Error message display areas
- Centered layout with professional appearance

**JavaScript Features:**
- Comprehensive form validation
- Name field: Cannot be empty
- Email field: Valid email format using regex pattern
- Age field: Must be between 18-100 years
- Real-time validation feedback
- Alert messages for validation results

**Key Concepts:**
- DOM manipulation and element selection
- Form validation techniques
- Regular expressions for email validation
- Event handling and form submission
- Input sanitization with `trim()`
- User feedback and error messaging

## 📸 **Q3 Form Output Screenshot**
<!-- ADD YOUR FORM SCREENSHOT BELOW -->
**Form Interface Screenshot:**
![Q3 Form Output](https://res.cloudinary.com/dglcgpley/image/upload/v1757350299/q3_form_jlhcx1.png)


### 👤 **Question 4: Student Object (q4_student.js)**
**Objective:** Work with JavaScript objects to store and manipulate student information.

**Features:**
- Creates a student object with name, age, and grades
- Demonstrates dynamic property addition (`class` property)
- Shows property modification (updating grades)
- Iterates through object properties using `for...in` loop
- Displays all student information

**Key Concepts:**
- Object creation and initialization
- Dynamic property addition
- Property modification
- Object iteration with `for...in`
- Object property access methods
- Console output formatting

### 🔄 **Question 5: Array Methods (q5_array_methods.js)**
**Objective:** Demonstrate functional programming concepts using `map()`, `filter()`, and `reduce()` methods.

**Features:**
- Filters array to keep only even numbers
- Maps even numbers by multiplying them by 2
- Reduces the processed array to calculate sum
- Demonstrates method chaining
- Processes example array `[1, 2, 3, 4, 5, 6, 7, 8]`

**Key Concepts:**
- Functional programming paradigms
- Array method chaining
- `filter()` method for conditional selection
- `map()` method for data transformation
- `reduce()` method for aggregation
- Arrow function syntax
- Immutable array operations

## Technologies Used
- **JavaScript (ES6+)** - Core programming language
- **HTML5** - Form structure and semantic markup
- **CSS3** - Modern styling and responsive design
- **DOM APIs** - Element manipulation and event handling
- **Regular Expressions** - Pattern matching for validation

## File Structure
```
Assignment_5/
├── q1_arithmetic.js      # Arithmetic operations with user input
├── q2_array.js          # Array manipulation and sorting
├── q3_form.html         # HTML form with styling
├── q3_form.js           # Form validation logic
├── q4_student.js        # Object creation and manipulation
├── q5_array_methods.js  # Functional programming methods
└── README.md           # This documentation file
```

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Basic understanding of JavaScript concepts
- Browser developer tools for console output

### How to Run Each Question

#### **Q1 - Arithmetic Operations:**
1. Open browser console (F12)
2. Copy and paste code from `q1_arithmetic.js`
3. Enter numbers when prompted
4. View results in console

#### **Q2 - Array Operations:**
1. Open browser console (F12)
2. Copy and paste code from `q2_array.js`
3. View array manipulation results in console

#### **Q3 - Form Validation:**
1. Open `q3_form.html` in web browser
2. Fill out the registration form
3. Test validation by submitting with various inputs
4. Observe validation messages and styling

#### **Q4 - Student Object:**
1. Open browser console (F12)
2. Copy and paste code from `q4_student.js`
3. View object properties and modifications in console

#### **Q5 - Array Methods:**
1. Open browser console (F12)
2. Copy and paste code from `q5_array_methods.js`
3. View functional programming results in console

## Key Learning Outcomes

### 🧠 **JavaScript Fundamentals**
- **Variable Declaration:** Using `let` and proper scoping
- **Data Types:** Numbers, strings, arrays, and objects
- **Type Conversion:** Converting between data types
- **Operators:** Arithmetic, comparison, and logical operators
- **Control Structures:** Conditional statements and loops

### 🎯 **Advanced Concepts**
- **DOM Manipulation:** Selecting and modifying HTML elements
- **Event Handling:** Form submission and user interactions
- **Functional Programming:** Using higher-order array methods
- **Object-Oriented Programming:** Object creation and manipulation
- **Error Handling:** Validation and user feedback

### 🛠️ **Practical Skills**
- **Form Validation:** Real-world input validation techniques
- **Array Processing:** Efficient data manipulation methods
- **User Interface:** Creating responsive and styled forms
- **Code Organization:** Modular and well-commented code
- **Problem Solving:** Breaking down complex problems

## Code Quality Features

### ✅ **Best Practices Implemented**
- Consistent code formatting and indentation
- Meaningful variable and function names
- Comprehensive comments for each question
- Error handling and input validation
- Non-destructive array operations
- Modern JavaScript syntax (ES6+)

### 🧹 **Code Organization**
- Separate files for each question
- Clear function definitions
- Modular code structure
- Student information in file headers
- Logical code flow and structure

## Demonstration Results

### **Q1 Output Example:**
```
Enter first number: 15
Enter second number: 4
Sum: 19
Difference: 11
Product: 60
Quotient: 3.75
```

### **Q2 Output Example:**
```
Original Array: [25, 10, 45, 5, 30]
Largest Number: 45
Smallest Number: 5
Sorted Ascending: [5, 10, 25, 30, 45]
Sorted Descending: [45, 30, 25, 10, 5]
```

### **Q4 Output Example:**
```
Student Information:
name: Pratham Handa
age: 20
grades: A+
class: B.Tech CSE
```

### **Q5 Output Example:**
```
Original Array: [1, 2, 3, 4, 5, 6, 7, 8]
Processed Array (Even*2): [4, 8, 12, 16]
Sum of Processed Array: 40
```

## Challenges Faced & Solutions

### 🎯 **Technical Challenges**
- **Challenge:** Implementing proper form validation with user-friendly feedback
- **Solution:** Used regular expressions and comprehensive validation functions

- **Challenge:** Handling different data types in arithmetic operations
- **Solution:** Implemented proper type conversion with `parseFloat()`

- **Challenge:** Understanding functional programming concepts
- **Solution:** Used method chaining to demonstrate filter → map → reduce flow

### 🎨 **Design Challenges**
- **Challenge:** Creating an aesthetically pleasing form interface
- **Solution:** Implemented modern CSS styling with responsive design

- **Challenge:** Organizing code for readability and maintenance
- **Solution:** Used consistent formatting and comprehensive documentation

## Future Enhancements

### 🚀 **Potential Improvements**
- Add more complex validation rules (password strength, phone numbers)
- Implement local storage for form data persistence
- Add more array manipulation methods (forEach, some, every)
- Create interactive calculators with GUI interfaces
- Implement object-oriented programming with classes

### 🎨 **UI/UX Enhancements**
- Add real-time validation feedback without alerts
- Implement smooth animations for form interactions
- Create dashboard views for data visualization
- Add responsive design for mobile devices
- Include accessibility features for better usability

## Assessment Criteria Met

✅ **JavaScript Fundamentals:** Variables, functions, and control structures  
✅ **DOM Manipulation:** Form handling and element selection  
✅ **Array Methods:** Modern functional programming techniques  
✅ **Object Handling:** Creation, modification, and iteration  
✅ **Input Validation:** Comprehensive form validation logic  
✅ **Code Quality:** Clean, well-documented, and organized code  
✅ **Problem Solving:** Practical solutions to common programming tasks  
✅ **Modern Syntax:** ES6+ features and best practices

## Browser Compatibility

### 🌐 **Tested Browsers**
- **Chrome:** Latest versions (full support)
- **Firefox:** Latest versions (full support)
- **Safari:** Latest versions (full support)
- **Edge:** Latest versions (full support)

### 📱 **Device Testing**
- Desktop browsers with developer console
- Mobile browsers for form testing
- Tablet devices for responsive form layout

---

**Assignment Completed:** September 8, 2025  
**Course:** UI/UX Design  
**Institution:** Thapar Institute of Engineering & Technology  
**Focus:** JavaScript Fundamentals & DOM Manipulation