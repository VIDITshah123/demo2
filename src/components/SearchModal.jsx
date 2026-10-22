import React, { useState, useEffect, useRef } from 'react';
import { developmentsData } from '../data/projectsData';

export default function SearchModal({ isOpen, onClose, onSelectProject }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current && inputRef.current.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = developmentsData.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.location.toLowerCase().includes(query.toLowerCase()) ||
      p.type.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-modal active" onClick={onClose}>
      <div className="search-modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="search-modal-close" onClick={onClose} aria-label="Close search">
          <i className="fa-solid fa-xmark" />
        </button>

        <div className="search-input-wrapper">
          <i className="fa-solid fa-magnifying-glass" style={{ color: 'var(--gold)' }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Sobha, Danube, Palm Jumeirah, villas..."
          />
        </div>

        <div className="search-results-list">
          {filtered.length === 0 ? (
            <div style={{ padding: '24px', color: '#888', textAlign: 'center' }}>
              No developments matching "{query}". Try Sobha, Danube or Palm.
            </div>
          ) : (
            filtered.map((p) => (
              <div
                key={p.id}
                className="search-result-item"
                onClick={() => {
                  onClose();
                  if (onSelectProject) onSelectProject(p);
                }}
              >
                <img src={p.image} alt={p.title} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '15px', color: '#fff', textTransform: 'uppercase' }}>{p.title}</h4>
                  <p style={{ fontSize: '13px', color: '#aaa' }}>{p.location} • {p.type}</p>
                </div>
                <span style={{ fontSize: '14px', color: 'var(--gold)', fontWeight: 600 }}>{p.startingPrice}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
