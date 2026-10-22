import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function CountUpNumber({ end, duration = 1800 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(end * easeOut));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return <span ref={ref}>{val}</span>;
}

export default function AtAGlance() {
  return (
    <section className="at-a-glance-section section-spacing-sm">
      <div className="container">
        <motion.div 
          className="title-bar"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-tag">RESORTO AT A GLANCE</div>
          <h2 className="section-heading">DELIVERING EXCELLENCE, ONE STAY AT A TIME</h2>
        </motion.div>

        <div className="stats-grid-4col">
          <motion.div 
            className="stat-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="stat-big-number"><CountUpNumber end={83} /></span>
            <span className="stat-text-label">TOTAL REVIEWS & SATISFACTION</span>
          </motion.div>

          <motion.div 
            className="stat-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="stat-big-number"><CountUpNumber end={42} /></span>
            <span className="stat-text-label">YEARS COMBINED EXPERIENCE</span>
          </motion.div>

          <motion.div 
            className="stat-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="stat-big-number"><CountUpNumber end={67} /></span>
            <span className="stat-text-label">CURATED DEVELOPMENTS</span>
          </motion.div>

          <motion.div 
            className="stat-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="stat-big-number"><CountUpNumber end={98} /></span>
            <span className="stat-text-label">SATISFACTION RATE (%)</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
