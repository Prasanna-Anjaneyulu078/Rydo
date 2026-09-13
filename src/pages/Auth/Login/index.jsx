import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';
import Button from '../../../components/Button/index.jsx';
import Input from '../../../components/Input/index.jsx';
import PasswordInput from '../../../components/PasswordInput/index.jsx';
import { ASSETS } from '../../../constants/assets.js';
import './index.css';

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [emailOrPhone, setEmailOrPhone] = useState('alex.mercer@rydo.io');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [showForgotMsg, setShowForgotMsg] = useState(false);

  // Validate form before submission
  const validateForm = () => {
    const errors = {};
    const trimmedInput = emailOrPhone.trim();

    if (!trimmedInput) {
      errors.emailOrPhone = 'Please enter your email or phone number.';
    }

    if (!password) {
      errors.password = 'Please enter your password.';
    } else if (password.length < 8) {
      errors.password = 'Password must contain at least 8 characters.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setShowForgotMsg(false);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const res = await login({
        emailOrPhone: emailOrPhone.trim(),
        password
      });

      if (res.success && res.user) {
        // Redirect according to authenticated role
        const role = (res.user.role || 'rider').toLowerCase();
        
        // If there was a redirected location intended for this role
        const intendedPath = location.state?.from?.pathname;
        if (intendedPath && !intendedPath.startsWith('/login') && !intendedPath.startsWith('/register')) {
          navigate(intendedPath, { replace: true });
        } else if (role === 'driver') {
          navigate('/driver', { replace: true });
        } else if (role === 'admin') {
          navigate('/admin', { replace: true });
        } else {
          navigate('/rider', { replace: true });
        }
      } else {
        setFormError(res.error || 'Invalid credentials. Please verify and try again.');
      }
    } catch (err) {
      setFormError('Unable to connect to authentication service. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Quick fill helper for reviewing all 3 roles smoothly
  const fillDemoAccount = (role) => {
    setFormError('');
    setFieldErrors({});
    setShowForgotMsg(false);

    if (role === 'driver') {
      setEmailOrPhone('rahul.s.driver@rydo.io');
      setPassword('password123');
    } else if (role === 'admin') {
      setEmailOrPhone('s.jenkins@rydo.io');
      setPassword('password123');
    } else {
      setEmailOrPhone('alex.mercer@rydo.io');
      setPassword('password123');
    }
  };

  return (
    <div className="rydo-auth-page">
      <div className="rydo-auth-card">
        {/* Brand Header */}
        <div className="rydo-auth-brand-block">
          <Link to="/" className="rydo-auth-logo-link" aria-label="Rydo Home">
            <img src={ASSETS.logo} alt="Rydo Logo" className="rydo-auth-logo" referrerPolicy="no-referrer" />
          </Link>
          <h1 className="rydo-auth-title">Welcome back</h1>
          <p className="rydo-auth-desc">Sign in to continue your ride</p>
        </div>

        {/* Global Error Banner */}
        {formError && (
          <div className="rydo-auth-error-banner" role="alert">
            <span className="material-symbols-outlined rydo-error-icon">error</span>
            <span>{formError}</span>
          </div>
        )}

        {/* Forgot Password Feedback */}
        {showForgotMsg && (
          <div className="rydo-auth-info-banner" role="status">
            <span className="material-symbols-outlined">info</span>
            <span>Password reset instructions have been dispatched to your registered contact.</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="rydo-auth-form" noValidate>
          {/* Email or Phone Field */}
          <Input
            id="emailOrPhone"
            name="emailOrPhone"
            label="Email or phone number"
            type="text"
            value={emailOrPhone}
            onChange={(e) => {
              setEmailOrPhone(e.target.value);
              if (fieldErrors.emailOrPhone) {
                setFieldErrors((prev) => ({ ...prev, emailOrPhone: '' }));
              }
            }}
            placeholder="Enter email or phone number"
            icon="mail"
            autoComplete="username"
            error={fieldErrors.emailOrPhone}
            disabled={loading}
            required
          />

          {/* Password Field */}
          <PasswordInput
            id="password"
            name="password"
            label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (fieldErrors.password) {
                setFieldErrors((prev) => ({ ...prev, password: '' }));
              }
            }}
            placeholder="Enter your password"
            autoComplete="current-password"
            error={fieldErrors.password}
            disabled={loading}
            required
          />

          {/* Remember me & Forgot password row */}
          <div className="rydo-auth-meta-row">
            <label className="rydo-remember-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rydo-checkbox"
              />
              <span>Remember me</span>
            </label>

            <button
              type="button"
              className="rydo-forgot-link"
              onClick={() => setShowForgotMsg(true)}
            >
              Forgot password?
            </button>
          </div>

          {/* Primary Action Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
            disabled={loading}
            icon={loading ? null : "login"}
            id="login-submit-btn"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>

          {/* Demo Credentials Quick-Fill Pills */}
          <div className="rydo-auth-demo-section">
            <span className="rydo-auth-demo-label">Demo Quick Fill:</span>
            <div className="rydo-quick-access-pills">
              <button
                type="button"
                className="rydo-quick-pill"
                onClick={() => fillDemoAccount('rider')}
                title="Fill demo rider credentials"
              >
                Rider
              </button>
              <button
                type="button"
                className="rydo-quick-pill"
                onClick={() => fillDemoAccount('driver')}
                title="Fill demo driver credentials"
              >
                Driver
              </button>
              <button
                type="button"
                className="rydo-quick-pill"
                onClick={() => fillDemoAccount('admin')}
                title="Fill demo admin credentials"
              >
                Admin
              </button>
            </div>
          </div>
        </form>

        {/* Secondary Action Link */}
        <div className="rydo-auth-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="rydo-auth-link">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
