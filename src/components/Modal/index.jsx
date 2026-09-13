import React from 'react';
import './index.css';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = '460px'
}) {
  if (!isOpen) return null;

  return (
    <div className="rydo-modal-overlay" onClick={onClose}>
      <div 
        className="rydo-modal-dialog" 
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rydo-modal-header">
          {title && <h3 className="rydo-modal-title">{title}</h3>}
          <button 
            type="button" 
            className="rydo-modal-close-btn" 
            onClick={onClose}
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="rydo-modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}
