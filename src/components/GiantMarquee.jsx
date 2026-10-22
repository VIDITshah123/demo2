import React from 'react';

export default function GiantMarquee() {
  const words = [
    'DUBAI',
    'REAL ESTATE',
    'VILLAS',
    'PENTHOUSES',
    'WATERFRONT',
    'INVESTMENTS',
    'ARCHITECTURAL LUXURY',
    'PRIVATE RESIDENCES'
  ];

  return (
    <section className="giant-marquee-section">
      <div className="giant-marquee-track-wrapper">
        <div className="giant-marquee-text">
          {/* First loop of words */}
          {words.map((word, idx) => (
            <React.Fragment key={`set1-${idx}`}>
              <span className={`giant-marquee-word ${idx % 2 === 1 ? 'word-stroke' : ''}`}>
                {word}
              </span>
              <span className="giant-marquee-separator">✦</span>
            </React.Fragment>
          ))}
          {/* Duplicate loop for a seamless 100% infinite cycle */}
          {words.map((word, idx) => (
            <React.Fragment key={`set2-${idx}`}>
              <span className={`giant-marquee-word ${idx % 2 === 1 ? 'word-stroke' : ''}`}>
                {word}
              </span>
              <span className="giant-marquee-separator">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
