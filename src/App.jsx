import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { RideProvider } from './context/RideContext.jsx';
import ProtectedRoute from './components/ProtectedRoute/index.jsx';

// Auth Pages
import Login from './pages/Auth/Login/index.jsx';
import Register from './pages/Auth/Register/index.jsx';

// Rider Pages
import RiderHome from './pages/Rider/Home/index.jsx';
import RideMatching from './pages/Rider/RideMatching/index.jsx';
import RideTracking from './pages/Rider/RideTracking/index.jsx';
import RideCompleted from './pages/Rider/RideCompleted/index.jsx';
import RideHistory from './pages/Rider/RideHistory/index.jsx';
import RiderProfile from './pages/Rider/Profile/index.jsx';

// Driver Pages
import DriverDashboard from './pages/Driver/Dashboard/index.jsx';
import DriverRides from './pages/Driver/Rides/index.jsx';
import DriverProfile from './pages/Driver/Profile/index.jsx';

// Admin Pages
import AdminDashboard from './pages/Admin/Dashboard/index.jsx';
import AdminDrivers from './pages/Admin/Drivers/index.jsx';
import AdminRides from './pages/Admin/Rides/index.jsx';

// Dynamic role-based root redirector
function RoleBasedRedirect() {
  const { user, role } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  const currentRole = (user.role || role || 'rider').toLowerCase();
  if (currentRole === 'admin') {
    return <Navigate to="/admin" replace />;
  }
  if (currentRole === 'driver') {
    return <Navigate to="/driver" replace />;
  }
  return <Navigate to="/rider" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RideProvider>
          <Routes>
            {/* Dynamic Root Redirection */}
            <Route path="/" element={<RoleBasedRedirect />} />

            {/* Public Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rider Protected Experience (Rider Role only) */}
            <Route
              path="/rider"
              element={
                <ProtectedRoute allowedRoles={['rider']}>
                  <RiderHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/rider/matching"
              element={
                <ProtectedRoute allowedRoles={['rider']}>
                  <RideMatching />
                </ProtectedRoute>
              }
            />
            <Route
              path="/rider/tracking"
              element={
                <ProtectedRoute allowedRoles={['rider']}>
                  <RideTracking />
                </ProtectedRoute>
              }
            />
            <Route
              path="/rider/completed"
              element={
                <ProtectedRoute allowedRoles={['rider']}>
                  <RideCompleted />
                </ProtectedRoute>
              }
            />
            <Route
              path="/rider/rides"
              element={
                <ProtectedRoute allowedRoles={['rider']}>
                  <RideHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/rider/profile"
              element={
                <ProtectedRoute allowedRoles={['rider']}>
                  <RiderProfile />
                </ProtectedRoute>
              }
            />

            {/* Driver Protected Experience (Driver Role only) */}
            <Route
              path="/driver"
              element={
                <ProtectedRoute allowedRoles={['driver']}>
                  <DriverDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/driver/rides"
              element={
                <ProtectedRoute allowedRoles={['driver']}>
                  <DriverRides />
                </ProtectedRoute>
              }
            />
            <Route
              path="/driver/profile"
              element={
                <ProtectedRoute allowedRoles={['driver']}>
                  <DriverProfile />
                </ProtectedRoute>
              }
            />

            {/* Admin Protected Intelligence (Admin Role only) */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/drivers"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDrivers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/rides"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminRides />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<RoleBasedRedirect />} />
          </Routes>
        </RideProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
