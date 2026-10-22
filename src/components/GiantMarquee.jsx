import React, { useState } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  wrap
} from 'framer-motion';

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

  // Quadruple words to guarantee seamless wrap on all screen resolutions (up to 4K / ultrawide)
  const quadWords = [...words, ...words, ...words, ...words];

  const baseX = useMotionValue(0);
  const [isPaused, setIsPaused] = useState(false);

  // Velocity coupling: Link vertical scroll velocity to marquee horizontal speed
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 45,
    stiffness: 350
  });

  // Calculate dynamic velocity factor from page scrolling
  const velocityFactor = useTransform(smoothVelocity, [-1200, 0, 1200], [-4, 0, 4], {
    clamp: false
  });

  // Wrap between -25% and 0% for a mathematically seamless loop across 4 sets
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  // Natural, confident base glide speed (approx. 9-10s per cycle instead of old 35s crawl)
  const baseSpeed = 2.8;

  useAnimationFrame((time, delta) => {
    // If user touches, holds, or hovers, pause smoothly so they can inspect
    if (isPaused) return;

    // Base constant forward momentum
    let moveBy = -1 * baseSpeed * (delta / 1000) * 8.5;

    // Add scroll velocity factor so page scrolling accelerates or shifts the marquee dynamically
    const vel = velocityFactor.get();
    if (vel !== 0) {
      moveBy += vel * (delta / 1000) * 7.5;
    }

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <section 
      className="giant-marquee-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      onPointerDown={() => setIsPaused(true)}
      onPointerUp={() => setIsPaused(false)}
    >
      <div className="giant-marquee-track-wrapper">
        <motion.div 
          className="giant-marquee-text"
          style={{ x }}
        >
          {quadWords.map((word, idx) => {
            // Elegant alternation: odd words have subtle luxury stroke/outline for depth
            const isOutline = idx % 2 === 1;

            return (
              <React.Fragment key={`${word}-${idx}`}>
                <span className={`giant-marquee-word ${isOutline ? 'word-stroke' : ''}`}>
                  {word}
                </span>
                <span className="giant-marquee-separator">✦</span>
              </React.Fragment>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
