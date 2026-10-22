import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';

import CustomCursor from './components/CustomCursor';
import TopHeader from './components/TopHeader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import AtAGlance from './components/AtAGlance';
import DevelopmentsCarousel from './components/DevelopmentsCarousel';
import FacilitiesAccordion from './components/FacilitiesAccordion';
import PackagesSplit from './components/PackagesSplit';
import PhotoGallery from './components/PhotoGallery';
import Reviews from './components/Reviews';
import PartnersMarquee from './components/PartnersMarquee';
import Articles from './components/Articles';
import GiantMarquee from './components/GiantMarquee';
import Footer from './components/Footer';

import SearchModal from './components/SearchModal';
import ShortlistDrawer from './components/ShortlistDrawer';
import LightboxModal from './components/LightboxModal';
import Toast from './components/Toast';

import { developmentsData } from './data/projectsData';

export default function App() {
  // Global States
  const [isHovering, setIsHovering] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShortlistOpen, setIsShortlistOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [toast, setToast] = useState({ visible: false, message: '' });

  // Initial saved properties
  const [savedItems, setSavedItems] = useState([
    developmentsData[0],
    developmentsData[1],
    developmentsData[2]
  ]);

  // Show toast utility
  const showToast = (message) => {
    setToast({ visible: true, message });
    setTimeout(() => {
      setToast({ visible: false, message: '' });
    }, 4000);
  };

  // Initialize Lenis Smooth Momentum Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
      smoothTouch: false
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Global hover listener for custom cursor
  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('.room-card-slide') ||
        target.closest('.package-panel') ||
        target.closest('.facility-column') ||
        target.closest('.gallery-tile') ||
        target.closest('.gallery-scroll-item') ||
        target.closest('.testimonial-card')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  // Keyboard navigation for search and modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsShortlistOpen(false);
        setLightboxSrc(null);
      } else if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers
  const handleRemoveSaved = (id) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Removed development from your saved shortlist.');
  };

  const handleEnquireSubmit = ({ location, budget, type }) => {
    showToast(`Enquiry registered for ${location} (${budget} • ${type}). A property director will reach out shortly.`);
  };

  const handleBrochureRequest = () => {
    setIsShortlistOpen(false);
    showToast('Official floor plans, payment schedules & ROI models have been dispatched to your email.');
  };

  const handleNewsletterSubscribe = (email) => {
    showToast(`Subscribed ${email} to weekly Dubai off-plan market intelligence.`);
  };

  const handleSelectProject = (project) => {
    showToast(`Selected ${project.title}. Preparing VIP virtual 3D tour & escrow documentation...`);
  };

  return (
    <div className="site-wrapper" id="top">
      {/* Custom Mouse Cursor */}
      <CustomCursor isHovering={isHovering} />

      {/* Top Utility Header */}
      <TopHeader />

      {/* Main Navbar */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenShortlist={() => setIsShortlistOpen(true)}
        shortlistCount={savedItems.length}
        onEnquire={() => {
          showToast('Connecting you with Bellavierre private client advisory...');
          window.location.hash = '#hero';
        }}
      />

      {/* Hero Section with Parallax & Docked Enquire */}
      <Hero onEnquireSubmit={handleEnquireSubmit} />

      {/* Asymmetric 3-Column About Section */}
      <About />

      {/* At A Glance Big Transparent Stats */}
      <AtAGlance />

      {/* Curated Developments 3D Perspective Carousel */}
      <DevelopmentsCarousel onSelectProject={handleSelectProject} />

      {/* Interactive Facilities / Advisory Accordion with Watermark */}
      <FacilitiesAccordion />

      {/* 3-Panel Split Investment Packages */}
      <PackagesSplit />

      {/* Photo Mosaic 4x2 Gallery */}
      <PhotoGallery onOpenLightbox={(src) => setLightboxSrc(src)} />

      {/* Customer Reviews 3-Column Masonry */}
      <Reviews />

      {/* Preferred Developer Partners Marquee */}
      <PartnersMarquee />

      {/* Articles & Market Insights */}
      <Articles onSelectArticle={(a) => showToast(`Opening article: ${a.title}`)} />

      {/* Giant Kinetic Footer Marquee */}
      <GiantMarquee />

      {/* 4-Column Luxury Footer */}
      <Footer onSubscribe={handleNewsletterSubscribe} />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProject={handleSelectProject}
      />

      {/* Shortlist Drawer */}
      <ShortlistDrawer
        isOpen={isShortlistOpen}
        onClose={() => setIsShortlistOpen(false)}
        savedItems={savedItems}
        onRemove={handleRemoveSaved}
        onRequestBrochures={handleBrochureRequest}
      />

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={!!lightboxSrc}
        src={lightboxSrc}
        onClose={() => setLightboxSrc(null)}
      />

      {/* Toast Notification */}
      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
}
