import React from 'react';

export default function Toast({ message, visible }) {
  return (
    <div className={`toast-notice ${visible ? 'show' : ''}`}>
      {message}
    </div>
  );
}
