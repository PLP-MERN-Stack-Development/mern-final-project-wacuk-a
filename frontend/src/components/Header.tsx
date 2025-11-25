import React from 'react';
import NotificationBell from './Notifications/NotificationBell';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header style={headerStyle}>
      <div style={logoStyle}>
        <h1 style={logoTextStyle}>Kenya Telemedicine</h1>
      </div>
      <nav style={navStyle}>
        <Link to="/" style={linkStyle}>Home</Link>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
            <span style={userInfoStyle}>
              Welcome, {user?.firstName}!
            </span>
            {user && <NotificationBell />}
            <button onClick={handleLogout} style={logoutButtonStyle}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/register" style={linkStyle}>Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

const headerStyle: React.CSSProperties = {
  backgroundColor: '#2c3e50',
  color: 'white',
  padding: '1rem 2rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const logoStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
};

const logoTextStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: 'white',
};

const navStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '1.5rem',
};

const linkStyle: React.CSSProperties = {
  color: 'white',
  textDecoration: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  transition: 'background-color 0.2s',
};

const userInfoStyle: React.CSSProperties = {
  color: '#ecf0f1',
  fontWeight: '500',
};

const logoutButtonStyle: React.CSSProperties = {
  backgroundColor: '#e74c3c',
  color: 'white',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
};

export default Header;
