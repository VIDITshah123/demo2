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
          <div className="section-tag">ROOMS & SUITES</div>
          <h2 className="section-heading">CHECK OUR LUXARY ROOMS</h2>
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
                    <div className="room-title-price">
                      <h3 className="room-card-title">{project.title}</h3>
                      <div className="room-card-price">
                        {project.startingPrice}
                        {project.oldPrice && <s>{project.oldPrice}</s>}
                        {' '}/ Starting
                      </div>
                    </div>
                    
                    <div className="room-card-divider" />
                    
                    <div className="room-card-footer">
                      <button 
                        className="primary-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onSelectProject) onSelectProject(project);
                        }}
                      >
                        VIEW DETAILS
                      </button>

                      <div className="room-specs-row">
                        <div className="room-spec-item"><i className="fa-solid fa-bed" /> {project.beds}</div>
                        <div className="room-spec-item"><i className="fa-solid fa-bath" /> {project.baths}</div>
                        <div className="room-spec-item"><i className="fa-solid fa-water" /> {project.highlight}</div>
                      </div>
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
