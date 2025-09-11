# Assignment 6 - Enhanced JavaScript Travel Agency Website

## Project Overview
This assignment enhances Assignment 2 (Travel Agency Website) with advanced JavaScript functionality including dynamic content generation, form validation, price calculation, and interactive gallery features. The project demonstrates comprehensive use of JavaScript variables, arrays, objects, operators, control flow, functions, and DOM manipulation.

## Student Information
- **Name:** Pratham Handa
- **Roll Number:** 102317106
- **Sub Group:** 2Q14
- **Assignment:** 6

## JavaScript Features Implemented

### 🗃️ **Data Structures & Variables**
- **Package Array:** Array of objects containing travel package information
- **Promo Codes Object:** Key-value pairs for discount codes and percentages
- **Global Variables:** Current image index, gallery images array
- **Local Variables:** Form data, price calculations, filter states

### 🔄 **Control Flow & Operators**
- **Conditional Statements:** if/else for validation and pricing logic
- **Switch Statements:** Seasonal pricing multipliers and promo code handling
- **Loops:** for loops for table generation, forEach for array processing
- **Logical Operators:** Form validation and filter combinations
- **Arithmetic Operators:** Price calculations with multipliers and discounts

### 🛠️ **Functions & Methods**
- **Pure Functions:** Price calculation, validation functions
- **Event Handlers:** Form submission, input validation, filter updates
- **Utility Functions:** Currency formatting, date calculations
- **DOM Manipulation:** Dynamic content generation and updates

## Core Functionalities

### 📊 **Dynamic Packages Table (Loops + Functions)**
```javascript
// Package data structure
const packages = [
  {
    id: 'paris-essentials',
    name: 'Paris Essentials',
    destination: 'Paris, France',
    durationDays: 5,
    basePrice: 1299,
    season: 'shoulder',
    highlights: 'Louvre, Seine Cruise, Eiffel priority'
  },
  // ... more packages
];
```

**Features:**
- ✅ Array of package objects with id, destination, duration, basePrice, season
- ✅ Dynamic table rendering using loops and functions
- ✅ Final price computation using operators and control flow
- ✅ Seasonal multipliers: Peak (+25%), Off (-15%), Shoulder (standard)
- ✅ Weekend surcharge calculation (+10%)
- ✅ Sorting and filtering functionality

### 💰 **Booking Price Estimator (Control Flow + Functions)**
```javascript
function calculateFinalPrice(basePrice, season, isWeekend = false) {
  let multiplier = 1;
  
  switch (season) {
    case 'peak': multiplier = 1.25; break;
    case 'off': multiplier = 0.85; break;
    default: multiplier = 1.0;
  }
  
  let finalPrice = basePrice * multiplier;
  if (isWeekend) finalPrice *= 1.1;
  
  return Math.round(finalPrice);
}
```

**Features:**
- ✅ Real-time price calculation on form changes
- ✅ Date math: `nights = (checkOut - checkIn)`
- ✅ Guest multiplier: +20% for additional guests (>2)
- ✅ Promo code validation with switch/case logic
- ✅ Live total display with breakdown
- ✅ Form submission disabled until all fields valid

### 🖼️ **Gallery with Attribute-Driven Modal**
```html
<img src="thumbnail.jpg" 
     data-large="large-image.jpg"
     data-title="Image Title"
     data-location="Location" />
```

**Features:**
- ✅ Thumbnails with `data-large` attributes for full-size images
- ✅ Modal opens on click, sets src from `data-large` attribute
- ✅ Alt and title attributes updated from data attributes
- ✅ Navigation between images with arrow keys
- ✅ Category filtering and layout toggling

### 🧭 **Navigation Highlight + Scroll Behavior**
```javascript
function highlightActiveNavigation() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav a');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
}
```

**Features:**
- ✅ Active class added/removed based on current page
- ✅ Smooth scrolling behavior for anchor links
- ✅ Header background changes on scroll
- ✅ Mobile menu toggle functionality

## Technical Implementation

### 📋 **Form Validation Functions**
```javascript
function validateName(name) {
  return name.length >= 2 && /^[a-zA-Z\s]+$/.test(name);
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone) {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}
```

**Validation Features:**
- ✅ Real-time validation with visual feedback
- ✅ Custom error messages for each field
- ✅ Submit button enabled/disabled based on form validity
- ✅ Date validation ensuring checkout > checkin

### 🏷️ **Promo Code System**
```javascript
const promoCodes = {
  'EARLYBIRD': { discount: 0.10, description: '10% Early Bird Discount' },
  'STUDENT': { discount: 0.15, description: '15% Student Discount' },
  'FAMILY': { discount: 0.08, description: '8% Family Discount' },
  'SUMMER2025': { discount: 0.12, description: '12% Summer Special' }
};
```

**Features:**
- ✅ Switch/case logic for promo code validation
- ✅ Dynamic discount application
- ✅ Visual feedback for valid/invalid codes
- ✅ Real-time price updates

### 🎛️ **Interactive Gallery Controls**
```javascript
function setupGallery() {
  // Layout toggle between grid and list view
  gridToggle.addEventListener('click', () => {
    galleryContainer.classList.toggle('list-view');
  });
  
  // Category filtering
  categoryFilter.addEventListener('change', () => {
    const selectedCategory = categoryFilter.value;
    galleryItems.forEach(item => {
      const itemCategory = item.dataset.category;
      item.classList.toggle('hidden', 
        selectedCategory !== '' && itemCategory !== selectedCategory);
    });
  });
}
```

