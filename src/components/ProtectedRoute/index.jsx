import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

/**
 * ProtectedRoute: Enforces user authentication and role verification (Rider, Driver, Admin)
 * before rendering route paths in App.jsx.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child element or route component
 * @param {string[]|string} [props.allowedRoles] - Role(s) permitted to access this route ('Rider' | 'Driver' | 'Admin')
 * @param {string} [props.role] - Alias for single role requirement
 * @param {string} [props.redirectTo] - Custom redirection path if unauthorized
 */
export default function ProtectedRoute({ children, allowedRoles, role: requiredRole, redirectTo }) {
  const { user, role, loading } = useAuth();
  const location = useLocation();

  // 1. Authentication State Loading Indicator
  if (loading) {
    return (
      <div
        role="status"
        aria-label="Verifying authentication credentials"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          backgroundColor: 'var(--color-surface-low)'
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            border: '3px solid var(--color-border)',
            borderTopColor: 'var(--color-primary)',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite'
          }}
        />
        <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
          Verifying authorization...
        </span>
      </div>
    );
  }

  // 2. Authentication Check: Redirect unauthenticated visitors to /login
  if (!user || localStorage.getItem('rydo_logged_out') === 'true') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Role-Based Authorization Check (Rider / Driver / Admin)
  const activeRole = (user.role || role || 'rider').toString().trim().toLowerCase();

  // Build normalized list of permitted roles
  const permittedRoles = [];
  if (allowedRoles) {
    if (Array.isArray(allowedRoles)) {
      permittedRoles.push(...allowedRoles.map(r => String(r).trim().toLowerCase()));
    } else if (typeof allowedRoles === 'string') {
      permittedRoles.push(allowedRoles.trim().toLowerCase());
    }
  }
  if (requiredRole) {
    permittedRoles.push(String(requiredRole).trim().toLowerCase());
  }

  // If role restrictions apply, check if the current user has the required permission
  if (permittedRoles.length > 0 && !permittedRoles.includes(activeRole)) {
    if (redirectTo) {
      return <Navigate to={redirectTo} replace />;
    }

    // Direct user to their respective role-appropriate home
    if (activeRole === 'admin') {
      return <Navigate to="/admin" replace />;
    } else if (activeRole === 'driver') {
      return <Navigate to="/driver" replace />;
    } else {
      return <Navigate to="/rider" replace />;
    }
  }

  return children;
}
