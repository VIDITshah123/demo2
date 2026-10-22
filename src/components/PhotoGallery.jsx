import React from 'react';
import { motion } from 'framer-motion';
import { galleryData } from '../data/projectsData';

export default function PhotoGallery({ onOpenLightbox }) {
  return (
    <section className="gallery-section section-spacing" id="gallery">
      <div className="container">
        <motion.div 
          className="gallery-mosaic-grid"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {galleryData.map((item) => {
            if (item.isSpecialTitle) {
              return (
                <div key={item.id} className="gallery-tile special-gallery-title">
                  <img src={item.src} alt={item.alt} />
                  <div className="gallery-wordmark-overlay">
                    <div className="gallery-wordmark-text">Gallery</div>
                  </div>
                </div>
              );
            }

            return (
              <div 
                key={item.id} 
                className="gallery-tile"
                onClick={() => onOpenLightbox && onOpenLightbox(item.src)}
              >
                <img src={item.src} alt={item.alt} />
                <div className="gallery-tile-overlay">
                  <div className="gallery-zoom-icon">
                    <i className="fa-solid fa-plus" />
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
