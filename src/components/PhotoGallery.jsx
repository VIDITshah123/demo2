import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { galleryRow1, galleryRow2 } from '../data/projectsData';

export default function PhotoGallery({ onOpenLightbox }) {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Measure vertical scroll through this tall container on desktop
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Row 1 glides to the left: 0% -> -32%
  // Row 2 glides in the opposite direction: -32% -> 0%
  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-32%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['-32%', '0%']);

  return (
    <section 
      ref={containerRef} 
      className="horizontal-slider-section" 
      id="gallery"
    >
      <div className="camera">
        {/* Subtle Section Floating Header */}
        <div className="gallery-header-bar">
          <div className="subtitle-block">
            <div className="subtitle-divider" />
            <div className="subtitle-title">VISUAL ARCHIVE</div>
            <div className="subtitle-divider rotate-reverse" />
          </div>
          <h2 className="gallery-header-heading">IMMERSIVE LIVING & ARCHITECTURE</h2>
        </div>

        {/* Row 1: Translates Left on Desktop, Smooth Touch Swipe on Mobile */}
        <motion.div 
          className="frame" 
          style={isMobile ? {} : { x: x1 }}
        >
          {galleryRow1.map((item, idx) => {
            const isCenterpiece = idx === 2;

            return (
              <div
                key={item.id}
                className={`gallery-scroll-item ${isCenterpiece ? 'centerpiece-card' : ''}`}
                onClick={() => onOpenLightbox && onOpenLightbox(item.src)}
              >
                <img 
                  src={item.src} 
                  alt={item.title} 
                  loading="lazy" 
                  className="room-details-image" 
                />
                
                {isCenterpiece ? (
                  <div className="centerpiece-wordmark-overlay">
                    <span className="gallery-italic-wordmark">Gallery</span>
                    <span className="centerpiece-sub">Click to Expand</span>
                  </div>
                ) : (
                  <div className="room-hover-wrapper">
                    <span className="room-hover-wordmark">Gallery</span>
                    <span className="room-hover-tag">{item.tag}</span>
                    <div className="room-hover-circle-plus">
                      <i className="fa-solid fa-plus" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>

        {/* Row 2: Translates Right on Desktop, Smooth Touch Swipe on Mobile */}
        <motion.div 
          className="frame-reverse" 
          style={isMobile ? {} : { x: x2 }}
        >
          {galleryRow2.map((item) => (
            <div
              key={item.id}
              className="gallery-scroll-item"
              onClick={() => onOpenLightbox && onOpenLightbox(item.src)}
            >
              <img 
                src={item.src} 
                alt={item.title} 
                loading="lazy" 
                className="room-details-image" 
              />
              <div className="room-hover-wrapper">
                <span className="room-hover-wordmark">Gallery</span>
                <span className="room-hover-tag">{item.tag}</span>
                <div className="room-hover-circle-plus">
                  <i className="fa-solid fa-plus" />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
