
/* ===== CONFIG ===== */
const WA_NUMBER = '2348030000000'; // 👈 Replace with actual WhatsApp number

// Track order
function trackAlert(){
  alert ("Please complete your order to Enable Tracking")
}


/* ===== HERO SLIDER ===== */
let currentSlide = 0;
const totalSlides = document.querySelectorAll('.slide').length;
const wrapper = document.getElementById('slides-wrapper');
const dotsContainer = document.getElementById('hero-dots');
let autoSlideTimer;

// Build dots
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement('button');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
  dot.onclick = () => goToSlide(i);
  dotsContainer.appendChild(dot);
}

function goToSlide(n) {
  currentSlide = (n + totalSlides) % totalSlides;
  wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}

function changeSlide(dir) {
  goToSlide(currentSlide + dir);
  resetAutoSlide();
}

function resetAutoSlide() {
  clearInterval(autoSlideTimer);
  autoSlideTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);
}

resetAutoSlide();

// Swipe support
let touchStartX = 0;
wrapper.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX, { passive: true });
wrapper.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) { changeSlide(diff > 0 ? 1 : -1); }
});

/* ===== MOBILE NAV ===== */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

hamburger.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

function closeMobileNav() {
  mobileNav.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
}

/* ===== MODAL ===== */
const modalOverlay = document.getElementById('modal-overlay');

function openModal(partName) {
  document.getElementById('order-part').value = partName || '';
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('order-name').focus(), 100);
}

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Close on overlay click
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });

// Close on Escape
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ===== ORDER SUBMISSION ===== */
function submitOrder() {
  const name  = document.getElementById('order-name').value.trim();
  const phone = document.getElementById('order-phone').value.trim();
  const part  = document.getElementById('order-part').value.trim();
  const qty   = document.getElementById('order-qty').value.trim();
  const car   = document.getElementById('order-car').value.trim();
  const notes = document.getElementById('order-notes').value.trim();

  if (!name || !phone || !part || !qty) {
    alert('Please fill in all required fields (Name, Phone, Auto Part, Quantity).');
    return;
  }

  // Increment cart badge
  const badge = document.getElementById('cart-count');
  badge.textContent = parseInt(badge.textContent) + parseInt(qty);

  const msg = [
    '🚗 *NEW ORDER – Sparetech Enterprise*',
    '-----------------------------------',
    `👤 *Name:* ${name}`,
    `📞 *Phone:* ${phone}`,
    `🔧 *Part:* ${part}`,
    `📦 *Quantity:* ${qty}`,
    car   ? `🚘 *Car:* ${car}` : '',
    notes ? `📝 *Notes:* ${notes}` : '',
    '-----------------------------------',
    '_Sent via sparetechenterprise.com_'
  ].filter(Boolean).join('%0A');

  window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');

  // Reset & close
  ['order-name','order-phone','order-part','order-qty','order-car','order-notes']
    .forEach(id => { const el = document.getElementById(id); if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') { el.value = el.id === 'order-qty' ? '1' : ''; } });
  closeModal();
}

/* ===== NEWSLETTER ===== */
function subscribeNewsletter() {
  const email = document.getElementById('newsletter-email').value.trim();
  const msg   = document.getElementById('newsletter-msg');

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    msg.style.color = '#fca5a5';
    msg.textContent = '⚠️ Please enter a valid email address.';
    return;
  }

  msg.style.color = '#86efac';
  msg.textContent = '✅ Thank you! You\'ve been subscribed successfully.';
  document.getElementById('newsletter-email').value = '';
  setTimeout(() => msg.textContent = '', 5000);
}

// Allow enter key in newsletter
document.getElementById('newsletter-email').addEventListener('keypress', e => {
  if (e.key === 'Enter') subscribeNewsletter();
});
