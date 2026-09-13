import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getCurrentUser());
  const [role, setRole] = useState(() => user?.role || 'rider');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user.role !== role) {
      setRole(user.role);
    }
  }, [user]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await authService.login(credentials);
      if (res.success) {
        setUser(res.user);
        setRole(res.user.role);
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const res = await authService.register(userData);
      if (res.success) {
        setUser(res.user);
        setRole(res.user.role);
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  const switchRole = (newRole) => {
    const updated = authService.switchRole(newRole);
    setUser(updated);
    setRole(newRole);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setRole('rider');
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, login, register, switchRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
