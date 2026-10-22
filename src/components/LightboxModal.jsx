import React from 'react';

export default function LightboxModal({ isOpen, src, onClose }) {
  if (!isOpen || !src) return null;

  return (
    <div className="lightbox-modal active" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="Close image viewer">
        <i className="fa-solid fa-xmark" />
      </button>
      <img
        src={src}
        alt="Full resolution architectural view"
        className="lightbox-img"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
