// ============================================================================
// ASSIGNMENT 6 - ENHANCED JAVASCRIPT FUNCTIONALITY
// ============================================================================

// Global variables and data structures
let currentImageIndex = 0;
let galleryImages = [];

// Package data structure - array of objects
const packages = [
  {
    id: 'paris-essentials',
    name: 'Paris Essentials',
    destination: 'Paris, France',
    durationDays: 5,
    basePrice: 1299,
    season: 'shoulder',
    highlights: 'Louvre, Seine Cruise, Eiffel priority',
    image: 'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'japan-explorer',
    name: 'Japan Explorer',
    destination: 'Tokyo, Kyoto',
    durationDays: 7,
    basePrice: 1999,
    season: 'peak',
    highlights: 'Tea ceremony, Mt. Fuji day trip',
    image: 'https://images.unsplash.com/photo-1549693578-d683be217e58?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'greek-island-hopping',
    name: 'Greek Island Hopping',
    destination: 'Santorini, Mykonos',
    durationDays: 6,
    basePrice: 1799,
    season: 'peak',
    highlights: 'Caldera cruise, beach day',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'safari-adventure',
    name: 'Safari Adventure',
    destination: 'Masai Mara, Kenya',
    durationDays: 5,
    basePrice: 1599,
    season: 'off',
    highlights: 'Big Five game drive, village visit',
    image: 'https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'iceland-northern-lights',
    name: 'Iceland Northern Lights',
    destination: 'Reykjavik, Iceland',
    durationDays: 4,
    basePrice: 1899,
    season: 'peak',
    highlights: 'Aurora watching, Blue Lagoon, glacier hiking',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'morocco-desert',
    name: 'Morocco Desert Experience',
    destination: 'Marrakech, Sahara',
    durationDays: 6,
    basePrice: 1399,
    season: 'shoulder',
    highlights: 'Camel trek, desert camping, medina tours',
    image: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=400&auto=format&fit=crop'
  }
];

// Promo codes with discounts
const promoCodes = {
  'EARLYBIRD': { discount: 0.10, description: '10% Early Bird Discount' },
  'STUDENT': { discount: 0.15, description: '15% Student Discount' },
  'FAMILY': { discount: 0.08, description: '8% Family Discount' },
  'SUMMER2025': { discount: 0.12, description: '12% Summer Special' },
  'WELCOME': { discount: 0.05, description: '5% Welcome Discount' }
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// Get URL parameter
function getParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

// Calculate nights between dates
function nightsBetween(checkin, checkout) {
  const d1 = new Date(checkin);
  const d2 = new Date(checkout);
  const ms = d2 - d1;
  return Math.max(1, Math.round(ms / (1000 * 60 * 60 * 24)));
}

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(amount);
}

// Calculate final price with seasonal multipliers and surcharges
function calculateFinalPrice(basePrice, season, isWeekend = false) {
  let multiplier = 1;
  
  // Seasonal pricing using switch statement
  switch (season) {
    case 'peak':
      multiplier = 1.25; // +25% for peak season
      break;
    case 'shoulder':
      multiplier = 1.0; // Standard pricing
      break;
    case 'off':
      multiplier = 0.85; // -15% for off season
      break;
    default:
      multiplier = 1.0;
  }
  
  let finalPrice = basePrice * multiplier;
  
  // Weekend surcharge using conditional operator
  if (isWeekend) {
    finalPrice *= 1.1; // +10% weekend surcharge
  }
  
  return Math.round(finalPrice);
}

// ============================================================================
// NAVIGATION HIGHLIGHT FUNCTIONALITY
// ============================================================================

