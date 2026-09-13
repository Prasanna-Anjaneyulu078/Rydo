import { CURRENT_USER, MOCK_USERS_LIST } from '../constants/mockUsers.js';
import { ASSETS } from '../constants/assets.js';

// Centralized API configuration for future Node.js / Express backend
const API_BASE_URL = (typeof process !== 'undefined' && process.env?.VITE_API_URL) || 
                     (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || 
                     '';

export const AUTH_ENDPOINTS = {
  login: `${API_BASE_URL}/api/auth/login`,
  register: `${API_BASE_URL}/api/auth/register`,
  me: `${API_BASE_URL}/api/auth/me`,
  logout: `${API_BASE_URL}/api/auth/logout`
};

// Helper to get registered users from localStorage
function getStoredUsers() {
  try {
    const raw = localStorage.getItem('rydo_registered_users');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to read registered users', e);
    return [];
  }
}

function saveStoredUsers(users) {
  try {
    localStorage.setItem('rydo_registered_users', JSON.stringify(users));
  } catch (e) {
    console.error('Failed to save registered users', e);
  }
}

export const authService = {
  endpoints: AUTH_ENDPOINTS,

  getToken: () => {
    return localStorage.getItem('rydo_token') || null;
  },

  getCurrentUser: () => {
    // If explicitly logged out, return null
    if (localStorage.getItem('rydo_logged_out') === 'true') {
      return null;
    }

    const stored = localStorage.getItem('rydo_user');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse stored user', e);
      }
    }
    // Default initial user for seamless demoing if no user stored yet
    return CURRENT_USER;
  },

  login: async ({ emailOrPhone, password }) => {
    // Normalize inputs
    const identifier = (emailOrPhone || '').trim().toLowerCase();
    const cleanPhone = identifier.replace(/[\s\-\+\(\)]/g, '');

    // 1. If backend API is configured, attempt real HTTP POST /api/auth/login
    if (API_BASE_URL) {
      try {
        const response = await fetch(AUTH_ENDPOINTS.login, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ emailOrPhone: identifier, password })
        });
        const data = await response.json();
        if (response.ok && data.success) {
          localStorage.setItem('rydo_user', JSON.stringify(data.user));
          if (data.token) {
            localStorage.setItem('rydo_token', data.token);
          }
          localStorage.removeItem('rydo_logged_out');
          return { success: true, user: data.user, token: data.token };
        } else {
          return {
            success: false,
            error: data.message || data.error || 'Invalid credentials. Please try again.'
          };
        }
      } catch (networkErr) {
        console.warn('API endpoint unavailable, falling back to simulated auth', networkErr);
      }
    }

    // 2. Client-side simulated auth service (API-ready fallback)
    await new Promise(resolve => setTimeout(resolve, 450));

    // Basic sanity checks
    if (!identifier) {
      return { success: false, error: 'Please enter your email or phone number.' };
    }
    if (!password) {
      return { success: false, error: 'Please enter your password.' };
    }
    if (password.length < 8) {
      return { success: false, error: 'Password must contain at least 8 characters.' };
    }

    // Check against registered users first
    const registeredUsers = getStoredUsers();
    const registeredUser = registeredUsers.find(u => 
      u.email.toLowerCase() === identifier || 
      (u.phone && u.phone.replace(/[\s\-\+\(\)]/g, '').includes(cleanPhone))
    );

    if (registeredUser) {
      if (registeredUser.password && registeredUser.password !== password) {
        return { success: false, error: 'Incorrect password. Please try again.' };
      }
      const authenticatedUser = {
        id: registeredUser.id,
        name: registeredUser.name,
        email: registeredUser.email,
        phone: registeredUser.phone,
        role: registeredUser.role || 'rider',
        avatar: registeredUser.avatar || ASSETS.userAvatar,
        defaultPayment: registeredUser.defaultPayment || 'Cash / UPI (•••• 8821)'
      };
      const token = `jwt_${Date.now()}_${btoa(authenticatedUser.email)}`;
      localStorage.setItem('rydo_user', JSON.stringify(authenticatedUser));
      localStorage.setItem('rydo_token', token);
      localStorage.removeItem('rydo_logged_out');
      return { success: true, user: authenticatedUser, token };
    }

    // Check against predefined mock accounts
    const mockMatch = MOCK_USERS_LIST.find(u => 
      u.email.toLowerCase() === identifier || 
      (u.phone && u.phone.replace(/[\s\-\+\(\)]/g, '').includes(cleanPhone))
    );

    if (mockMatch) {
      // Simulate invalid password check
      if (password === 'wrongpassword' || password === 'wrongpass') {
        return { success: false, error: 'Incorrect password. Please try again.' };
      }

      const role = mockMatch.role.toLowerCase();
      let user = {
        id: mockMatch.id,
        name: mockMatch.name,
        email: mockMatch.email,
        phone: mockMatch.phone,
        role: role,
        avatar: role === 'driver' ? ASSETS.driverAvatar : ASSETS.userAvatar,
        defaultPayment: 'Cash / UPI (•••• 8821)',
        promoCode: 'SAVE20'
      };

      if (role === 'driver') {
        user.vehicle = 'White Hyundai i20 (KA 01 MJ 4821)';
        user.rating = 4.9;
        user.status = 'Online';
      }

      const token = `jwt_${Date.now()}_${btoa(user.email)}`;
      localStorage.setItem('rydo_user', JSON.stringify(user));
      localStorage.setItem('rydo_token', token);
      localStorage.removeItem('rydo_logged_out');
      return { success: true, user, token };
    }

    // Fallback: If user enters demo shortcut or common name
    if (identifier.includes('driver')) {
      const user = {
        id: 'usr-003',
        name: 'Rahul Sharma',
        email: 'rahul.s.driver@rydo.io',
        phone: '+91 98450 31289',
        role: 'driver',
        vehicle: 'White Hyundai i20 (KA 01 MJ 4821)',
        rating: 4.9,
        avatar: ASSETS.driverAvatar
      };
      const token = `jwt_${Date.now()}_driver`;
      localStorage.setItem('rydo_user', JSON.stringify(user));
      localStorage.setItem('rydo_token', token);
      localStorage.removeItem('rydo_logged_out');
      return { success: true, user, token };
    }

    if (identifier.includes('admin')) {
      const user = {
        id: 'usr-005',
        name: 'Sarah Jenkins',
        email: 's.jenkins@rydo.io',
        phone: '+1 (415) 890-1234',
        role: 'admin',
        avatar: ASSETS.userAvatar
      };
      const token = `jwt_${Date.now()}_admin`;
      localStorage.setItem('rydo_user', JSON.stringify(user));
      localStorage.setItem('rydo_token', token);
      localStorage.removeItem('rydo_logged_out');
      return { success: true, user, token };
    }

    // If identifier is not recognized
    return {
      success: false,
      error: 'No Rydo account found with this email or phone. Please create an account.'
    };
  },

  register: async ({ name, email, phone, password }) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPhone = (phone || '').trim();
    const cleanName = (name || '').trim();

    // 1. If backend API is configured, attempt real HTTP POST /api/auth/register
    if (API_BASE_URL) {
      try {
        const response = await fetch(AUTH_ENDPOINTS.register, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: cleanName,
            email: cleanEmail,
            phone: cleanPhone,
            password
          })
        });
        const data = await response.json();
        if (response.ok && data.success) {
          localStorage.setItem('rydo_user', JSON.stringify(data.user));
          if (data.token) {
            localStorage.setItem('rydo_token', data.token);
          }
          localStorage.removeItem('rydo_logged_out');
          return { success: true, user: data.user, token: data.token };
        } else {
          return {
            success: false,
            error: data.message || data.error || 'Registration failed.'
          };
        }
      } catch (networkErr) {
        console.warn('API endpoint unavailable, falling back to simulated auth', networkErr);
      }
    }

    // 2. Client-side simulated registration (API-ready fallback)
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if email already registered
    const existing = getStoredUsers();
    if (existing.some(u => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, error: 'An account with this email address already exists. Please sign in.' };
    }

    // Common Rydo User Account (role is always 'rider' for standard user registration)
    const newUser = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      password, // stored locally for simulation
      role: 'rider',
      avatar: ASSETS.userAvatar,
      savedPlaces: {
        home: '',
        office: ''
      },
      defaultPayment: 'Cash / UPI',
      joinedDate: 'Today',
      totalTrips: 0
    };

    // Save into list of registered users
    existing.push(newUser);
    saveStoredUsers(existing);

    // Save active session
    const token = `jwt_${Date.now()}_${btoa(cleanEmail)}`;
    const sessionUser = { ...newUser };
    delete sessionUser.password;

    localStorage.setItem('rydo_user', JSON.stringify(sessionUser));
    localStorage.setItem('rydo_token', token);
    localStorage.removeItem('rydo_logged_out');

    return { success: true, user: sessionUser, token };
  },

  switchRole: (role) => {
    const user = authService.getCurrentUser() || CURRENT_USER;
    const updated = { ...user, role };
    localStorage.setItem('rydo_user', JSON.stringify(updated));
    localStorage.removeItem('rydo_logged_out');
    return updated;
  },

  logout: async () => {
    await new Promise(resolve => setTimeout(resolve, 150));
    localStorage.removeItem('rydo_user');
    localStorage.removeItem('rydo_token');
    localStorage.setItem('rydo_logged_out', 'true');
    return { success: true };
  }
};
