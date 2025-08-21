// Mobile drawer
const btn = document.getElementById('mobileMenu');
const drawer = document.getElementById('menuDrawer');
if (btn && drawer){
  btn.addEventListener('click', () => {
    const open = drawer.classList.toggle('open');
    drawer.setAttribute('aria-hidden', String(!open));
    btn.setAttribute('aria-expanded', String(open));
  });
}
// Footer year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Pre-fill booking form from query params & simple quote calculator
function getParam(name){
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

const pkgSelect = document.getElementById('package');
const destSelect = document.getElementById('destination');
const startDate = document.getElementById('startDate');
const endDate = document.getElementById('endDate');
const out = document.getElementById('quote');

// Set min dates (today and after)
const today = new Date().toISOString().slice(0,10);
if (startDate) startDate.min = today;
if (endDate) endDate.min = today;

// Sync end date to be >= start
if (startDate && endDate){
  startDate.addEventListener('change', () => {
    endDate.min = startDate.value || today;
    if (endDate.value && endDate.value < endDate.min) endDate.value = endDate.min;
  });
}

if (pkgSelect && destSelect){
  const qpPkg = getParam('pkg');
  const qpDest = getParam('dest');
  if (qpPkg) Array.from(pkgSelect.options).forEach(o => { if (o.value === qpPkg) o.selected = true; });
  if (qpDest) Array.from(destSelect.options).forEach(o => { if (o.value === qpDest) o.selected = true; });
}

// Price map from packages page (keep in sync)
const basePrices = {
  "Paris Essentials": 1299,
  "Japan Explorer": 1999,
  "Greek Island Hopping": 1799,
  "Safari Adventure": 1599
};

function nightsBetween(a,b){
  const d1 = new Date(a), d2 = new Date(b);
  const ms = d2 - d1;
  return Math.max(1, Math.round(ms / (1000*60*60*24)));
}

function updateQuote(){
  if (!pkgSelect || !startDate || !endDate) return;
  const pkg = pkgSelect.value;
  const guests = document.querySelector('input[name="guests"]')?.valueAsNumber || 1;
  if (!pkg || !startDate.value || !endDate.value) { out && (out.textContent = ""); return; }
  const base = basePrices[pkg] || 0;
  const nights = nightsBetween(startDate.value, endDate.value);
  // Simple per-night adjustment (illustrative)
  const total = Math.round( (base + (nights-1)*60) * guests );
  if (out) out.textContent = `Estimated total for ${guests} ${guests>1?"guests":"guest"} over ${nights} ${nights>1?"nights":"night"}: $${total.toLocaleString()}`;
}

['change','input'].forEach(ev => {
  pkgSelect && pkgSelect.addEventListener(ev, updateQuote);
  startDate && startDate.addEventListener(ev, updateQuote);
  endDate && endDate.addEventListener(ev, updateQuote);
  document.querySelector('input[name="guests"]')?.addEventListener(ev, updateQuote);
});

// Form validation demo
const form = document.getElementById('bookingForm');
if (form){
  form.addEventListener('submit', (e) => {
    if (!form.checkValidity()){
      e.preventDefault();
      alert("Please complete all required fields.");
      return;
    }
    e.preventDefault();
    updateQuote();
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    console.log("Booking data", data);
    alert("Thanks! Your request has been received. We will contact you shortly.");
    form.reset();
    if (out) out.textContent = "";
  });
}
