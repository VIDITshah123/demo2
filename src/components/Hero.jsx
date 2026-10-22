import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const heroSlides = [
  {
    image: 'https://bellavierre.com/wp-content/uploads/2026/09/Sobha-Sky-Featured-1.jpg',
    alt: 'Sobha Skyvue Dubai Waterfront'
  },
  {
    image: 'https://bellavierre.com/wp-content/uploads/2026/08/shahrukhz-featured.jpg',
    alt: 'Shahrukhz by Danube Dubai'
  },
  {
    image: 'https://bellavierre.com/wp-content/uploads/2026/09/Sobha-Elwood-Featured.jpg',
    alt: 'Sobha Elwood Forest Villas'
  }
];

export default function Hero({ onEnquireSubmit }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState('Sobha Hartland & MBR City');
  const [selectedBudget, setSelectedBudget] = useState('AED 1.5M - 3M (Rental Yield)');
  const [selectedType, setSelectedType] = useState('High-Yield Off-Plan Apartment');

  // Auto-rotate hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  // Scroll parallax with Framer Motion
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 600], [0, 140]);
  const opacityParallax = useTransform(scrollY, [0, 450], [1, 0.2]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onEnquireSubmit) {
      onEnquireSubmit({ location: selectedLocation, budget: selectedBudget, type: selectedType });
    }
  };

  return (
    <section className="hero-section" id="hero">
      {/* Background Slides with Ken Burns zoom */}
      <div className="hero-slider-bg">
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`hero-slide ${idx === currentSlide ? 'active' : ''}`}
          >
            <img src={slide.image} alt={slide.alt} className="hero-slide-img" />
            <div className="hero-slide-overlay" />
          </div>
        ))}
      </div>

      {/* Parallax Content Container */}
      <motion.div 
        className="hero-content"
        style={{ y: yParallax, opacity: opacityParallax }}
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
        >
          <a href="#rooms" className="primary-button">
            <span>VIEW DEVELOPMENTS</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Docked Enquire Bar at Bottom */}
      <div className="enquire-dock">
        <div className="container enquire-dock-inner">
          <div className="enquire-brand-label">ENQUIRE</div>
          
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
            Send
          </button>
        </div>
      </div>
    </section>
  );
}
