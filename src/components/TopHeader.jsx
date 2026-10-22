import React from 'react';

export default function TopHeader() {
  return (
    <header className="top-header">
      <div className="container">
        <div className="top-social-links">
          <a href="https://www.facebook.com/bellavierre" target="_blank" rel="noopener noreferrer" className="top-social-icon" aria-label="Facebook">
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a href="https://www.linkedin.com/company/bellavierre" target="_blank" rel="noopener noreferrer" className="top-social-icon" aria-label="LinkedIn">
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
          <a href="https://www.instagram.com/bellavierre_realestate" target="_blank" rel="noopener noreferrer" className="top-social-icon" aria-label="Instagram">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="top-social-icon" aria-label="YouTube">
            <i className="fa-brands fa-youtube"></i>
          </a>
        </div>
        <div className="top-contact-info">
          <div className="top-contact-item">
            <i className="fa-regular fa-envelope"></i>
            <span>admin@bellavierre.com</span>
          </div>
          <div className="top-contact-item">
            <i className="fa-solid fa-location-dot"></i>
            <span>The Binary by Omniyat, Business Bay, Dubai, UAE</span>
          </div>
        </div>
      </div>
    </header>
  );
}
