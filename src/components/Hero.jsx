import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const heroSlides = [
  {
    image: 'https://bellavierre.com/wp-content/uploads/2026/09/Sobha-Sky-Featured-1.jpg',
    title: 'SOBHA SKYVUE',
    location: 'MBR City, Dubai',
    alt: 'Sobha Skyvue Dubai Waterfront'
  },
  {
    image: 'https://bellavierre.com/wp-content/uploads/2026/08/shahrukhz-featured.jpg',
    title: 'SHAHRUKHZ BY DANUBE',
    location: 'Al Warsan, Dubai',
    alt: 'Shahrukhz by Danube Dubai'
  },
  {
    image: 'https://bellavierre.com/wp-content/uploads/2026/09/Sobha-Elwood-Featured.jpg',
    title: 'SOBHA ELWOOD',
    location: 'Dubailand, Dubai',
    alt: 'Sobha Elwood Forest Villas'
  }
];

export default function Hero({ onEnquireSubmit }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState('Sobha Hartland & MBR City');
  const [selectedBudget, setSelectedBudget] = useState('AED 1.5M - 3M (Rental Yield)');
  const [selectedType, setSelectedType] = useState('High-Yield Off-Plan Apartment');

  // Interactive 3D mouse parallax tracking
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const springX = useSpring(mousePos.x, { stiffness: 120, damping: 25 });
  const springY = useSpring(mousePos.y, { stiffness: 120, damping: 25 });

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Auto-rotate hero slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Multi-layered scroll parallax transformations
  const { scrollY } = useScroll();
  const bgScale = useTransform(scrollY, [0, 800], [1, 1.22]);
  const bgY = useTransform(scrollY, [0, 800], [0, 150]);
  const contentY = useTransform(scrollY, [0, 600], [0, 160]);
  const contentOpacity = useTransform(scrollY, [0, 480], [1, 0]);

  // Floating parallax coordinate badges (move at opposing speeds for deep layering)
  const floatBadge1Y = useTransform(scrollY, [0, 600], [0, -110]);
  const floatBadge2Y = useTransform(scrollY, [0, 600], [0, -70]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onEnquireSubmit) {
      onEnquireSubmit({ location: selectedLocation, budget: selectedBudget, type: selectedType });
    }
  };

  return (
    <section 
      className="hero-section" 
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Slides with continuous scroll parallax & Ken Burns zoom */}
      <motion.div 
        className="hero-slider-bg"
        style={{ scale: bgScale, y: bgY }}
      >
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`hero-slide ${idx === currentSlide ? 'active' : ''}`}
          >
            <img src={slide.image} alt={slide.alt} className="hero-slide-img" />
            <div className="hero-slide-overlay" />
          </div>
        ))}
      </motion.div>

      {/* Floating Parallax Coordinate Badge (Top Left) */}
      <motion.div 
        className="hero-floating-badge top-left"
        style={{ y: floatBadge1Y }}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <span className="badge-pulse-indicator" />
        <span className="badge-text">25°12'N 55°18'E • DUBAI PRIME CORRIDOR</span>
      </motion.div>

      {/* Floating Parallax Accreditations Badge (Top Right) */}
      <motion.div 
        className="hero-floating-badge top-right"
        style={{ y: floatBadge2Y }}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        <i className="fa-solid fa-shield-halved" />
        <span className="badge-text">RERA REGISTERED • ESCROW AUDITED</span>
      </motion.div>

      {/* Parallax Content Container with interactive 3D mouse tilt */}
      <motion.div 
        className="hero-content"
        style={{ 
          y: contentY, 
          opacity: contentOpacity,
          rotateX: springY.get() * -8,
          rotateY: springX.get() * 8,
          transformPerspective: 1000
        }}
      >
        <motion.div 
          className="hero-badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          ★★★★★ 10-YEAR UAE GOLDEN VISA RESIDENCY
        </motion.div>

        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          HOSPITALITY, LUXURY, AND VISION — BEAUTIFULLY BLENDED AT BELLAVIERRE.
        </motion.h1>

        <div className="hero-divider" />

        <motion.p 
          className="hero-paragraph"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
        >
          We coordinate virtual walkthroughs, project comparisons, documentation and handover around your time zone, so distance never means losing visibility.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="hero-action-buttons-row"
        >
          <a href="#developments" className="primary-button hero-cta-btn">
            <span>EXPLORE PROPERTIES</span>
            <i className="fa-solid fa-arrow-right" />
          </a>
          <a href="#packages" className="secondary-glass-btn">
            <span>VIEW PACKAGES</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Interactive Hero Slide Tabs Switcher */}
      <div className="hero-slide-nav-tabs">
        {heroSlides.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <button
              key={slide.title}
              className={`hero-slide-tab-pill ${isActive ? 'active' : ''}`}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`View slide ${slide.title}`}
            >
              <div className="tab-progress-track">
                {isActive && (
                  <motion.div 
                    className="tab-progress-bar"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 6, ease: 'linear' }}
                  />
                )}
              </div>
              <div className="tab-text-info">
                <span className="tab-num">0{idx + 1}</span>
                <span className="tab-title">{slide.title}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Docked Enquire Bar at Bottom */}
      <div className="enquire-dock">
        <div className="container enquire-dock-inner">
          <div className="enquire-brand-label">
            <span className="brand-dot-pulse" />
            <span>ENQUIRE</span>
          </div>
          
          <div className="enquire-field-group">
            <label className="enquire-field-label">Preferred Community</label>
            <select 
              className="enquire-field-input" 
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option>Sobha Hartland & MBR City</option>
              <option>Palm Jumeirah & Beachfront</option>
              <option>Downtown Dubai & Business Bay</option>
              <option>Dubai Hills Estate</option>
            </select>
          </div>

          <div className="enquire-field-group">
            <label className="enquire-field-label">Investment Budget</label>
            <select 
              className="enquire-field-input" 
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
            >
              <option>AED 1.5M - 3M (Rental Yield)</option>
              <option>AED 2M+ (Golden Visa Eligible)</option>
              <option>AED 5M - 10M (Luxury Waterfront)</option>
              <option>AED 10M+ (Ultra-Prime Trophy)</option>
            </select>
          </div>

          <div className="enquire-field-group">
            <label className="enquire-field-label">Property Type & Goal</label>
            <select 
              className="enquire-field-input" 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option>High-Yield Off-Plan Apartment</option>
              <option>Waterfront Villa / Townhouse</option>
              <option>Skyline Penthouse Collection</option>
            </select>
          </div>

          <button className="enquire-submit-btn" onClick={handleSubmit}>
            <span>Submit Enquiry</span>
            <i className="fa-solid fa-arrow-right" />
          </button>
        </div>
      </div>
    </section>
  );
}
