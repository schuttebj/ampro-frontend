import { Routes, Route, Navigate } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

// Lazy loading of pages for better performance
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const CitizenList = lazy(() => import('./pages/citizens/CitizenList'));
const CitizenDetail = lazy(() => import('./pages/citizens/CitizenDetail'));
const LicenseList = lazy(() => import('./pages/licenses/LicenseList'));
const LicenseDetail = lazy(() => import('./pages/licenses/LicenseDetail'));
const ApplicationList = lazy(() => import('./pages/applications/ApplicationList'));
const ApplicationDetail = lazy(() => import('./pages/applications/ApplicationDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading component for suspense fallback
const Loading = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

function App() {
  // This is just a placeholder. In a real app, you'd use a proper auth context
  const isAuthenticated = false;

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes */}
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/citizens" element={isAuthenticated ? <CitizenList /> : <Navigate to="/login" />} />
        <Route path="/citizens/:id" element={isAuthenticated ? <CitizenDetail /> : <Navigate to="/login" />} />
        <Route path="/licenses" element={isAuthenticated ? <LicenseList /> : <Navigate to="/login" />} />
        <Route path="/licenses/:id" element={isAuthenticated ? <LicenseDetail /> : <Navigate to="/login" />} />
        <Route path="/applications" element={isAuthenticated ? <ApplicationList /> : <Navigate to="/login" />} />
        <Route path="/applications/:id" element={isAuthenticated ? <ApplicationDetail /> : <Navigate to="/login" />} />
        
        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App; 