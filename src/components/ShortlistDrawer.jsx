import React from 'react';

export default function ShortlistDrawer({ isOpen, onClose, savedItems, onRemove, onRequestBrochures }) {
  // Calculate total estimated sum
  const totalValue = savedItems.reduce((acc, curr) => {
    const num = parseInt(curr.startingPrice.replace(/[^0-9]/g, ''), 10) || 0;
    return acc + num;
  }, 0);

  const formattedTotal = totalValue.toLocaleString();

  return (
    <div className={`shortlist-drawer ${isOpen ? 'active' : ''}`}>
      <div className="shortlist-header">
        <h3 style={{ fontFamily: 'var(--fonts--heading)', fontSize: '22px', color: '#fff' }}>
          SAVED DEVELOPMENTS ({savedItems.length})
        </h3>
        <button onClick={onClose} style={{ color: '#fff', fontSize: '20px', cursor: 'pointer', background: 'none' }}>
          <i className="fa-solid fa-xmark" />
        </button>
      </div>

      <div className="shortlist-items-list">
        {savedItems.length === 0 ? (
          <div style={{ padding: '30px 10px', textAlign: 'center', color: '#888' }}>
            No saved developments yet. Explore our portfolio to bookmark properties.
          </div>
        ) : (
          savedItems.map((item) => (
            <div key={item.id} className="shortlist-item-card">
              <img src={item.image} alt={item.title} />
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '14px', color: '#fff', textTransform: 'uppercase' }}>{item.title}</h4>
                <p style={{ fontSize: '12px', color: '#888' }}>{item.location}</p>
                <div style={{ fontSize: '13px', color: 'var(--gold)', fontWeight: 600, marginTop: '4px' }}>
                  {item.startingPrice}
                </div>
              </div>
              <button
                style={{ color: '#666', cursor: 'pointer', background: 'none', alignSelf: 'flex-start' }}
                onClick={() => onRemove(item.id)}
                aria-label="Remove item"
              >
                <i className="fa-solid fa-trash-can" />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="shortlist-footer">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '14px', color: '#fff' }}>
          <span>Total Est. Investment:</span>
          <strong style={{ color: 'var(--gold)' }}>AED {formattedTotal}</strong>
        </div>
        <button
          className="primary-button btn-gold"
          style={{ width: '100%' }}
          onClick={onRequestBrochures}
          disabled={savedItems.length === 0}
        >
          REQUEST BROCHURES & ROI
        </button>
      </div>
    </div>
  );
}
