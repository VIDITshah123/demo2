// ==========================================================================
// RESORTO LUXURY INTERACTIONS & ANIMATIONS FOR BELLAVIERRE
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------------------------------------
  // 1. CUSTOM INTERACTIVE CURSOR (Resorto 1:1)
  // ------------------------------------------------------------------------
  const cursorWrapper = document.getElementById('customCursorWrapper');
  const cursorPointer = document.getElementById('cursorPointer');

  if (cursorWrapper && cursorPointer) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function renderCursor() {
      currentX += (mouseX - currentX) * 0.18;
      currentY += (mouseY - currentY) * 0.18;
      cursorPointer.style.transform = `translate(${currentX}px, ${currentY}px)`;
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Expand circle on hovering interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, select, .room-card-slide, .package-panel, .facility-column, .gallery-tile');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursorWrapper.classList.add('is-hovering');
      });
      el.addEventListener('mouseleave', () => {
        cursorWrapper.classList.remove('is-hovering');
      });
    });
  }

  // ------------------------------------------------------------------------
  // 2. HERO SLIDER AUTO-ROTATION
  // ------------------------------------------------------------------------
  const heroSlides = document.querySelectorAll('.hero-slide');
  let currentHeroSlide = 0;

  function nextHeroSlide() {
    if (!heroSlides.length) return;
    heroSlides[currentHeroSlide].classList.remove('active');
    currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
    heroSlides[currentHeroSlide].classList.add('active');
  }

  let heroInterval = setInterval(nextHeroSlide, 5500);

  // ------------------------------------------------------------------------
  // 3. STATS COUNT-UP ANIMATION (IntersectionObserver)
  // ------------------------------------------------------------------------
  const statNumbers = document.querySelectorAll('.stat-big-number');
  let statsAnimated = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        statNumbers.forEach((el) => {
          const target = parseInt(el.getAttribute('data-target'), 10);
          const duration = 1800;
          const stepTime = 25;
          const totalSteps = duration / stepTime;
          let currentStep = 0;

          const counter = setInterval(() => {
            currentStep++;
            const progress = currentStep / totalSteps;
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.round(target * easeOut);
            el.textContent = currentVal;

            if (currentStep >= totalSteps) {
              el.textContent = target;
              clearInterval(counter);
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.4 });

  const statsSection = document.querySelector('.at-a-glance-section');
  if (statsSection) statsObserver.observe(statsSection);

  // ------------------------------------------------------------------------
  // 4. 3D PERSPECTIVE ROOM / DEVELOPMENT CAROUSEL (Resorto 1:1)
  // ------------------------------------------------------------------------
  const roomSlides = document.querySelectorAll('.room-card-slide');
  const prevBtn = document.getElementById('roomPrevBtn');
  const nextBtn = document.getElementById('roomNextBtn');
  let activeRoomIdx = 1; // Slide 2 is active center by default

  function updateRoomCarousel() {
    const total = roomSlides.length;
    roomSlides.forEach((slide, idx) => {
      slide.classList.remove('slide-center', 'slide-left', 'slide-right', 'slide-hidden');
      
      const diff = (idx - activeRoomIdx + total) % total;

      if (diff === 0) {
        slide.classList.add('slide-center');
      } else if (diff === total - 1 || diff === -1) {
        slide.classList.add('slide-left');
      } else if (diff === 1) {
        slide.classList.add('slide-right');
      } else {
        slide.classList.add('slide-hidden');
      }
    });
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      activeRoomIdx = (activeRoomIdx - 1 + roomSlides.length) % roomSlides.length;
      updateRoomCarousel();
    });

    nextBtn.addEventListener('click', () => {
      activeRoomIdx = (activeRoomIdx + 1) % roomSlides.length;
      updateRoomCarousel();
    });

    // Clicking left/right cards navigates directly to them
    roomSlides.forEach((slide, idx) => {
      slide.addEventListener('click', (e) => {
        if (!e.target.closest('button')) {
          activeRoomIdx = idx;
          updateRoomCarousel();
        }
      });
    });
  }

  // ------------------------------------------------------------------------
  // 5. FACILITIES ACCORDION & DYNAMIC WATERMARK (Resorto 1:1)
  // ------------------------------------------------------------------------
  const facilityCols = document.querySelectorAll('.facility-column');
  const facilityBgs = document.querySelectorAll('.facility-bg');
  const watermarkTitle = document.getElementById('facilityWatermark');

  facilityCols.forEach((col) => {
    function activateFacility() {
      const idx = col.getAttribute('data-facility');
      const title = col.getAttribute('data-title');

      facilityCols.forEach((c) => c.classList.remove('active'));
      col.classList.add('active');

      facilityBgs.forEach((bg) => bg.classList.remove('active'));
      const activeBg = document.getElementById(`facilityBg${idx}`);
      if (activeBg) activeBg.classList.add('active');

      if (watermarkTitle && title) {
        watermarkTitle.style.opacity = '0';
        watermarkTitle.style.transform = 'translateY(-10px)';
        setTimeout(() => {
          watermarkTitle.textContent = title;
          watermarkTitle.style.opacity = '1';
          watermarkTitle.style.transform = 'translateY(0)';
        }, 200);
      }
    }

    col.addEventListener('mouseenter', activateFacility);
    col.addEventListener('click', activateFacility);
  });

  // ------------------------------------------------------------------------
  // 6. PACKAGES 3-PANEL SPLIT (Resorto 1:1)
  // ------------------------------------------------------------------------
  const packagePanels = document.querySelectorAll('.package-panel');
  packagePanels.forEach((panel) => {
    panel.addEventListener('mouseenter', () => {
      packagePanels.forEach((p) => p.classList.remove('active'));
      panel.classList.add('active');
    });
    panel.addEventListener('click', () => {
      packagePanels.forEach((p) => p.classList.remove('active'));
      panel.classList.add('active');
    });
  });

  // ------------------------------------------------------------------------
  // 7. PHOTO MOSAIC LIGHTBOX
  // ------------------------------------------------------------------------
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImage');
  const lightboxClose = document.getElementById('lightboxCloseBtn');
  const galleryTiles = document.querySelectorAll('.gallery-tile:not(.special-gallery-title)');

  galleryTiles.forEach((tile) => {
    tile.addEventListener('click', () => {
      const src = tile.getAttribute('data-img');
      if (src && lightboxImg && lightboxModal) {
        lightboxImg.src = src;
        lightboxModal.classList.add('active');
      }
    });
  });

  if (lightboxClose && lightboxModal) {
    lightboxClose.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
    });
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
      }
    });
  }

  // ------------------------------------------------------------------------
  // 8. 3-COLUMN MEGA MENU
  // ------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const megaMenu = document.getElementById('megaMenu');
  const megaMenuCloseBtn = document.getElementById('megaMenuCloseBtn');
  const menuItemLinks = document.querySelectorAll('.menu-item-link');

  function openMegaMenu() {
    if (megaMenu) megaMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMegaMenu() {
    if (megaMenu) megaMenu.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMegaMenu);
  if (megaMenuCloseBtn) megaMenuCloseBtn.addEventListener('click', closeMegaMenu);
  menuItemLinks.forEach((l) => l.addEventListener('click', closeMegaMenu));

  // ------------------------------------------------------------------------
  // 9. SEARCH MODAL & INSTANT FILTERING
  // ------------------------------------------------------------------------
  const searchTrigger = document.getElementById('searchTriggerBtn');
  const searchModal = document.getElementById('searchModal');
  const searchClose = document.getElementById('searchModalClose');
  const searchInput = document.getElementById('propertySearchInput');
  const searchResults = document.getElementById('searchResultsList');

  const propertyData = [
    { title: 'Sobha Skyvue Elvira', location: 'Sobha Hartland II', price: 'AED 1,850,000', type: 'Apartments', img: 'https://bellavierre.com/wp-content/uploads/2026/09/Sobha-Sky-Featured-1-300x140.jpg' },
    { title: 'Shahrukhz by Danube', location: 'Al Warsan, Dubai', price: 'AED 1,100,000', type: 'Furnished Apartments', img: 'https://bellavierre.com/wp-content/uploads/2026/08/shahrukhz-featured-300x140.jpg' },
    { title: 'Sobha Elwood Villas', location: 'Dubailand', price: 'AED 7,900,000', type: 'Luxury Forest Villas', img: 'https://bellavierre.com/wp-content/uploads/2026/09/Sobha-Elwood-Featured-300x140.jpg' },
    { title: 'Palm Jumeirah Signature Villa', location: 'Palm Jumeirah', price: 'AED 28,000,000', type: 'Waterfront Villa', img: 'https://bellavierre.com/wp-content/uploads/2026/09/4-300x180.jpg' },
    { title: 'Downtown Sky Penthouse', location: 'Downtown Dubai', price: 'AED 14,500,000', type: 'Burj View Penthouse', img: 'https://bellavierre.com/wp-content/uploads/2026/08/h4-img1.jpg' }
  ];

  function renderSearchResults(query = '') {
    if (!searchResults) return;
    const filtered = propertyData.filter((p) => 
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.location.toLowerCase().includes(query.toLowerCase()) ||
      p.type.toLowerCase().includes(query.toLowerCase())
    );

    if (filtered.length === 0) {
      searchResults.innerHTML = `<div style="padding: 20px; color: #888; text-align: center;">No developments matching "${query}". Try Sobha, Danube or Palm.</div>`;
      return;
    }

    searchResults.innerHTML = filtered.map((p) => `
      <div class="search-result-item" onclick="document.getElementById('searchModal').classList.remove('active'); document.getElementById('rooms').scrollIntoView({behavior: 'smooth'});">
        <img src="${p.img}" alt="${p.title}" />
        <div style="flex: 1;">
          <h4 style="font-size: 15px; color: #fff; text-transform: uppercase;">${p.title}</h4>
          <p style="font-size: 13px; color: #aaa;">${p.location} • ${p.type}</p>
        </div>
        <span style="font-size: 14px; color: var(--gold); font-weight: 600;">${p.price}</span>
      </div>
    `).join('');
  }

  function openSearch() {
    if (searchModal) {
      searchModal.classList.add('active');
      renderSearchResults('');
      if (searchInput) {
        searchInput.value = '';
        setTimeout(() => searchInput.focus(), 100);
      }
    }
  }

  if (searchTrigger) searchTrigger.addEventListener('click', openSearch);
  if (searchClose) searchClose.addEventListener('click', () => searchModal.classList.remove('active'));
  if (searchInput) {
    searchInput.addEventListener('input', (e) => renderSearchResults(e.target.value));
  }

  // Keyboard Shortcuts: ESC closes modals, / opens search
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMegaMenu();
      if (searchModal) searchModal.classList.remove('active');
      if (lightboxModal) lightboxModal.classList.remove('active');
      const drawer = document.getElementById('shortlistDrawer');
      if (drawer) drawer.classList.remove('active');
    } else if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
      e.preventDefault();
      openSearch();
    }
  });

  // ------------------------------------------------------------------------
  // 10. SHORTLIST DRAWER & BROCHURE REQUEST
  // ------------------------------------------------------------------------
  const shortlistTrigger = document.getElementById('shortlistTriggerBtn');
  const shortlistDrawer = document.getElementById('shortlistDrawer');
  const shortlistClose = document.getElementById('shortlistCloseBtn');
  const shortlistItemsList = document.getElementById('shortlistItemsList');
  const shortlistBadge = document.getElementById('shortlistBadgeCount');
  const shortlistDrawerCount = document.getElementById('shortlistCountDrawer');

  const savedList = [
    { title: 'Sobha Skyvue Elvira', price: 'AED 1,850,000', location: 'Sobha Hartland II', img: 'https://bellavierre.com/wp-content/uploads/2026/09/Sobha-Sky-Featured-1-300x140.jpg' },
    { title: 'Shahrukhz by Danube', price: 'AED 1,100,000', location: 'Al Warsan', img: 'https://bellavierre.com/wp-content/uploads/2026/08/shahrukhz-featured-300x140.jpg' },
    { title: 'Sobha Elwood Villas', price: 'AED 7,900,000', location: 'Dubailand', img: 'https://bellavierre.com/wp-content/uploads/2026/09/Sobha-Elwood-Featured-300x140.jpg' }
  ];

  function renderShortlist() {
    if (!shortlistItemsList) return;
    if (shortlistBadge) shortlistBadge.textContent = savedList.length;
    if (shortlistDrawerCount) shortlistDrawerCount.textContent = savedList.length;

    shortlistItemsList.innerHTML = savedList.map((item, idx) => `
      <div class="shortlist-item-card">
        <img src="${item.img}" alt="${item.title}" />
        <div style="flex: 1;">
          <h4 style="font-size: 14px; color: #fff; text-transform: uppercase;">${item.title}</h4>
          <p style="font-size: 12px; color: #888;">${item.location}</p>
          <div style="font-size: 13px; color: var(--gold); font-weight: 600; margin-top: 4px;">${item.price}</div>
        </div>
        <button style="color: #666; cursor: pointer; align-self: flex-start;" onclick="window.removeSaved(${idx})">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `).join('');
  }

  window.removeSaved = function(idx) {
    savedList.splice(idx, 1);
    renderShortlist();
    showToast('Removed from your saved shortlist.');
  };

  if (shortlistTrigger && shortlistDrawer) {
    shortlistTrigger.addEventListener('click', () => {
      renderShortlist();
      shortlistDrawer.classList.add('active');
    });
  }

  if (shortlistClose && shortlistDrawer) {
    shortlistClose.addEventListener('click', () => {
      shortlistDrawer.classList.remove('active');
    });
  }

  // ------------------------------------------------------------------------
  // 11. TOAST NOTIFICATIONS & CTAS
  // ------------------------------------------------------------------------
  const toast = document.getElementById('toastNotice');

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  const dockSubmit = document.getElementById('dockSubmitBtn');
  if (dockSubmit) {
    dockSubmit.addEventListener('click', () => {
      const loc = document.getElementById('dockLocation')?.value;
      const budget = document.getElementById('dockBudget')?.value;
      showToast(`Enquiry received for ${loc} (${budget}). A property advisor will reach out shortly.`);
    });
  }

  const navEnquire = document.getElementById('navEnquireBtn');
  if (navEnquire) {
    navEnquire.addEventListener('click', () => {
      showToast('Connecting you with Bellavierre private client advisory...');
      window.location.hash = '#hero';
    });
  }

  const megaConsult = document.getElementById('megaConsultBtn');
  if (megaConsult) {
    megaConsult.addEventListener('click', () => {
      closeMegaMenu();
      showToast('VIP Consultation request logged. Our director will contact you via WhatsApp/Email.');
    });
  }

  const reqBrochures = document.getElementById('requestShortlistBrochures');
  if (reqBrochures) {
    reqBrochures.addEventListener('click', () => {
      if (shortlistDrawer) shortlistDrawer.classList.remove('active');
      showToast('Official floor plans, payment schedules & ROI models emailed to you.');
    });
  }

  const newsletterBtn = document.getElementById('footerNewsletterBtn');
  if (newsletterBtn) {
    newsletterBtn.addEventListener('click', () => {
      const email = document.getElementById('footerEmail')?.value;
      if (email) {
        showToast(`Subscribed ${email} to weekly Dubai market off-plan reports.`);
        document.getElementById('footerEmail').value = '';
      } else {
        showToast('Please enter a valid email address.');
      }
    });
  }

  // Quick View Buttons on Room Carousel
  document.querySelectorAll('.quick-view-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const proj = btn.getAttribute('data-project');
      showToast(`Selected ${proj}. Preparing virtual 3D tour & escrow documentation...`);
    });
  });

  // Initial setup calls
  updateRoomCarousel();
  renderShortlist();
});
