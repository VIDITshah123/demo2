import React from 'react';
import { motion } from 'framer-motion';
import { articlesData } from '../data/projectsData';

export default function Articles({ onSelectArticle }) {
  return (
    <section className="articles-section section-spacing" id="articles">
      <div className="container">
        <motion.div 
          className="title-bar"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-tag">ARTICLES</div>
          <h2 className="section-heading">ARTICLES TO READ</h2>
        </motion.div>

        <div className="articles-grid-3col">
          {articlesData.map((article, idx) => (
            <motion.div 
              key={article.id}
              className="article-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              onClick={() => onSelectArticle && onSelectArticle(article)}
            >
              <div className="article-thumb-wrapper">
                <img src={article.image} alt={article.title} className="article-thumb-img" />
              </div>
              
              <h3 className="article-title">{article.title}</h3>
              
              <div className="article-card-divider" />
              
              <span className="article-link-action">
                View Details <i className="fa-solid fa-arrow-right" />
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
