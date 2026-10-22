import React, { useEffect, useState } from 'react';

export default function CustomCursor({ isHovering }) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only enable on fine pointer devices (desktop mouse)
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setVisible(true);

    const onMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  if (!visible) return null;

  return (
    <div className={`cursor-mouse-wrapper ${isHovering ? 'is-hovering' : ''}`} style={{ display: 'block' }}>
      <div 
        className="cursor-mouse-pointer"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`
        }}
      >
        <div className="cursor-mouse" />
        <div className="cursor-circle" />
      </div>
    </div>
  );
}
