import { Routes, Route, Navigate } from 'react-router-dom';
import React, { Suspense, lazy, ReactElement } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Lazy loading of pages for better performance
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const CitizenList = lazy(() => import('./pages/citizens/CitizenList'));
const CitizenDetail = lazy(() => import('./pages/citizens/CitizenDetail'));
const LicenseList = lazy(() => import('./pages/licenses/LicenseList'));
const LicenseDetail = lazy(() => import('./pages/licenses/LicenseDetail'));
const ApplicationList = lazy(() => import('./pages/applications/ApplicationList'));
const ApplicationDetail = lazy(() => import('./pages/applications/ApplicationDetail'));
const NewApplication = lazy(() => import('./pages/applications/NewApplication'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading component for suspense fallback
const Loading = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// Protected route component
function ProtectedRoute(props: { element: ReactElement, requiredRole?: string }) {
  const element = props.element;
  const requiredRole = props.requiredRole || '';
  const { isAuthenticated, isLoading, hasPermission } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && !hasPermission(requiredRole)) {
    return <Navigate to="/" />;
  }

  return element;
}

function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes with role-based access control */}
        <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/citizens" element={<ProtectedRoute element={<CitizenList />} requiredRole="clerk" />} />
        <Route path="/citizens/:id" element={<ProtectedRoute element={<CitizenDetail />} requiredRole="clerk" />} />
        <Route path="/licenses" element={<ProtectedRoute element={<LicenseList />} requiredRole="clerk" />} />
        <Route path="/licenses/:id" element={<ProtectedRoute element={<LicenseDetail />} requiredRole="clerk" />} />
        <Route path="/applications" element={<ProtectedRoute element={<ApplicationList />} requiredRole="clerk" />} />
        <Route path="/applications/new" element={<ProtectedRoute element={<NewApplication />} requiredRole="clerk" />} />
        <Route path="/applications/:id" element={<ProtectedRoute element={<ApplicationDetail />} requiredRole="clerk" />} />
        
        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App; 