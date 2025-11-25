import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { MedicalProvider } from "./contexts/MedicalContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import './App.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <MedicalProvider>
        <NotificationProvider>
          <Router>
            <div className="App">
              <Header />
              <main style={mainStyle}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/video-consultation" 
                    element={
                      <ProtectedRoute>
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </main>
            </div>
          </Router>
        </NotificationProvider>
      </MedicalProvider>
    </AuthProvider>
  );
};

const mainStyle: React.CSSProperties = {
  minHeight: 'calc(100vh - 120px)',
  padding: '0',
};

export default App;
