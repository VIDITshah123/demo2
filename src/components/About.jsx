import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section className="about-section section-spacing" id="about">
      <div className="container">
        <div className="about-grid-3col">
          {/* Left Vertical Architectural Image */}
          <motion.div 
            className="about-image-wrapper"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src="https://bellavierre.com/wp-content/uploads/2026/08/h4-img1.jpg" alt="Dubai Luxury Tower" className="about-img" />
          </motion.div>

          {/* Center Content Column */}
          <motion.div 
            className="about-content-col"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
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
                className="about-sparkle-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                <i className="fa-solid fa-sparkles" />
                <span>Overseas Buyer Advisory: Virtual 3D walkthroughs, video feeds, and remote reservation workflows.</span>
              </motion.li>

              <motion.li 
                className="about-sparkle-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                <i className="fa-solid fa-sparkles" />
                <span>Project Selection & Due Diligence: Verification of developers, escrow account compliance, and track records.</span>
              </motion.li>

              <motion.li 
                className="about-sparkle-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.45 }}
              >
                <i className="fa-solid fa-sparkles" />
                <span>Investment Strategy: Tailored plans to maximize 8–10% net rental returns or UAE Golden Visa residency.</span>
              </motion.li>

              <motion.li 
                className="about-sparkle-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.55 }}
              >
                <i className="fa-solid fa-sparkles" />
                <span>End-to-End Handover: Comprehensive snagging, title deed issuance, and immediate tenant onboarding.</span>
              </motion.li>
            </ul>

            <a href="#rooms" className="primary-button">
              <span>VIEW PROPERTIES</span>
            </a>
          </motion.div>

          {/* Right Vertical Image (Offset Downwards) */}
          <motion.div 
            className="about-image-wrapper offset-down"
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 40 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src="https://bellavierre.com/wp-content/uploads/2025/03/h1_img-4.jpg" alt="Dubai Waterfront Pool" className="about-img" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
