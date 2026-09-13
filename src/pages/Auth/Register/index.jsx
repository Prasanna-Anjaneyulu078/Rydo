import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';
import Button from '../../../components/Button/index.jsx';
import Input from '../../../components/Input/index.jsx';
import PasswordInput from '../../../components/PasswordInput/index.jsx';
import { ASSETS } from '../../../constants/assets.js';
import './index.css';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-level error on edit
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errors = {};
    const cleanName = formData.name.trim();
    const cleanEmail = formData.email.trim();
    const cleanPhone = formData.phone.trim();
    const cleanPhoneDigits = cleanPhone.replace(/\D/g, '');

    // 1. Full Name validation
    if (!cleanName) {
      errors.name = 'Please enter your full name.';
    } else if (cleanName.length < 2) {
      errors.name = 'Full name must contain at least 2 characters.';
    }

    // 2. Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail) {
      errors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(cleanEmail)) {
      errors.email = 'Please enter a valid email address (e.g. name@example.com).';
    }

    // 3. Phone validation
    if (!cleanPhone) {
      errors.phone = 'Please enter your phone number.';
    } else if (cleanPhoneDigits.length < 7 || cleanPhoneDigits.length > 15) {
      errors.phone = 'Please enter a valid phone number (7 to 15 digits).';
    }

    // 4. Password validation
    if (!formData.password) {
      errors.password = 'Please enter a password.';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must contain at least 8 characters.';
    }

    // 5. Confirm Password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password.';
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      // Register common Rydo User Account
      const res = await register({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        password: formData.password
      });

      if (res.success) {
        // Redirect to Rider Home as newly created Rydo User
        navigate('/rider', { replace: true });
      } else {
        setFormError(res.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setFormError('Unable to connect to authentication service. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rydo-auth-page">
      <div className="rydo-auth-card rydo-register-card">
        {/* Brand Header */}
        <div className="rydo-auth-brand-block">
          <Link to="/" className="rydo-auth-logo-link" aria-label="Rydo Home">
            <img src={ASSETS.logo} alt="Rydo Logo" className="rydo-auth-logo" referrerPolicy="no-referrer" />
          </Link>
          <h1 className="rydo-auth-title">Create your Rydo account</h1>
          <p className="rydo-auth-desc">
            Sign up to book rides and enjoy smart driver matching.
          </p>
        </div>

        {/* Global Error Banner */}
        {formError && (
          <div className="rydo-auth-error-banner" role="alert">
            <span className="material-symbols-outlined rydo-error-icon">error</span>
            <span>{formError}</span>
          </div>
        )}

        {/* Compact Registration Form */}
        <form onSubmit={handleSubmit} className="rydo-auth-form rydo-register-form" noValidate>
          {/* Full Name */}
          <Input
            id="reg-name"
            name="name"
            label="Full Name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            icon="badge"
            autoComplete="name"
            error={fieldErrors.name}
            disabled={loading}
            required
          />

          {/* Email */}
          <Input
            id="reg-email"
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
            icon="mail"
            autoComplete="email"
            error={fieldErrors.email}
            disabled={loading}
            required
          />

          {/* Phone */}
          <Input
            id="reg-phone"
            name="phone"
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone number"
            icon="phone"
            autoComplete="tel"
            error={fieldErrors.phone}
            disabled={loading}
            required
          />

          {/* Password */}
          <PasswordInput
            id="reg-password"
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            autoComplete="new-password"
            error={fieldErrors.password}
            disabled={loading}
            required
          />

          {/* Confirm Password */}
          <PasswordInput
            id="reg-confirm-password"
            name="confirmPassword"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            autoComplete="new-password"
            error={fieldErrors.confirmPassword}
            disabled={loading}
            required
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
            disabled={loading}
            icon={loading ? null : "person_add"}
            id="register-submit-btn"
            className="rydo-register-submit-btn"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        {/* Footer Navigation */}
        <div className="rydo-auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="rydo-auth-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
