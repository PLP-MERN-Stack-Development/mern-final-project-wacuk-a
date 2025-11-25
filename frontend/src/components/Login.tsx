import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const loading = isLoading || authLoading;

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2>Login to Your Account</h2>
        {error && <div style={errorStyle}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
              disabled={loading}
              placeholder="Enter your email"
            />
          </div>
          <div style={inputGroupStyle}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={inputStyle}
              disabled={loading}
              placeholder="Enter your password"
            />
          </div>
          <button 
            type="submit" 
            style={loading ? { ...buttonStyle, ...disabledButtonStyle } : buttonStyle}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p style={linkTextStyle}>
          Don't have an account? <Link to="/register" style={linkStyle}>Register here</Link>
        </p>
        
        {/* Demo credentials info */}
        <div style={demoStyle}>
          <p><strong>Demo Info:</strong></p>
          <p>Currently using mock authentication</p>
          <p>Enter any email/password to test the flow</p>
          <p>Backend integration ready - just uncomment in AuthContext</p>
        </div>
      </div>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '60vh',
  padding: '1rem'
};

const formStyle: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '400px'
};

const inputGroupStyle: React.CSSProperties = {
  marginBottom: '1rem'
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '1rem',
  marginTop: '0.5rem'
};

const buttonStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem',
  backgroundColor: '#2E8B57',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontSize: '1rem',
  cursor: 'pointer',
  marginTop: '1rem'
};

const disabledButtonStyle: React.CSSProperties = {
  backgroundColor: '#cccccc',
  cursor: 'not-allowed'
};

const linkTextStyle: React.CSSProperties = {
  textAlign: 'center',
  marginTop: '1rem'
};

const linkStyle: React.CSSProperties = {
  color: '#2E8B57',
  textDecoration: 'none'
};

const errorStyle: React.CSSProperties = {
  backgroundColor: '#ffebee',
  color: '#c62828',
  padding: '0.75rem',
  borderRadius: '4px',
  marginBottom: '1rem',
  border: '1px solid #ffcdd2'
};

const demoStyle: React.CSSProperties = {
  marginTop: '1.5rem',
  padding: '1rem',
  backgroundColor: '#e8f5e8',
  borderRadius: '4px',
  fontSize: '0.9rem',
  textAlign: 'center'
};

export default Login;
