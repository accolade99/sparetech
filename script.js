 /* ============================================================
       DATA
    ============================================================ */
    const WHATSAPP_NUMBER = '2348033070330';

    const products = [
      { name: 'Genuine Oil Filter',       price: '₦5,500',  tag: 'Genuine',    desc: 'Compatible with Toyota, Honda, and Kia models.',
        img: 'https://images.unsplash.com/photo-1623891008551-0cb51e7aa6da?w=600&auto=format&fit=crop' },
      { name: 'Disc Brake Rotor',         price: '₦28,000', tag: 'Top Quality', desc: 'High-carbon steel venting disc for maximum cooling performance.',
        img: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop' },
      { name: 'Fully Synthetic 5W-30',    price: '₦34,500', tag: 'Premium',    desc: 'Advanced 4L engine motor lubrication for structural core protection.',
        img: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&auto=format&fit=crop' },
      { name: 'Iridium Spark Plugs',     price: '₦16,000', tag: 'Pack of 4',  desc: 'High ignition performance efficiency matching OEM requirements.',
        img: 'https://images.unsplash.com/photo-1620882046414-b89286d9dbf4?w=600&auto=format&fit=crop' },
      { name: 'Heavy Duty Car Battery',   price: '₦65,000', tag: 'Warranty',   desc: 'Maintenance-free cells engineered to handle rigorous tasks safely.',
        img: 'https://images.unsplash.com/photo-1552656967-7a0991a13906?w=600&auto=format&fit=crop' },
      { name: 'Front Strut Assembly',     price: '₦42,000', tag: 'Suspension', desc: 'Premium fluid shocks designed for optimal road vibration reduction.',
        img: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&auto=format&fit=crop' }
    ];

    const testimonials = [
      { name: 'Emeka Okafor', location: 'Ikeja, Lagos', text: 'Finding pristine original parts for my imported car configuration in mainland Lagos used to be painful until I connected with Sparetech Ent. Delivery arrived at my workshop layout inside 3 hours.', initials: 'EO' },
      { name: 'Alhaji Musa Bello', location: 'Surulere, Lagos', text: 'Exceptional components catalog and pricing parameters are completely honest. The specific replacement engine components package matched descriptions exactly.', initials: 'MB' }
    ];

    /* ============================================================
       DOM STRUCTURAL INJECTIONS & RENDER MANAGEMENT
    ============================================================ */
    document.addEventListener('DOMContentLoaded', () => {
      renderProducts();
      renderTestimonials();
      initHeroSlider();
      initTestimonialSlider();
      initNavigation();
      initScrollTop();
      initOrderModalLogic();
    });

    function renderProducts() {
      const grid = document.getElementById('productsGrid');
      grid.innerHTML = products.map(p => `
        <article class="product-card">
          <div class="product-img-wrap">
            <span class="product-tag">${p.tag}</span>
            <img src="${p.img}" alt="${p.name}" loading="lazy" />
          </div>
          <div class="product-body">
            <h3 class="product-name">${p.name}</h3>
            <p class="product-desc">${p.desc}</p>
            <div class="product-footer">
              <span class="product-price">${p.price}</span>
              <button class="btn btn-outline" onclick="openOrderModal('${p.name}', '${p.price}')">
                <i class="fab fa-whatsapp"></i> Order
              </button>
            </div>
          </div>
        </article>
      `).join('');
    }

    function renderTestimonials() {
      const track = document.getElementById('testiTrack');
      track.innerHTML = testimonials.map(t => `
        <div class="testi-slide">
          <div class="testi-card">
            <span class="testi-quote-icon">“</span>
            <div class="testi-stars">
              <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
            </div>
            <p class="testi-text">${t.text}</p>
            <div class="testi-author">
              <div class="testi-avatar">${t.initials}</div>
              <div>
                <h4 class="testi-name">${t.name}</h4>
                <span class="testi-location">${t.location}</span>
              </div>
            </div>
          </div>
        </div>
      `).join('');
    }

    /* ============================================================
       INTERMEDIATE COMPONENT MODAL LOGIC
    ============================================================ */
    let totalCartValue = 0;
    const cartCountSpan = document.getElementById('cartCount');
    const orderDialog = document.getElementById('orderDialog');
    const closeDialogBtn = document.getElementById('closeDialogBtn');
    const dialogForm = document.getElementById('dialogForm');
    
    const modalProductInput = document.getElementById('modalProduct');
    const modalPriceInput = document.getElementById('modalPrice');

    function initOrderModalLogic() {
      // Close via standard close button element
      closeDialogBtn.addEventListener('click', () => {
        orderDialog.close();
      });

      // Handle Dialog context form verification and custom routing redirection
      dialogForm.addEventListener('submit', (e) => {
        // Increment global structural application cart simulation element value
        totalCartValue++;
        cartCountSpan.textContent = totalCartValue;

        const product = modalProductInput.value;
        const price = modalPriceInput.value;
        const customerName = document.getElementById('custName').value;
        const targetQty = document.getElementById('custQuantity').value;
        const locationStr = document.getElementById('custDelivery').value;
        const customerNotes = document.getElementById('custNotes').value;

        // Structured text template execution
        let msg = `Hello Sparetech Ent., I want to buy:\n\n`;
        msg += `📦 *Product:* ${product}\n`;
        msg += `💰 *Base Price:* ${price}\n`;
        msg += `🔢 *Quantity:* ${targetQty} item(s)\n\n`;
        msg += `👤 *Customer Name:* ${customerName}\n`;
        msg += `📍 *Delivery Location:* ${locationStr}\n`;
        
        if(customerNotes.trim() !== "") {
          msg += `📝 *Additional Notes:* ${customerNotes}`;
        }

        const encodedText = encodeURIComponent(msg);
        const waURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;
        
        window.open(waURL, '_blank');
        dialogForm.reset();
      });
    }

    // Global utility execution mapping hook
    window.openOrderModal = function(name, price) {
      modalProductInput.value = name;
      modalPriceInput.value = price;
      orderDialog.showModal();
    };

    /* ============================================================
       HERO SLIDER DRIVER MECHANISM
    ============================================================ */
    function initHeroSlider() {
      const track = document.getElementById('sliderTrack');
      const slides = document.querySelectorAll('#hero .slide');
      const prevBtn = document.getElementById('slidePrev');
      const nextBtn = document.getElementById('slideNext');
      const dotsContainer = document.getElementById('sliderDots');
      let index = 0;
      let timer;

      slides.forEach((_, i) => {
        const d = document.createElement('div');
        d.classList.add('dot');
        if (i === 0) d.classList.add('active');
        d.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(d);
      });

      const dots = dotsContainer.querySelectorAll('.dot');

      function update() {
        track.style.transform = `translateX(-${index * 100}%)`;
        slides.forEach((s, i) => s.classList.toggle('active', i === index));
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
      }

      function next() {
        index = (index + 1) % slides.length;
        update();
      }

      function goTo(i) {
        index = i;
        update();
        resetTimer();
      }

      function resetTimer() {
        clearInterval(timer);
        timer = setInterval(next, 6000);
      }

      prevBtn.addEventListener('click', () => {
        index = (index - 1 + slides.length) % slides.length;
        update();
        resetTimer();
      });

      nextBtn.addEventListener('click', () => {
        next();
        resetTimer();
      });

      resetTimer();
    }

    /* ============================================================
       TESTIMONIALS SLIDER MECHANISM
    ============================================================ */
    function initTestimonialSlider() {
      const track = document.getElementById('testiTrack');
      const slides = document.querySelectorAll('.testi-slide');
      const prevBtn = document.getElementById('testiPrev');
      const nextBtn = document.getElementById('testiNext');
      const dotsContainer = document.getElementById('testiDots');
      let index = 0;

      slides.forEach((_, i) => {
        const d = document.createElement('div');
        d.classList.add('testi-dot');
        if (i === 0) d.classList.add('active');
        d.addEventListener('click', () => { index = i; update(); });
        dotsContainer.appendChild(d);
      });

      const dots = dotsContainer.querySelectorAll('.testi-dot');

      function update() {
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
      }

      prevBtn.addEventListener('click', () => {
        index = (index - 1 + slides.length) % slides.length;
        update();
      });

      nextBtn.addEventListener('click', () => {
        index = (index + 1) % slides.length;
        update();
      });
    }

    /* ============================================================
       NAVIGATION UTILITIES
    ============================================================ */
    function initNavigation() {
      const hamburger = document.getElementById('hamburger');
      const mobileMenu = document.getElementById('mobileMenu');
      const links = document.querySelectorAll('#navbar .nav-links a, #mobileMenu a');

      hamburger.addEventListener('click', () => {
        const open = mobileMenu.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', open);
        hamburger.innerHTML = open ? `<i class="fas fa-xmark"></i>` : `<i class="fas fa-bars"></i>`;
      });

      links.forEach(l => {
        l.addEventListener('click', () => {
          mobileMenu.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
          hamburger.innerHTML = `<i class="fas fa-bars"></i>`;
        });
      });
    }

    /* ============================================================
       SCROLL UTILITY TOPPER
    ============================================================ */
    function initScrollTop() {
      const btn = document.getElementById('scrollTop');
      window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
      });
      btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    /* ============================================================
       NEWSLETTER HANDLER SIMULATION
    ============================================================ */
    window.handleSubscribe = function() {
      const input = document.getElementById('emailInput');
      if (input.value.trim() === '' || !input.validity.valid) {
        alert('Please provide a valid email structure.');
        return;
      }
      alert("Thank you for subscribing! We'll send you offers via WhatsApp/email.");
      input.value = '';
    };