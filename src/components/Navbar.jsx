import React from 'react';

export default function Navbar({ onOpenSearch, onOpenShortlist, shortlistCount, onEnquire }) {
  return (
    <nav className="navbar-main" id="navbar">
      <div className="container">
        {/* Left: Direct Text Navigation Links */}
        <div className="navbar-left">
          <div className="nav-links-menu">
            <a href="#hero" className="nav-link">Home</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#rooms" className="nav-link">Properties</a>
            <a href="#facilities" className="nav-link">Advisory</a>
            <a href="#packages" className="nav-link">Portfolios</a>
            <a href="#reviews" className="nav-link">Reviews</a>
          </div>
        </div>

        {/* Center: 5 Stars + Brand Logo & Wordmark */}
        <div className="navbar-center">
          <div className="stars-rating">★★★★★</div>
          <a href="#hero" className="brand-wordmark-link">
            <img src="/logo.png" alt="Bellavierre Real Estate" className="brand-logo-nav" />
            <span className="brand-title">BELLAVIERRE</span>
          </a>
        </div>

        {/* Right: Search, Divider, Shortlist, Phone, Enquire */}
        <div className="navbar-right">
          <button className="nav-icon-btn" onClick={onOpenSearch} aria-label="Search Properties">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          
          <div className="nav-divider"></div>
          
          <button className="nav-icon-btn" onClick={onOpenShortlist} aria-label="View Saved Properties">
            <i className="fa-regular fa-bookmark"></i>
            <span className="shortlist-badge">{shortlistCount}</span>
          </button>

          <a href="tel:+97145784312" className="nav-phone">
            <i className="fa-solid fa-phone"></i>
            <span>+971 4 578 4312</span>
          </a>

          <button className="nav-enquire-btn" onClick={onEnquire}>
            Enquire
          </button>
        </div>
      </div>
    </nav>
  );
}
