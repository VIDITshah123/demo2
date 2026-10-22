import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { developmentsData } from '../data/projectsData';

export default function DevelopmentsCarousel({ onSelectProject }) {
  const [activeIdx, setActiveIdx] = useState(1); // Default to Slide 2 center

  const total = developmentsData.length;

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % total);
  };

  return (
    <section className="rooms-section section-spacing" id="rooms">
      <div className="container">
        <motion.div 
          className="title-bar"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-tag">CURATED PORTFOLIO</div>
          <h2 className="section-heading">EXPLORE LUXURY DEVELOPMENTS</h2>
        </motion.div>

        <div className="rooms-carousel-wrapper">
          <div className="rooms-3d-track">
            {developmentsData.map((project, idx) => {
              const diff = (idx - activeIdx + total) % total;
              let positionClass = 'slide-hidden';

              if (diff === 0) {
                positionClass = 'slide-center';
              } else if (diff === total - 1 || diff === -1) {
                positionClass = 'slide-left';
              } else if (diff === 1) {
                positionClass = 'slide-right';
              }

              return (
                <div
                  key={project.id}
                  className={`room-card-slide ${positionClass}`}
                  onClick={() => {
                    if (diff !== 0) setActiveIdx(idx);
                  }}
                >
                  <img src={project.image} alt={project.title} className="room-card-img" />
                  
                  <div className="room-card-overlay">
                    {/* Location & Developer Tag */}
                    <div className="room-card-location-tag">
                      <i className="fa-solid fa-location-dot" />
                      <span>{project.location} • {project.developer}</span>
                    </div>

                    {/* Project Title */}
                    <h3 className="room-card-title">{project.title}</h3>

                    {/* Starting Price & Old Price Row */}
                    <div className="room-card-price-row">
                      <span className="room-price-val">{project.startingPrice}</span>
                      {project.oldPrice && <span className="room-price-old">{project.oldPrice}</span>}
                      <span className="room-price-badge">Starting Price</span>
                    </div>

                    {/* Dedicated Specs Row with Frosted Badges */}
                    <div className="room-specs-row">
                      <div className="room-spec-pill">
                        <i className="fa-solid fa-bed" />
                        <span>{project.beds}</span>
                      </div>
                      <div className="room-spec-pill">
                        <i className="fa-solid fa-bath" />
                        <span>{project.baths}</span>
                      </div>
                      <div className="room-spec-pill">
                        <i className="fa-solid fa-water" />
                        <span>{project.highlight}</span>
                      </div>
                    </div>
                    
                    <div className="room-card-divider" />
                    
                    {/* Action Footer (Full Width on Mobile) */}
                    <div className="room-card-footer">
                      <button 
                        className="room-details-cta-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onSelectProject) onSelectProject(project);
                        }}
                      >
                        <span>VIEW DETAILS & PRICING</span>
                        <i className="fa-solid fa-arrow-right" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <div className="carousel-nav-buttons">
            <button className="carousel-arrow-btn" onClick={handlePrev} aria-label="Previous Property">
              <i className="fa-solid fa-arrow-left" />
            </button>
            <button className="carousel-arrow-btn" onClick={handleNext} aria-label="Next Property">
              <i className="fa-solid fa-arrow-right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
