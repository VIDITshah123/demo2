import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { facilitiesData } from '../data/projectsData';

export default function FacilitiesAccordion() {
  const [activeIdx, setActiveIdx] = useState(0);

  const activeItem = facilitiesData[activeIdx] || facilitiesData[0];

  return (
    <section className="facilities-section" id="facilities">
      {/* Dynamic Background Cross-Fade Layers */}
      <div className="facility-bg-layers">
        {facilitiesData.map((item, idx) => (
          <div
            key={item.id}
            className={`facility-bg ${idx === activeIdx ? 'active' : ''}`}
          >
            <img src={item.bgImage} alt={item.columnTitle} />
            <div className="facility-bg-overlay" />
          </div>
        ))}
      </div>

      {/* Giant Dynamic Watermark Title across Top */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeItem.watermarkTitle}
          className="facility-watermark-title"
          initial={{ opacity: 0, y: -20, letterSpacing: '0.14em' }}
          animate={{ opacity: 1, y: 0, letterSpacing: '0.1em' }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {activeItem.watermarkTitle}
        </motion.div>
      </AnimatePresence>

      {/* 4 Split Columns at Bottom */}
      <div className="facilities-columns-grid">
        {facilitiesData.map((item, idx) => {
          const isActive = idx === activeIdx;

          return (
            <div
              key={item.id}
              className={`facility-column ${isActive ? 'active' : ''}`}
              onMouseEnter={() => setActiveIdx(idx)}
              onClick={() => setActiveIdx(idx)}
            >
              <h3 className="facility-col-title">{item.columnTitle}</h3>
              
              <div className="facility-col-line">
                <div className="facility-col-dot" />
              </div>

              <p className="facility-col-desc">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
