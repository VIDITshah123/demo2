import React, { useState } from 'react';
import { galleryRow1, galleryRow2 } from '../data/projectsData';

function GalleryRow({ items, reverse = false, onOpenLightbox }) {
  const [isRowPaused, setIsRowPaused] = useState(false);

  // Duplicate items once for seamless 50% translation marquee (16 items total per row)
  const duplicateItems = [...items, ...items];

  return (
    <div 
      className={`auto-gallery-row-wrapper ${isRowPaused ? 'is-paused' : ''}`}
      onMouseEnter={() => setIsRowPaused(true)}
      onMouseLeave={() => setIsRowPaused(false)}
      onTouchStart={() => setIsRowPaused(true)}
      onTouchEnd={() => setIsRowPaused(false)}
      onPointerDown={() => setIsRowPaused(true)}
      onPointerUp={() => setIsRowPaused(false)}
    >
      <div className={`auto-frame ${reverse ? 'glide-reverse' : 'glide-normal'}`}>
        {duplicateItems.map((item, idx) => {
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
                decoding="async"
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
      </div>
    </div>
  );
}

export default function PhotoGallery({ onOpenLightbox }) {
  return (
    <section className="gallery-auto-section section-spacing" id="gallery">
      <div className="gallery-auto-container">
        {/* Gallery Section Header */}
        <div className="gallery-header-bar">
          <div className="subtitle-block">
            <div className="subtitle-divider" />
            <div className="subtitle-title">VISUAL ARCHIVE</div>
            <div className="subtitle-divider rotate-reverse" />
          </div>
          <h2 className="gallery-header-heading">IMMERSIVE LIVING & ARCHITECTURE</h2>
          
          {/* Status Indicator */}
          <div className="gallery-live-indicator">
            <span className="live-pulse-dot" />
            <span>AUTO-GLIDE ACTIVE • HOLD OR TAP TO PAUSE</span>
          </div>
        </div>

        {/* Row 1: Continuous Smooth Glide Left (Calm ~55s Loop) */}
        <GalleryRow 
          items={galleryRow1} 
          reverse={false} 
          onOpenLightbox={onOpenLightbox}
        />

        {/* Row 2: Continuous Smooth Glide Right in Opposing Direction (Calm ~62s Loop) */}
        <GalleryRow 
          items={galleryRow2} 
          reverse={true} 
          onOpenLightbox={onOpenLightbox}
        />
      </div>
    </section>
  );
}
