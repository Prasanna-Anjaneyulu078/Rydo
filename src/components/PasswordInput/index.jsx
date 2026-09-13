import React, { useState } from 'react';
import Input from '../Input/index.jsx';

export default function PasswordInput({
  label = 'Password',
  value,
  onChange,
  placeholder = 'Enter your password',
  error,
  helperText,
  id = 'password',
  name = 'password',
  autoComplete = 'current-password',
  required = false,
  disabled = false,
  className = '',
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Input
      id={id}
      name={name}
      label={label}
      type={showPassword ? 'text' : 'password'}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      icon="lock"
      iconRight={showPassword ? 'visibility_off' : 'visibility'}
      onRightIconClick={togglePasswordVisibility}
      rightIconAriaLabel={showPassword ? 'Hide password' : 'Show password'}
      error={error}
      helperText={helperText}
      autoComplete={autoComplete}
      required={required}
      disabled={disabled}
      className={`rydo-password-input-group ${className}`}
      {...props}
    />
  );
}
