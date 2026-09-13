import React from 'react';
import './index.css';

export default function Input({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  icon,
  iconRight,
  onRightIconClick,
  rightIconAriaLabel,
  error,
  helperText,
  disabled = false,
  readOnly = false,
  onFocus,
  onClick,
  id,
  name,
  autoComplete,
  className = '',
  required = false,
  ...props
}) {
  return (
    <div className={`rydo-input-group ${className} ${error ? 'has-error' : ''}`}>
      {label && (
        <label htmlFor={id} className="rydo-input-label">
          {label} {required && <span className="rydo-required">*</span>}
        </label>
      )}

      <div className={`rydo-input-wrapper ${disabled ? 'disabled' : ''}`}>
        {icon && (
          <span className="material-symbols-outlined rydo-input-icon rydo-input-icon-left">
            {icon}
          </span>
        )}

        <input
          id={id}
          name={name || id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          onFocus={onFocus}
          onClick={onClick}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          className="rydo-input-field"
          {...props}
        />

        {iconRight && (
          <button
            type="button"
            className="rydo-input-action-btn"
            onClick={onRightIconClick}
            disabled={disabled}
            aria-label={rightIconAriaLabel || 'Action'}
          >
            <span className="material-symbols-outlined rydo-input-icon rydo-input-icon-right">
              {iconRight}
            </span>
          </button>
        )}
      </div>

      {error ? (
        <span id={`${id}-error`} className="rydo-input-error" role="alert">{error}</span>
      ) : helperText ? (
        <span id={`${id}-helper`} className="rydo-input-helper">{helperText}</span>
      ) : null}
    </div>
  );
}
