import React from 'react';

export default function GiantMarquee() {
  const words = ['DUBAI', 'REAL ESTATE', 'VILLAS', 'PENTHOUSES', 'WATERFRONT', 'INVESTMENTS'];

  return (
    <section className="giant-marquee-section">
      <div className="giant-marquee-text">
        {words.map((w, i) => (
          <React.Fragment key={`w1-${i}`}>
            <span className="giant-marquee-word">{w}</span>
            <span className="giant-marquee-separator">•</span>
          </React.Fragment>
        ))}
        {/* Seamless duplicate */}
        {words.map((w, i) => (
          <React.Fragment key={`w2-${i}`}>
            <span className="giant-marquee-word">{w}</span>
            <span className="giant-marquee-separator">•</span>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