## File Structure
```
Assignment_6/
├── index.html              # Enhanced homepage with dynamic content
├── packages.html           # Dynamic packages table
├── booking.html            # Advanced booking form with price estimator
├── gallery.html            # Interactive gallery with modal
├── about.html              # About/contact page
├── assets/
│   ├── style.css          # Enhanced CSS with modal and validation styles
│   └── script.js          # Comprehensive JavaScript functionality
└── README.md              # This documentation
```

## JavaScript Concepts Demonstrated

### 🔤 **Variables & Data Types**
- `let` and `const` declarations
- Arrays, objects, strings, numbers, booleans
- Template literals for dynamic content
- Destructuring assignment

### 🧮 **Operators & Expressions**
- Arithmetic operators for price calculations
- Comparison operators for validation
- Logical operators for complex conditions
- Ternary operators for concise conditionals

### 🔀 **Control Flow**
- if/else statements for validation logic
- switch/case for categorical operations
- for loops for table generation
- forEach loops for array processing
- while loops for specific iterations

### 🎯 **Functions**
- Function declarations and expressions
- Arrow functions for event handlers
- Parameters and return values
- Default parameters and rest parameters
- Higher-order functions (map, filter, reduce)

### 🌐 **DOM Manipulation**
- getElementById and querySelector methods
- addEventListener for event handling
- classList manipulation for styling
- setAttribute for data management
- innerHTML and textContent updates

### 📊 **Arrays & Objects**
- Array methods: forEach, map, filter, sort
- Object property access and manipulation
- JSON-like data structures
- Array destructuring and spread operator

## User Experience Features

### 🚀 **Performance Optimizations**
- Lazy loading for gallery images
- Debounced input validation
- Efficient DOM updates
- Minimal reflows and repaints

### ♿ **Accessibility Features**
- ARIA attributes for screen readers
- Keyboard navigation support
- Focus management in modals
- Semantic HTML structure

### 📱 **Responsive Design**
- Mobile-first approach
- Touch-friendly interactions
- Adaptive layouts for all screen sizes
- Progressive enhancement

## Browser Compatibility

### 🌐 **Supported Features**
- ES6+ JavaScript features
- Modern DOM APIs
- CSS Grid and Flexbox
- Local Storage (for future enhancements)

### 📋 **Tested Browsers**
- Chrome 100+
- Firefox 90+
- Safari 14+
- Edge 100+

## Getting Started

### 🛠️ **Setup Instructions**
1. Clone or download Assignment 6 files
2. Open `index.html` in a modern web browser
3. Navigate through different pages to test functionality
4. Open browser developer tools to see console logs

### 🧪 **Testing Features**
1. **Packages Page:** Test filtering and sorting
2. **Booking Page:** Fill form and watch price updates
3. **Gallery Page:** Click images to open modal
4. **All Pages:** Test responsive design and navigation

### 🔍 **Development Tools**
- Browser Developer Tools for debugging
- Console for JavaScript error checking
- Network tab for performance monitoring
- Elements panel for DOM inspection

## Key Learning Outcomes

### 💡 **JavaScript Mastery**
- **Data Structures:** Effective use of arrays and objects
- **Control Flow:** Complex conditional logic and loops
- **Functions:** Modular, reusable code organization
- **DOM Manipulation:** Dynamic content and interactivity
- **Event Handling:** User interaction management
- **Form Validation:** Real-time validation with feedback

### 🎨 **Web Development Skills**
- **Progressive Enhancement:** Starting with HTML/CSS foundation
- **Separation of Concerns:** Clean separation of structure, style, and behavior
- **User Experience:** Intuitive interfaces with immediate feedback
- **Performance:** Optimized code for fast loading and smooth interactions
- **Accessibility:** Inclusive design for all users

## Future Enhancements

### 🔮 **Potential Improvements**
- Local storage for user preferences
- AJAX calls for dynamic data loading
- Advanced animations with CSS and JavaScript
- Integration with external APIs
- Progressive Web App features

### 📈 **Scalability Considerations**
- Modular JavaScript architecture
- Component-based development approach
- State management for complex interactions
- API integration for real-time data

## Assessment Criteria Met

✅ **Variables & Arrays:** Package data, promo codes, gallery images  
✅ **Operators & Control Flow:** Pricing logic, validation, filtering  
✅ **Functions:** Modular code with specific responsibilities  
✅ **Loops:** Table generation, form population, gallery rendering  
✅ **DOM Manipulation:** Dynamic content updates and styling  
✅ **Event Handling:** Form interactions, modal controls, navigation  
✅ **Data Attributes:** Gallery modal system with HTML attributes  
✅ **Form Validation:** Real-time validation with visual feedback  
✅ **Price Calculation:** Complex pricing with multiple factors  

---

**Assignment Completed:** September 10, 2025  
**Course:** UI/UX Design  
**Institution:** Thapar Institute of Engineering & Technology  
**Focus:** Advanced JavaScript Programming & Interactive Web Development
