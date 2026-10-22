import React from 'react';
import { motion } from 'framer-motion';
import { reviewsData } from '../data/projectsData';

export default function Reviews() {
  return (
    <section className="reviews-section section-spacing" id="reviews">
      <div className="container">
        <motion.div 
          className="title-bar"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-heading">REVIEW FROM OUR CUSTOMERS</h2>
        </motion.div>

        <div className="reviews-masonry-grid">
          {reviewsData.map((review, idx) => (
            <motion.div 
              key={review.id}
              className="review-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
            >
              <div className="review-card-top">
                <span className="review-quote-icon">❝</span>
                <div className="review-stars">★★★★★</div>
              </div>
              
              <p className="review-quote-text">"{review.quote}"</p>

              <div className="review-client-row">
                <img src={review.avatar} alt={review.author} className="review-client-avatar" />
                <div className="review-client-info">
                  <h4>{review.author}</h4>
                  <p>{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
