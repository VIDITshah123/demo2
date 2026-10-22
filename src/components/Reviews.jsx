import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { reviewsData } from '../data/projectsData';

export default function Reviews() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Vertical scroll tracking across 280vh sticky track (desktop)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Vertical cyan line fill scaling from 0% to 100%
  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // 3 opposing vertical parallax column motions (desktop)
  const yCol1 = useTransform(scrollYProgress, [0, 1], ['12%', '-32%']);
  const yCol2 = useTransform(scrollYProgress, [0, 1], ['-26%', '14%']);
  const yCol3 = useTransform(scrollYProgress, [0, 1], ['8%', '-36%']);

  // Split reviews across columns
  const col1Reviews = reviewsData.slice(0, 2);
  const col2Reviews = reviewsData.slice(2, 4);
  const col3Reviews = reviewsData.slice(4, 6);

  return (
    <section 
      ref={containerRef} 
      className="testimonials-sticky-wrapper" 
      id="reviews"
    >
      <div className="testimonials-sticky-viewport">
        {/* Vertical Cyan Progress Line on Far Left (Desktop only) */}
        {!isMobile && (
          <div className="progress-line-testimonial">
            <motion.div 
              className="progress-line-fill" 
              style={{ height: progressHeight }} 
            />
          </div>
        )}

        <div className="testimonials-parallax-container">
          {/* Section Header */}
          <div className="testimonials-sticky-header">
            <div className="subtitle-block">
              <div className="subtitle-divider" />
              <div className="subtitle-title">TESTIMONIALS</div>
              <div className="subtitle-divider rotate-reverse" />
            </div>
            <h2 className="section-heading">REVIEW FROM OUR CUSTOMERS</h2>
          </div>

          {/* Columns Track */}
          <div className="testimonials-columns-track">
            {/* Column 1 */}
            <motion.div 
              className="testimonials-vertical-column" 
              style={isMobile ? {} : { y: yCol1 }}
            >
              {col1Reviews.map((review) => (
                <div key={review.id} className="testimonial-card">
                  <div className="review-card-top">
                    <span className="review-quote-icon">❝</span>
                    <div className="review-stars">★★★★★</div>
                  </div>
                  <p className="review-quote-text">"{review.quote}"</p>
                  <div className="review-client-row">
                    <img 
                      src={review.avatar} 
                      alt={review.author} 
                      className="review-client-avatar" 
                      loading="lazy" 
                    />
                    <div className="review-client-info">
                      <h4>{review.author}</h4>
                      <p>{review.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Column 2 */}
            <motion.div 
              className="testimonials-vertical-column" 
              style={isMobile ? {} : { y: yCol2 }}
            >
              {col2Reviews.map((review) => (
                <div key={review.id} className="testimonial-card">
                  <div className="review-card-top">
                    <span className="review-quote-icon">❝</span>
                    <div className="review-stars">★★★★★</div>
                  </div>
                  <p className="review-quote-text">"{review.quote}"</p>
                  <div className="review-client-row">
                    <img 
                      src={review.avatar} 
                      alt={review.author} 
                      className="review-client-avatar" 
                      loading="lazy" 
                    />
                    <div className="review-client-info">
                      <h4>{review.author}</h4>
                      <p>{review.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Column 3 */}
            <motion.div 
              className="testimonials-vertical-column" 
              style={isMobile ? {} : { y: yCol3 }}
            >
              {col3Reviews.map((review) => (
                <div key={review.id} className="testimonial-card">
                  <div className="review-card-top">
                    <span className="review-quote-icon">❝</span>
                    <div className="review-stars">★★★★★</div>
                  </div>
                  <p className="review-quote-text">"{review.quote}"</p>
                  <div className="review-client-row">
                    <img 
                      src={review.avatar} 
                      alt={review.author} 
                      className="review-client-avatar" 
                      loading="lazy" 
                    />
                    <div className="review-client-info">
                      <h4>{review.author}</h4>
                      <p>{review.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
