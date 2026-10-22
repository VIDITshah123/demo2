import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function About() {
  const sectionRef = useRef(null);

  // Multi-layer scroll parallax tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // Opposing vertical parallax offsets for left and right architectural photography
  const leftImageY = useTransform(scrollYProgress, [0, 1], [-40, 70]);
  const rightImageY = useTransform(scrollYProgress, [0, 1], [60, -70]);
  const centerTextY = useTransform(scrollYProgress, [0, 1], [15, -20]);
  const floatingBadgeY = useTransform(scrollYProgress, [0, 1], [-25, 45]);

  return (
    <section ref={sectionRef} className="about-section section-spacing" id="about">
      <div className="container">
        <div className="about-grid-3col">
          {/* Left Vertical Architectural Image with Scroll Parallax */}
          <motion.div 
            className="about-image-wrapper"
            style={{ y: leftImageY }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <img 
              src="https://bellavierre.com/wp-content/uploads/2026/08/h4-img1.jpg" 
              alt="Dubai Luxury Tower" 
              className="about-img" 
              loading="lazy" 
            />
            {/* Subtle luxury glass caption on image */}
            <div className="image-luxury-glass-label">
              <span>PRIME SKYLINE COLLECTION</span>
            </div>
          </motion.div>

          {/* Center Content Column with subtle parallax & luxury accents */}
          <motion.div 
            className="about-content-col"
            style={{ y: centerTextY }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="about-tag-row">
              <span className="about-tag-line" />
              <span className="about-tag-text">ABOUT US</span>
            </div>
            
            <h2 className="about-heading">
              WELCOME TO BELLAVIERRE YOUR HOME BY THE SEA AND CITY
            </h2>
            
            <p className="about-lead-p">
              Compare selected Dubai developments with clear guidance on locations, payment plans, handover timelines and long-term suitability. Investing from overseas requires complete visibility—we act as your dedicated boots on the ground.
            </p>
            
            <ul className="about-sparkle-list">
              <motion.li 
                className="about-sparkle-item interactive-glow-card"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
                whileHover={{ x: 6 }}
              >
                <div className="sparkle-icon-bubble">
                  <i className="fa-solid fa-sparkles" />
                </div>
                <div>
                  <strong>Overseas Buyer Advisory:</strong> Virtual 3D walkthroughs, video feeds, and remote reservation workflows.
                </div>
              </motion.li>

              <motion.li 
                className="about-sparkle-item interactive-glow-card"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.35 }}
                whileHover={{ x: 6 }}
              >
                <div className="sparkle-icon-bubble">
                  <i className="fa-solid fa-sparkles" />
                </div>
                <div>
                  <strong>Project Selection & Due Diligence:</strong> Verification of developers, escrow account compliance, and track records.
                </div>
              </motion.li>

              <motion.li 
                className="about-sparkle-item interactive-glow-card"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.45 }}
                whileHover={{ x: 6 }}
              >
                <div className="sparkle-icon-bubble">
                  <i className="fa-solid fa-sparkles" />
                </div>
                <div>
                  <strong>Investment Strategy:</strong> Tailored plans to maximize 8–10% net rental returns or UAE Golden Visa residency.
                </div>
              </motion.li>

              <motion.li 
                className="about-sparkle-item interactive-glow-card"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.55 }}
                whileHover={{ x: 6 }}
              >
                <div className="sparkle-icon-bubble">
                  <i className="fa-solid fa-sparkles" />
                </div>
                <div>
                  <strong>End-to-End Handover:</strong> Comprehensive snagging, title deed issuance, and immediate tenant onboarding.
                </div>
              </motion.li>
            </ul>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <a href="#developments" className="primary-button">
                <span>VIEW PROPERTIES</span>
                <i className="fa-solid fa-arrow-right" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Vertical Image (Offset Downwards with Opposing Parallax) */}
          <motion.div 
            className="about-image-wrapper offset-down"
            style={{ y: rightImageY }}
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <img 
              src="https://bellavierre.com/wp-content/uploads/2025/03/h1_img-4.jpg" 
              alt="Dubai Waterfront Pool" 
              className="about-img" 
              loading="lazy" 
            />
            {/* Floating Luxury Accreditation Badge */}
            <motion.div 
              className="about-floating-card"
              style={{ y: floatingBadgeY }}
            >
              <span className="floating-card-gold-star">✦</span>
              <div>
                <h4>100% ESCROW BACKED</h4>
                <p>Dubai Land Department Registered</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
