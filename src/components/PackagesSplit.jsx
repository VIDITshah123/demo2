import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { packagesData } from '../data/projectsData';

export default function PackagesSplit() {
  const [activeIdx, setActiveIdx] = useState(1); // Default center panel active

  return (
    <section className="packages-section section-spacing" id="packages">
      <div className="container">
        <motion.div 
          className="title-bar"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-tag">OUR PACKAGES</div>
          <h2 className="section-heading">PACKAGES WE OFFER</h2>
        </motion.div>

        <div className="packages-split-grid">
          {packagesData.map((pkg, idx) => {
            const isActive = idx === activeIdx;

            return (
              <div
                key={pkg.id}
                className={`package-panel ${isActive ? 'active' : ''}`}
                onMouseEnter={() => setActiveIdx(idx)}
                onClick={() => setActiveIdx(idx)}
              >
                <div className="package-panel-bg">
                  <img src={pkg.image} alt={pkg.activeTitle} />
                </div>
                <div className="package-panel-overlay" />
                
                {/* Vertical Rotated Text for Inactive State */}
                <div className="package-vertical-title">
                  {pkg.verticalTitle}
                </div>

                {/* Active Framed Border Body */}
                <div className="package-border-body">
                  <div>
                    <h3 className="package-active-title">{pkg.activeTitle}</h3>
                    <p className="package-active-desc">{pkg.desc}</p>
                  </div>
                  <div className="package-price-banner">{pkg.price}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
