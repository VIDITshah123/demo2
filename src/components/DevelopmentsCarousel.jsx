import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { developmentsData } from '../data/projectsData';

export default function DevelopmentsCarousel({ onSelectProject }) {
  const [activeIdx, setActiveIdx] = useState(1); // Default to Slide 2 center
  const [cardTilt, setCardTilt] = useState({ rotateX: 0, rotateY: 0 });

  const total = developmentsData.length;

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + total) % total);
    setCardTilt({ rotateX: 0, rotateY: 0 });
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % total);
    setCardTilt({ rotateX: 0, rotateY: 0 });
  };

  // Interactive 3D tilt for the active card
  const handleActiveMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCardTilt({ rotateX: y * -6, rotateY: x * 8 });
  };

  const handleActiveMouseLeave = () => {
    setCardTilt({ rotateX: 0, rotateY: 0 });
  };

  // Drag threshold handler for touch & swipe
  const handleDragEnd = (event, info) => {
    if (info.offset.x < -40) {
      handleNext();
    } else if (info.offset.x > 40) {
      handlePrev();
    }
  };

  const activeProject = developmentsData[activeIdx];
  const prevProject = developmentsData[(activeIdx - 1 + total) % total];
  const nextProject = developmentsData[(activeIdx + 1) % total];

  return (
    <section className="rooms-section section-spacing" id="developments">
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
          {/* Active Development Counter Bar */}
          <div className="carousel-top-info-bar">
            <div className="carousel-counter-pill">
              <span className="counter-current">0{activeIdx + 1}</span>
              <span className="counter-divider">/</span>
              <span className="counter-total">0{total}</span>
            </div>
            <div className="carousel-progress-track">
              <motion.div 
                className="carousel-progress-fill"
                animate={{ width: `${((activeIdx + 1) / total) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>

          <motion.div 
            className="rooms-3d-track"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          >
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

              const isCenter = diff === 0;

              return (
                <motion.div
                  key={project.id}
                  className={`room-card-slide ${positionClass}`}
                  onClick={() => {
                    if (!isCenter) setActiveIdx(idx);
                  }}
                  onMouseMove={isCenter ? handleActiveMouseMove : undefined}
                  onMouseLeave={isCenter ? handleActiveMouseLeave : undefined}
                  style={isCenter ? {
                    rotateX: cardTilt.rotateX,
                    rotateY: cardTilt.rotateY,
                    transformPerspective: 1000,
                    transition: 'transform 0.15s ease-out'
                  } : undefined}
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
                    
                    {/* Action Footer */}
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
                </motion.div>
              );
            })}
          </motion.div>

          {/* Interactive Navigation Controls with Title Previews */}
          <div className="carousel-nav-controls">
            <button 
              className="carousel-control-side-btn prev"
              onClick={handlePrev} 
              aria-label="Previous Property"
            >
              <div className="control-arrow-icon">
                <i className="fa-solid fa-arrow-left" />
              </div>
              <div className="control-meta-text">
                <span className="control-label">PREVIOUS</span>
                <span className="control-prop-name">{prevProject.title}</span>
              </div>
            </button>

            <button 
              className="carousel-control-side-btn next"
              onClick={handleNext} 
              aria-label="Next Property"
            >
              <div className="control-meta-text align-right">
                <span className="control-label">NEXT</span>
                <span className="control-prop-name">{nextProject.title}</span>
              </div>
              <div className="control-arrow-icon">
                <i className="fa-solid fa-arrow-right" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
