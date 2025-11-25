import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    county: '',
    userType: 'patient',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { register, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  const kenyaCounties = [
    'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika',
    'Malindi', 'Kitale', 'Garissa', 'Kakamega', 'Nyeri', 'Lamu'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (!formData.county) {
      setError('Please select your county');
      return;
    }

    setIsLoading(true);

    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const loading = isLoading || authLoading;

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2>Create Your Account</h2>
        {error && <div style={errorStyle}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={inputRowStyle}>
            <div style={inputGroupStyle}>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                style={inputStyle}
                disabled={loading}
                placeholder="Enter first name"
              />
            </div>
            <div style={inputGroupStyle}>
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                style={inputStyle}
                disabled={loading}
                placeholder="Enter last name"
              />
            </div>
          </div>

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
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="e.g., 0712345678"
              disabled={loading}
            />
          </div>

          <div style={inputRowStyle}>
            <div style={inputGroupStyle}>
              <label htmlFor="county">County:</label>
              <select
                id="county"
                name="county"
                value={formData.county}
                onChange={handleChange}
                required
                style={inputStyle}
                disabled={loading}
              >
                <option value="">Select your county</option>
                {kenyaCounties.map(county => (
                  <option key={county} value={county}>{county}</option>
                ))}
              </select>
            </div>
            <div style={inputGroupStyle}>
              <label htmlFor="userType">I am a:</label>
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                required
                style={inputStyle}
                disabled={loading}
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>
          </div>

          <div style={inputRowStyle}>
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
                placeholder="At least 6 characters"
              />
            </div>
            <div style={inputGroupStyle}>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                style={inputStyle}
                disabled={loading}
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <button 
            type="submit" 
            style={loading ? { ...buttonStyle, ...disabledButtonStyle } : buttonStyle}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>
        <p style={linkTextStyle}>
          Already have an account? <Link to="/login" style={linkStyle}>Login here</Link>
        </p>

        <div style={demoStyle}>
          <p><strong>Demo Info:</strong></p>
          <p>Currently using mock registration</p>
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
  maxWidth: '600px'
};

const inputRowStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1rem'
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

export default Register;
