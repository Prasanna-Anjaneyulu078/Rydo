import React from 'react';
import './index.css';

export default function BottomSheet({
  children,
  isOpen = true,
  onClose,
  title,
  subtitle,
  badge,
  className = ''
}) {
  if (!isOpen) return null;

  return (
    <div className={`rydo-bottom-sheet ${className}`}>
      <div className="rydo-sheet-handle-bar">
        <div className="rydo-sheet-handle"></div>
      </div>

      {(title || badge) && (
        <div className="rydo-sheet-header">
          <div className="rydo-sheet-header-text">
            {title && <h2 className="rydo-sheet-title">{title}</h2>}
            {subtitle && <p className="rydo-sheet-subtitle">{subtitle}</p>}
          </div>
          {badge && <div className="rydo-sheet-badge">{badge}</div>}
        </div>
      )}

      <div className="rydo-sheet-content">
        {children}
      </div>
    </div>
  );
}
