import React from 'react';
import './index.css';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon,
  iconRight,
  onClick,
  type = 'button',
  className = '',
  id,
  ...props
}) {
  return (
    <button
      id={id}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`rydo-btn rydo-btn-${variant} rydo-btn-${size} ${fullWidth ? 'rydo-btn-full' : ''} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="rydo-btn-spinner"></span>
      ) : (
        <>
          {icon && <span className="material-symbols-outlined rydo-btn-icon">{icon}</span>}
          <span className="rydo-btn-text">{children}</span>
          {iconRight && <span className="material-symbols-outlined rydo-btn-icon rydo-btn-icon-right">{iconRight}</span>}
        </>
      )}
    </button>
  );
}
