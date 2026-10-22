import React from 'react';
import { partnersData } from '../data/projectsData';

export default function PartnersMarquee() {
  return (
    <section className="partners-marquee-section">
      <div className="marquee-header-tag">── CLIENTS & DEVELOPERS WE WORK WITH ──</div>
      <div className="marquee-track-container">
        <div className="marquee-content">
          {partnersData.map((partner, idx) => (
            <span key={idx} className="partner-logo-item">{partner}</span>
          ))}
          {/* Duplicate for infinite seamless scroll */}
          {partnersData.map((partner, idx) => (
            <span key={`dup-${idx}`} className="partner-logo-item">{partner}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
