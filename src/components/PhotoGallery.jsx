import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  wrap
} from 'framer-motion';
import { galleryRow1, galleryRow2 } from '../data/projectsData';

// Reusable Auto-Marquee Row with Scroll-Velocity Coupling and Pause-on-Hold
function AutoScrollRow({ 
  items, 
  baseSpeed = 0.8, 
  reverse = false, 
  isGlobalPaused, 
  onOpenLightbox 
}) {
  const baseX = useMotionValue(0);
  const [isRowHovered, setIsRowHovered] = useState(false);

  // Link to page scroll velocity for dynamic speed boost on scroll
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  // Calculate velocity factor based on page scroll
  const velocityFactor = useTransform(smoothVelocity, [-1500, 0, 1500], [-3, 0, 3], {
    clamp: false
  });

  // Duplicate items 4 times to guarantee a 100% seamless, unbroken infinite loop
  const quadItems = [...items, ...items, ...items, ...items];

  // Wrap between -25% and 0% (since array is 4x, 25% corresponds to one full cycle)
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  const direction = reverse ? 1 : -1;

  useAnimationFrame((time, delta) => {
    // If user is hovering, tapping or holding on this row, pause smoothly
    if (isGlobalPaused || isRowHovered) return;

    // Base constant auto-glide movement
    let moveBy = direction * baseSpeed * (delta / 1000) * 8;

    // Add scroll velocity factor so scrolling up/down speeds up or reverses the flow dynamically
    const vel = velocityFactor.get();
    if (vel !== 0) {
      moveBy += vel * (delta / 1000) * 6;
    }

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div 
      className="auto-gallery-row-wrapper"
      onMouseEnter={() => setIsRowHovered(true)}
      onMouseLeave={() => setIsRowHovered(false)}
      onTouchStart={() => setIsRowHovered(true)}
      onTouchEnd={() => setIsRowHovered(false)}
      onPointerDown={() => setIsRowHovered(true)}
      onPointerUp={() => setIsRowHovered(false)}
    >
      <motion.div 
        className={reverse ? "frame-reverse auto-frame" : "frame auto-frame"}
        style={{ x }}
      >
        {quadItems.map((item, idx) => {
          // Every 3rd item in original items has the special centerpiece overlay
          const isCenterpiece = (idx % items.length) === 2;

          return (
            <div
              key={`${item.id}-${idx}`}
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
    </div>
  );
}

export default function PhotoGallery({ onOpenLightbox }) {
  const [isSectionPaused, setIsSectionPaused] = useState(false);

  return (
    <section 
      className="gallery-auto-section section-spacing" 
      id="gallery"
      onMouseEnter={() => setIsSectionPaused(true)}
      onMouseLeave={() => setIsSectionPaused(false)}
      onTouchStart={() => setIsSectionPaused(true)}
      onTouchEnd={() => setIsSectionPaused(false)}
    >
      <div className="gallery-auto-container">
        {/* Gallery Section Header */}
        <div className="gallery-header-bar">
          <div className="subtitle-block">
            <div className="subtitle-divider" />
            <div className="subtitle-title">VISUAL ARCHIVE</div>
            <div className="subtitle-divider rotate-reverse" />
          </div>
          <h2 className="gallery-header-heading">IMMERSIVE LIVING & ARCHITECTURE</h2>
          
          {/* Subtle Interactive Status Pill */}
          <div className="gallery-live-indicator">
            <span className="live-pulse-dot" />
            <span>AUTO-GLIDE ACTIVE • HOLD OR TAP TO PAUSE</span>
          </div>
        </div>

        {/* Row 1: Continuous Auto-Scroll Left + Scroll Acceleration */}
        <AutoScrollRow 
          items={galleryRow1} 
          baseSpeed={0.9} 
          reverse={false} 
          isGlobalPaused={isSectionPaused}
          onOpenLightbox={onOpenLightbox}
        />

        {/* Row 2: Continuous Auto-Scroll Right in Opposing Direction */}
        <AutoScrollRow 
          items={galleryRow2} 
          baseSpeed={0.9} 
          reverse={true} 
          isGlobalPaused={isSectionPaused}
          onOpenLightbox={onOpenLightbox}
        />
      </div>
    </section>
  );
}