function highlightActiveNavigation() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav a, .drawer a');
  
  // Remove active class from all links
  navLinks.forEach(link => {
    link.classList.remove('active');
  });
  
  // Add active class to current page links
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || 
        (currentPage === '' && href === 'index.html') ||
        (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ============================================================================
// PACKAGES TABLE GENERATION WITH LOOPS AND FUNCTIONS
// ============================================================================

function renderPackagesTable() {
  const tableBody = document.getElementById('packagesTableBody');
  if (!tableBody) return;
  
  // Clear existing content
  tableBody.innerHTML = '';
  
  // Get current filter values
  const seasonFilter = document.getElementById('seasonFilter')?.value || '';
  const sortBy = document.getElementById('sortPackages')?.value || 'name';
  
  // Filter packages based on season
  let filteredPackages = packages;
  if (seasonFilter) {
    filteredPackages = packages.filter(pkg => pkg.season === seasonFilter);
  }
  
  // Sort packages using array methods
  filteredPackages.sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return calculateFinalPrice(a.basePrice, a.season) - calculateFinalPrice(b.basePrice, b.season);
      case 'duration':
        return a.durationDays - b.durationDays;
      case 'destination':
        return a.destination.localeCompare(b.destination);
      default:
        return a.name.localeCompare(b.name);
    }
  });
  
  // Render table rows using for loop
  for (let i = 0; i < filteredPackages.length; i++) {
    const pkg = filteredPackages[i];
    const finalPrice = calculateFinalPrice(pkg.basePrice, pkg.season);
    const isWeekendPrice = calculateFinalPrice(pkg.basePrice, pkg.season, true);
    
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${pkg.name}</strong></td>
      <td>${pkg.destination}</td>
      <td>${pkg.durationDays} Days</td>
      <td>${formatCurrency(pkg.basePrice)}</td>
      <td class="final-price">
        ${formatCurrency(finalPrice)}
        <br><small class="seasonal-multiplier">Weekend: ${formatCurrency(isWeekendPrice)}</small>
      </td>
      <td>
        <span class="season-badge season-${pkg.season}">${pkg.season.charAt(0).toUpperCase() + pkg.season.slice(1)}</span>
      </td>
      <td>${pkg.highlights}</td>
      <td>
        <a class="btn tiny" href="booking.html?pkg=${encodeURIComponent(pkg.name)}&dest=${encodeURIComponent(pkg.destination)}&price=${pkg.basePrice}">Book</a>
      </td>
    `;
    tableBody.appendChild(row);
  }
}

// ============================================================================
// HOMEPAGE DYNAMIC CONTENT RENDERING
// ============================================================================

function renderHomepageContent() {
  // Render popular destinations
  const popularDestinations = document.getElementById('popularDestinations');
  if (popularDestinations) {
    const destinations = packages.slice(0, 3); // Get first 3 packages
    popularDestinations.innerHTML = destinations.map(pkg => `
      <div class="card">
        <img src="${pkg.image}" alt="${pkg.destination}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 12px;">
        <h3>${pkg.destination}</h3>
        <p>Starting from ${formatCurrency(pkg.basePrice)}</p>
        <a href="packages.html" class="btn primary">View Packages</a>
      </div>
    `).join('');
  }
  
  // Render featured packages
  const featuredPackages = document.getElementById('featuredPackages');
  if (featuredPackages) {
    const featured = packages.filter(pkg => pkg.season === 'peak').slice(0, 2);
    featuredPackages.innerHTML = featured.map(pkg => `
      <div class="card">
        <img src="${pkg.image}" alt="${pkg.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 12px;">
        <h3>${pkg.name}</h3>
        <p>${pkg.destination} • ${pkg.durationDays} Days</p>
        <p><strong>${formatCurrency(calculateFinalPrice(pkg.basePrice, pkg.season))}</strong></p>
        <a href="booking.html?pkg=${encodeURIComponent(pkg.name)}" class="btn primary">Book Now</a>
      </div>
    `).join('');
  }
}

// ============================================================================
// BOOKING FORM FUNCTIONALITY WITH VALIDATION AND PRICE CALCULATION
// ============================================================================

function populateBookingSelects() {
  const packageSelect = document.getElementById('package');
  const destinationSelect = document.getElementById('destination');
  
  if (packageSelect) {
    // Clear existing options except the first one
    packageSelect.innerHTML = '<option value="" disabled selected>Select package</option>';
    
    // Add packages using forEach loop
    packages.forEach(pkg => {
      const option = document.createElement('option');
      option.value = pkg.name;
      option.textContent = pkg.name;
      option.dataset.basePrice = pkg.basePrice;
      option.dataset.season = pkg.season;
      option.dataset.duration = pkg.durationDays;
      packageSelect.appendChild(option);
    });
  }
  
  if (destinationSelect) {
    // Get unique destinations
    const destinations = [...new Set(packages.map(pkg => pkg.destination))];
    destinationSelect.innerHTML = '<option value="" disabled selected>Select destination</option>';
    
    destinations.forEach(dest => {
      const option = document.createElement('option');
      option.value = dest;
      option.textContent = dest;
      destinationSelect.appendChild(option);
    });
  }
  
  // Pre-fill from URL parameters
  const urlPackage = getParam('pkg');
  const urlDestination = getParam('dest');
  const urlPrice = getParam('price');
  
  if (urlPackage && packageSelect) {
    Array.from(packageSelect.options).forEach(option => {
      if (option.value === urlPackage) {
        option.selected = true;
      }
    });
  }
  
  if (urlDestination && destinationSelect) {
    Array.from(destinationSelect.options).forEach(option => {
      if (option.value === urlDestination) {
        option.selected = true;
      }
    });
  }
}

// Form validation functions
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

function validateDates(checkin, checkout) {
  const today = new Date();
  const checkinDate = new Date(checkin);
  const checkoutDate = new Date(checkout);
  
  return checkinDate >= today && checkoutDate > checkinDate;
}

// Real-time form validation
function setupFormValidation() {
  const form = document.getElementById('bookingForm');
  if (!form) return;
  
  const fields = {
    customerName: { validator: validateName, errorMsg: 'Name must be at least 2 characters and contain only letters' },
    customerEmail: { validator: validateEmail, errorMsg: 'Please enter a valid email address' },
    customerPhone: { validator: validatePhone, errorMsg: 'Please enter a valid phone number' },
    guestCount: { validator: (val) => val >= 1 && val <= 10, errorMsg: 'Guest count must be between 1 and 10' }
  };
  
  // Add real-time validation to each field
  Object.keys(fields).forEach(fieldId => {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId.replace('customer', '').toLowerCase() + 'Error');
    
    if (field && errorElement) {
      field.addEventListener('input', () => {
        const isValid = fields[fieldId].validator(field.value);
        
        if (isValid) {
          field.classList.remove('error');
          field.classList.add('valid');
          errorElement.textContent = '';
        } else {
          field.classList.remove('valid');
          field.classList.add('error');
          errorElement.textContent = fields[fieldId].errorMsg;
        }
        
        updateSubmitButton();
      });
    }
  });
  
  // Date validation
  const checkinDate = document.getElementById('checkinDate');
  const checkoutDate = document.getElementById('checkoutDate');
  
  if (checkinDate && checkoutDate) {
    const today = new Date().toISOString().slice(0, 10);
    checkinDate.min = today;
    checkoutDate.min = today;
    
    function validateBookingDates() {
      const checkinError = document.getElementById('checkinError');
      const checkoutError = document.getElementById('checkoutError');
      
      if (checkinDate.value) {
        checkoutDate.min = checkinDate.value;
        if (checkoutDate.value && checkoutDate.value <= checkinDate.value) {
          checkoutDate.value = '';
        }
      }
      
      const isValid = validateDates(checkinDate.value, checkoutDate.value);
      
      if (checkinDate.value && checkoutDate.value) {
        if (isValid) {
          checkinDate.classList.add('valid');
          checkoutDate.classList.add('valid');
          if (checkinError) checkinError.textContent = '';
          if (checkoutError) checkoutError.textContent = '';
        } else {
          checkinDate.classList.add('error');
          checkoutDate.classList.add('error');
          if (checkoutError) checkoutError.textContent = 'Checkout must be after checkin date';
        }
      }
      
      updatePriceEstimate();
      updateSubmitButton();
    }
    
    checkinDate.addEventListener('change', validateBookingDates);
    checkoutDate.addEventListener('change', validateBookingDates);
  }
  
  // Package and destination sync
  const packageSelect = document.getElementById('package');
  const destinationSelect = document.getElementById('destination');
  
  if (packageSelect && destinationSelect) {
    packageSelect.addEventListener('change', () => {
      const selectedPackage = packages.find(pkg => pkg.name === packageSelect.value);
      if (selectedPackage) {
        destinationSelect.value = selectedPackage.destination;
      }
      updatePriceEstimate();
    });
    
    destinationSelect.addEventListener('change', updatePriceEstimate);
  }
}

// Price estimation with control flow and operators
function updatePriceEstimate() {
  const packageSelect = document.getElementById('package');
  const checkinDate = document.getElementById('checkinDate');
  const checkoutDate = document.getElementById('checkoutDate');
  const guestCount = document.getElementById('guestCount');
  const promoCode = document.getElementById('promoCode');
  const weekendDeparture = document.getElementById('weekendDeparture');
  
  if (!packageSelect || !checkinDate || !checkoutDate || !guestCount) return;
  
  const selectedPackage = packages.find(pkg => pkg.name === packageSelect.value);
  if (!selectedPackage || !checkinDate.value || !checkoutDate.value) {
    resetPriceDisplay();
    return;
  }
  
  const nights = nightsBetween(checkinDate.value, checkoutDate.value);
  const guests = parseInt(guestCount.value) || 1;
  const isWeekend = weekendDeparture?.checked || false;
  
  // Base calculations
  let basePrice = selectedPackage.basePrice;
  let seasonalAdjustment = 0;
  let weekendSurcharge = 0;
  let guestMultiplier = 0;
  let promoDiscount = 0;
  
  // Seasonal adjustment calculation
  switch (selectedPackage.season) {
    case 'peak':
      seasonalAdjustment = basePrice * 0.25;
      break;
    case 'off':
      seasonalAdjustment = -(basePrice * 0.15);
      break;
    default:
      seasonalAdjustment = 0;
  }
  
  let adjustedPrice = basePrice + seasonalAdjustment;
  
  // Weekend surcharge
  if (isWeekend) {
    weekendSurcharge = adjustedPrice * 0.1;
    adjustedPrice += weekendSurcharge;
  }
  
  // Guest multiplier (additional guests +20%)
  if (guests > 2) {
    guestMultiplier = adjustedPrice * (guests - 2) * 0.2;
    adjustedPrice += guestMultiplier;
  }
  
  // Per-night pricing
  const totalBeforePromo = adjustedPrice * nights;
  let finalTotal = totalBeforePromo;
  
  // Promo code validation and discount
  if (promoCode && promoCode.value) {
    const promo = promoCodes[promoCode.value.toUpperCase()];
    const promoStatus = document.getElementById('promoStatus');
    
    if (promo) {
      promoDiscount = totalBeforePromo * promo.discount;
      finalTotal -= promoDiscount;
      if (promoStatus) {
        promoStatus.textContent = `✓ ${promo.description} applied`;
        promoStatus.className = 'promo-status valid';
      }
    } else if (promoCode.value.trim()) {
      if (promoStatus) {
        promoStatus.textContent = '✗ Invalid promo code';
        promoStatus.className = 'promo-status invalid';
      }
    } else {
      if (promoStatus) {
        promoStatus.textContent = '';
        promoStatus.className = 'promo-status';
      }
    }
  }
  
  // Update price breakdown display
  updatePriceDisplay({
    basePrice,
    nights,
    guests,
    seasonalAdjustment,
    weekendSurcharge,
    guestMultiplier,
    promoDiscount,
    finalTotal
  });
}

function updatePriceDisplay(priceData) {
  const elements = {
    basePrice: document.getElementById('basePrice'),
    nightsCount: document.getElementById('nightsCount'),
    guestsDisplay: document.getElementById('guestsDisplay'),
    seasonalAdjustment: document.getElementById('seasonalAdjustment'),
    weekendSurcharge: document.getElementById('weekendSurcharge'),
    guestMultiplier: document.getElementById('guestMultiplier'),
    promoDiscount: document.getElementById('promoDiscount'),
    totalPrice: document.getElementById('totalPrice'),
    seasonalLine: document.getElementById('seasonalLine'),
    weekendLine: document.getElementById('weekendLine'),
    guestLine: document.getElementById('guestLine'),
    promoLine: document.getElementById('promoLine')
  };
  
  // Update values
  if (elements.basePrice) elements.basePrice.textContent = formatCurrency(priceData.basePrice);
  if (elements.nightsCount) elements.nightsCount.textContent = priceData.nights;
  if (elements.guestsDisplay) elements.guestsDisplay.textContent = priceData.guests;
  if (elements.totalPrice) elements.totalPrice.innerHTML = `<strong>${formatCurrency(priceData.finalTotal)}</strong>`;
  
  // Show/hide conditional lines and update values
  if (priceData.seasonalAdjustment !== 0) {
    if (elements.seasonalLine) elements.seasonalLine.style.display = 'flex';
    if (elements.seasonalAdjustment) {
      elements.seasonalAdjustment.textContent = 
        (priceData.seasonalAdjustment > 0 ? '+' : '') + formatCurrency(priceData.seasonalAdjustment);
    }
  } else {
    if (elements.seasonalLine) elements.seasonalLine.style.display = 'none';
  }
  
  if (priceData.weekendSurcharge > 0) {
    if (elements.weekendLine) elements.weekendLine.style.display = 'flex';
    if (elements.weekendSurcharge) elements.weekendSurcharge.textContent = formatCurrency(priceData.weekendSurcharge);
  } else {
    if (elements.weekendLine) elements.weekendLine.style.display = 'none';
  }
  
  if (priceData.guestMultiplier > 0) {
    if (elements.guestLine) elements.guestLine.style.display = 'flex';
    if (elements.guestMultiplier) elements.guestMultiplier.textContent = formatCurrency(priceData.guestMultiplier);
  } else {
    if (elements.guestLine) elements.guestLine.style.display = 'none';
  }
  
  if (priceData.promoDiscount > 0) {
    if (elements.promoLine) elements.promoLine.style.display = 'flex';
    if (elements.promoDiscount) elements.promoDiscount.textContent = formatCurrency(priceData.promoDiscount);
  } else {
    if (elements.promoLine) elements.promoLine.style.display = 'none';
  }
}

function resetPriceDisplay() {
  const priceData = {
    basePrice: 0,
    nights: 0,
    guests: 1,
    seasonalAdjustment: 0,
    weekendSurcharge: 0,
    guestMultiplier: 0,
    promoDiscount: 0,
    finalTotal: 0
  };
  updatePriceDisplay(priceData);
}

function updateSubmitButton() {
  const submitBtn = document.getElementById('submitBtn');
  if (!submitBtn) return;
  
  const form = document.getElementById('bookingForm');
  if (!form) return;
  
  const requiredFields = [
    'customerName', 'customerEmail', 'customerPhone', 'guestCount',
    'package', 'destination', 'checkinDate', 'checkoutDate', 'termsCheckbox'
  ];
  
  let isValid = true;
  
  for (const fieldId of requiredFields) {
    const field = document.getElementById(fieldId);
    if (!field) continue;
    
    if (field.type === 'checkbox') {
      if (!field.checked) {
        isValid = false;
        break;
      }
    } else if (!field.value || field.classList.contains('error')) {
      isValid = false;
      break;
    }
  }
  
  submitBtn.disabled = !isValid;
}

// ============================================================================
// GALLERY FUNCTIONALITY WITH MODAL AND ATTRIBUTE MANIPULATION
// ============================================================================

function setupGallery() {
  const galleryContainer = document.getElementById('galleryContainer');
  const gridToggle = document.getElementById('gridToggle');
  const categoryFilter = document.getElementById('categoryFilter');
  const modal = document.getElementById('imageModal');
  
  if (!galleryContainer) return;
  
  // Get all gallery images with data attributes
  galleryImages = Array.from(galleryContainer.querySelectorAll('.gallery-item img'));
  
  // Gallery layout toggle
  if (gridToggle) {
    gridToggle.addEventListener('click', () => {
      galleryContainer.classList.toggle('list-view');
      gridToggle.textContent = galleryContainer.classList.contains('list-view') 
        ? 'Grid View' : 'List View';
    });
  }
  
  // Category filtering
  if (categoryFilter) {
    categoryFilter.addEventListener('change', () => {
      const selectedCategory = categoryFilter.value;
      const galleryItems = galleryContainer.querySelectorAll('.gallery-item');
      
      galleryItems.forEach(item => {
        const itemCategory = item.dataset.category;
        
        if (selectedCategory === '' || itemCategory === selectedCategory) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  }
  
  // Modal functionality using data attributes
  galleryImages.forEach((img, index) => {
    img.parentElement.addEventListener('click', () => {
      openModal(index);
    });
  });
  
  setupModalControls();
}

function openModal(index) {
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalLocation = document.getElementById('modalLocation');
  
  if (!modal || !modalImage || index < 0 || index >= galleryImages.length) return;
  
  currentImageIndex = index;
  const img = galleryImages[index];
  
  // Read data attributes and update modal
  const largeSrc = img.dataset.large || img.src;
  const title = img.dataset.title || img.alt;
  const location = img.dataset.location || '';
  
  modalImage.src = largeSrc;
  modalImage.alt = title;
  
  if (modalTitle) modalTitle.textContent = title;
  if (modalLocation) modalLocation.textContent = location;
  
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  
  // Focus management for accessibility
  modal.focus();
}

function closeModal() {
  const modal = document.getElementById('imageModal');
  if (modal) {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
  }
}

function showNextImage() {
  const nextIndex = (currentImageIndex + 1) % galleryImages.length;
  openModal(nextIndex);
}

function showPrevImage() {
  const prevIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  openModal(prevIndex);
}

function setupModalControls() {
  const modal = document.getElementById('imageModal');
  const closeBtn = document.querySelector('.modal-close');
  const prevBtn = document.getElementById('prevImage');
  const nextBtn = document.getElementById('nextImage');
  
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', showPrevImage);
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', showNextImage);
  }
  
  if (modal) {
    // Close modal when clicking outside the content
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('show')) return;
      
      switch (e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          showPrevImage();
          break;
        case 'ArrowRight':
          showNextImage();
          break;
      }
    });
  }
}

// ============================================================================
// MOBILE MENU FUNCTIONALITY
// ============================================================================

function setupMobileMenu() {
  const btn = document.getElementById('mobileMenu');
  const drawer = document.getElementById('menuDrawer');
  
  if (btn && drawer) {
    btn.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('open');
      drawer.setAttribute('aria-hidden', String(!isOpen));
      btn.setAttribute('aria-expanded', String(isOpen));
    });
    
    // Close drawer when clicking outside
    document.addEventListener('click', (e) => {
      if (!drawer.contains(e.target) && !btn.contains(e.target) && drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden', 'true');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

// ============================================================================
// FORM SUBMISSION HANDLING
// ============================================================================

function setupFormSubmission() {
  const form = document.getElementById('bookingForm');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (!form.checkValidity()) {
      alert('Please complete all required fields correctly.');
      return;
    }
    
    // Collect form data
    const formData = new FormData(form);
    const bookingData = Object.fromEntries(formData.entries());
    
    // Add calculated pricing information
    const selectedPackage = packages.find(pkg => pkg.name === bookingData.package);
    if (selectedPackage) {
      const nights = nightsBetween(bookingData.checkin, bookingData.checkout);
      const guests = parseInt(bookingData.guests);
      const finalPrice = calculateFinalPrice(selectedPackage.basePrice, selectedPackage.season, bookingData.weekendDeparture === 'on');
      
      bookingData.nights = nights;
      bookingData.finalPrice = finalPrice * nights;
      bookingData.pricePerNight = finalPrice;
    }
    
    console.log('Booking Data:', bookingData);
    
    // Simulate successful submission
    alert(`Thank you, ${bookingData.name}! Your booking request has been received. We will contact you at ${bookingData.email} within 24 hours to confirm availability and payment details.`);
    
    // Reset form
    form.reset();
    resetPriceDisplay();
    updateSubmitButton();
  });
}

// ============================================================================
// INITIALIZATION AND EVENT LISTENERS
// ============================================================================

// DOM Content Loaded event listener
document.addEventListener('DOMContentLoaded', () => {
  // Initialize year in footer
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  // Setup navigation highlighting
  highlightActiveNavigation();
  
  // Setup mobile menu
  setupMobileMenu();
  
  // Page-specific initialization
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  switch (currentPage) {
    case 'index.html':
    case '':
      renderHomepageContent();
      break;
      
    case 'packages.html':
      renderPackagesTable();
      
      // Setup filter event listeners
      const seasonFilter = document.getElementById('seasonFilter');
      const sortPackages = document.getElementById('sortPackages');
      
      if (seasonFilter) {
        seasonFilter.addEventListener('change', renderPackagesTable);
      }
      
      if (sortPackages) {
        sortPackages.addEventListener('change', renderPackagesTable);
      }
      break;
      
    case 'booking.html':
      populateBookingSelects();
      setupFormValidation();
      setupFormSubmission();
      
      // Add event listeners for price estimation
      const priceFields = ['package', 'guestCount', 'checkinDate', 'checkoutDate', 'promoCode', 'weekendDeparture'];
      
      priceFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
          const eventType = field.type === 'checkbox' ? 'change' : 'input';
          field.addEventListener(eventType, updatePriceEstimate);
          field.addEventListener('change', updatePriceEstimate);
        }
      });
      
      // Initial price calculation
      setTimeout(updatePriceEstimate, 100);
      break;
      
    case 'gallery.html':
      setupGallery();
      break;
  }
});

// Window scroll event for additional navigation effects
window.addEventListener('scroll', () => {
  const header = document.querySelector('.site-header');
  if (header) {
    if (window.scrollY > 100) {
      header.style.background = 'rgba(11, 18, 32, 0.95)';
    } else {
      header.style.background = 'rgba(11, 18, 32, 0.8)';
    }
  }
});

// ============================================================================
// EXPORT FOR TESTING (if needed)
// ============================================================================

// Make functions available globally for testing
window.TravelApp = {
  packages,
  promoCodes,
  calculateFinalPrice,
  validateEmail,
  validatePhone,
  validateName,
  formatCurrency,
  nightsBetween
};
