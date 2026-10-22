import React, { useState } from 'react';

export default function Footer({ onSubscribe }) {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (onSubscribe) onSubscribe(email);
    setEmail('');
  };

  return (
    <footer className="footer-main">
      <div className="container">
        <div className="footer-grid-4col">
          {/* Col 1: Brand Wordmark & Newsletter */}
          <div className="footer-brand-col">
            <div className="stars-rating" style={{ marginBottom: '8px' }}>★★★★★</div>
            <div style={{ fontFamily: 'var(--fonts--heading)', fontSize: '28px', letterSpacing: '0.1em', color: '#fff' }}>
              BELLAVIERRE
            </div>
            <p>
              Licensed Dubai Real Estate Brokerage (RERA ORN #32840) offering unbiased project due diligence and end-to-end investment management for global buyers.
            </p>
            <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email address..."
                className="footer-newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="footer-newsletter-btn" aria-label="Subscribe">
                <i className="fa-solid fa-arrow-right" />
              </button>
            </form>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="footer-col-title">QUICK LINKS</h4>
            <ul className="footer-links-list">
              <li className="footer-link-item"><a href="#hero">Home</a></li>
              <li className="footer-link-item"><a href="#about">About Us</a></li>
              <li className="footer-link-item"><a href="#rooms">Developments</a></li>
              <li className="footer-link-item"><a href="#facilities">Advisory Services</a></li>
              <li className="footer-link-item"><a href="#packages">Investment Packages</a></li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="footer-col-title">OUR SERVICES</h4>
            <ul className="footer-links-list">
              <li className="footer-link-item"><a href="#facilities">Overseas Buyer Advisory</a></li>
              <li className="footer-link-item"><a href="#facilities">Off-Plan Due Diligence</a></li>
              <li className="footer-link-item"><a href="#facilities">Golden Visa Advisory</a></li>
              <li className="footer-link-item"><a href="#facilities">Property Handover & Leasing</a></li>
              <li className="footer-link-item"><a href="#packages">Portfolio ROI Strategy</a></li>
            </ul>
          </div>

          {/* Col 4: Contact Us */}
          <div>
            <h4 className="footer-col-title">CONTACT US</h4>
            <ul className="footer-contact-list">
              <li className="footer-contact-row">
                <div className="footer-icon-primary"><i className="fa-solid fa-location-dot" /></div>
                <div>The Binary by Omniyat, Business Bay, Dubai, UAE</div>
              </li>
              <li className="footer-contact-row">
                <div className="footer-icon-primary"><i className="fa-solid fa-phone" /></div>
                <div>+971 4 578 4312</div>
              </li>
              <li className="footer-contact-row">
                <div className="footer-icon-primary"><i className="fa-regular fa-envelope" /></div>
                <div>admin@bellavierre.com</div>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div>© 2026 Bellavierre Real Estate LLC. All Rights Reserved. Licensed under Dubai Land Department (RERA ORN #32840).</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" style={{ color: 'var(--paragraph-muted)' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'var(--paragraph-muted)' }}>Terms & Conditions</a>
            <a href="#" style={{ color: 'var(--paragraph-muted)' }}>RERA Verification</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
