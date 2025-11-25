import React, { useState } from 'react';
import MedicalRecords from './MedicalRecords/MedicalRecords';
import NotificationCenter from './Notifications/NotificationCenter';
import { useAuth } from '../context/AuthContext';
import AppointmentBooking from './AppointmentBooking';
import DoctorSearch from './DoctorSearch';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab user={user} />;
      case 'book-appointment':
        return <AppointmentBooking />;
      case 'find-doctors':
        return <DoctorSearch />;
      case 'my-appointments':
        return <MyAppointmentsTab />;
      case 'prescriptions':
        return <PrescriptionsTab />;
      case 'profile':
      case 'medical-records': return <MedicalRecords />;
      case 'notifications': return <NotificationCenter />;
        return <OverviewTab user={user} />;
    }
  };

  const patientTabs = [
    { id: 'overview', label: '📊 Overview', icon: '📊' },
    { id: 'book-appointment', label: '📅 Book Appointment', icon: '📅' },
    { id: 'find-doctors', label: '👨‍⚕️ Find Doctors', icon: '👨‍⚕️' },
    { id: 'medical-records', label: '📋 Medical Records', icon: '📋' },
    { id: 'my-appointments', label: '📋 My Appointments', icon: '📋' },
    { id: 'prescriptions', label: '💊 Prescriptions', icon: '💊' },
    { id: 'profile', label: '👤 Profile', icon: '👤' }
  ];

  const doctorTabs = [
    { id: 'overview', label: '📊 Overview', icon: '📊' },
    { id: 'medical-records', label: '📋 Patient Records', icon: '📋' },
    { id: 'my-schedule', label: '📅 My Schedule', icon: '📅' },
    { id: 'my-patients', label: '👥 My Patients', icon: '👥' },
    { id: 'consultations', label: '💬 Consultations', icon: '💬' },
    { id: 'profile', label: '👤 Profile', icon: '👤' }
  ];

  const tabs = user?.userType === 'doctor' ? doctorTabs : patientTabs;

  return (
    <div style={containerStyle}>
      <div style={dashboardStyle}>
        {/* Sidebar */}
        <div style={sidebarStyle}>
          <div style={sidebarHeaderStyle}>
            <h3>Dashboard</h3>
            <div style={userBadgeStyle}>
              <span style={userIconStyle}>👤</span>
              <span>{user?.firstName}</span>
            </div>
          </div>
          
          <nav style={navStyle}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  ...navButtonStyle,
                  ...(activeTab === tab.id ? activeNavButtonStyle : {})
                }}
              >
                <span style={navIconStyle}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div style={contentStyle}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

const OverviewTab: React.FC<{ user: any }> = ({ user }) => {
  const stats = user?.userType === 'patient' 
    ? [
        { label: 'Upcoming Appointments', value: '2', icon: '📅' },
        { label: 'Completed Consultations', value: '5', icon: '✅' },
        { label: 'Active Prescriptions', value: '1', icon: '💊' },
        { label: 'Doctors Consulted', value: '3', icon: '👨‍⚕️' }
      ]
    : [
        { label: "Today's Appointments", value: '8', icon: '📅' },
        { label: 'Total Patients', value: '156', icon: '👥' },
        { label: 'Monthly Consultations', value: '42', icon: '💬' },
        { label: 'Patient Satisfaction', value: '96%', icon: '⭐' }
      ];

  return (
    <div>
      <div style={welcomeStyle}>
        <h1>Welcome back, {user?.firstName}!</h1>
        <p>Here's what's happening with your health today.</p>
      </div>

      {/* Stats Grid */}
      <div style={statsGridStyle}>
        {stats.map((stat, index) => (
          <div key={index} style={statCardStyle}>
            <div style={statIconStyle}>{stat.icon}</div>
            <div style={statInfoStyle}>
              <div style={statValueStyle}>{stat.value}</div>
              <div style={statLabelStyle}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={sectionStyle}>
        <h3>Quick Actions</h3>
        <div style={actionsGridStyle}>
          {user?.userType === 'patient' ? (
            <>
              <div style={actionCardStyle} onClick={() => window.location.hash = 'book-appointment'}>
                <div style={actionIconStyle}>📅</div>
                <div style={actionTextStyle}>Book New Appointment</div>
              </div>
              <div style={actionCardStyle} onClick={() => window.location.hash = 'find-doctors'}>
                <div style={actionIconStyle}>👨‍⚕️</div>
                <div style={actionTextStyle}>Find Doctors</div>
              </div>
              <div style={actionCardStyle}>
                <div style={actionIconStyle}>💊</div>
                <div style={actionTextStyle}>Request Prescription Refill</div>
              </div>
              <div style={actionCardStyle}>
                <div style={actionIconStyle}>📱</div>
                <div style={actionTextStyle}>Download Medical Records</div>
              </div>
            </>
          ) : (
            <>
              <div style={actionCardStyle}>
                <div style={actionIconStyle}>📅</div>
                <div style={actionTextStyle}>View Today's Schedule</div>
              </div>
              <div style={actionCardStyle}>
                <div style={actionIconStyle}>👥</div>
                <div style={actionTextStyle}>Manage Patients</div>
              </div>
              <div style={actionCardStyle}>
                <div style={actionIconStyle}>💬</div>
                <div style={actionTextStyle}>Start Consultation</div>
              </div>
              <div style={actionCardStyle}>
                <div style={actionIconStyle}>📊</div>
                <div style={actionTextStyle}>View Analytics</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const MyAppointmentsTab: React.FC = () => {
  return (
    <div style={tabContentStyle}>
      <h2>My Appointments</h2>
      <p>Your upcoming and past appointments will appear here.</p>
      <div style={placeholderStyle}>
        <p>📅 No upcoming appointments</p>
      </div>
    </div>
  );
};

const PrescriptionsTab: React.FC = () => {
  return (
    <div style={tabContentStyle}>
      <h2>My Prescriptions</h2>
      <p>Your active and past prescriptions will appear here.</p>
      <div style={placeholderStyle}>
        <p>💊 No active prescriptions</p>
      </div>
    </div>
  );
};

const ProfileTab: React.FC<{ user: any }> = ({ user }) => {
  return (
    <div style={tabContentStyle}>
      <h2>My Profile</h2>
      <div style={profileCardStyle}>
        <div style={profileInfoStyle}>
          <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Phone:</strong> {user?.phone || 'Not provided'}</p>
          <p><strong>User Type:</strong> {user?.userType}</p>
          <p><strong>County:</strong> {user?.county}</p>
        </div>
      </div>
    </div>
  );
};

// Styles
const containerStyle: React.CSSProperties = {
  padding: '1rem',
  minHeight: '80vh'
};

const dashboardStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '250px 1fr',
  gap: '2rem',
  maxWidth: '1400px',
  margin: '0 auto'
};

const sidebarStyle: React.CSSProperties = {
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  padding: '1.5rem'
};

const sidebarHeaderStyle: React.CSSProperties = {
  marginBottom: '2rem',
  paddingBottom: '1rem',
  borderBottom: '2px solid #2E8B57'
};

const userBadgeStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.5rem',
  backgroundColor: '#f8f9fa',
  borderRadius: '4px',
  marginTop: '0.5rem'
};

const userIconStyle: React.CSSProperties = {
  fontSize: '1.2rem'
};

const navStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
};

const navButtonStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  padding: '0.75rem 1rem',
  border: 'none',
  backgroundColor: 'transparent',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '0.9rem',
  textAlign: 'left',
  transition: 'all 0.3s ease'
};

const activeNavButtonStyle: React.CSSProperties = {
  backgroundColor: '#2E8B57',
  color: 'white'
};

const navIconStyle: React.CSSProperties = {
  fontSize: '1.1rem'
};

const contentStyle: React.CSSProperties = {
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  padding: '2rem'
};

const welcomeStyle: React.CSSProperties = {
  marginBottom: '2rem'
};

const statsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '1.5rem',
  marginBottom: '2rem'
};

const statCardStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  padding: '1.5rem',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  border: '1px solid #e9ecef'
};

const statIconStyle: React.CSSProperties = {
  fontSize: '2rem'
};

const statInfoStyle: React.CSSProperties = {
  flex: 1
};

const statValueStyle: React.CSSProperties = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#2E8B57'
};

const statLabelStyle: React.CSSProperties = {
  color: '#666',
  fontSize: '0.9rem'
};

const sectionStyle: React.CSSProperties = {
  marginTop: '2rem'
};

const actionsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '1rem',
  marginTop: '1rem'
};

const actionCardStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  border: '2px solid #e9ecef',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  textAlign: 'center'
};

const actionIconStyle: React.CSSProperties = {
  fontSize: '2rem',
  marginBottom: '0.5rem'
};

const actionTextStyle: React.CSSProperties = {
  fontWeight: 'bold',
  color: '#2E8B57'
};

const tabContentStyle: React.CSSProperties = {
  minHeight: '400px'
};

const placeholderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '200px',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  border: '2px dashed #ddd',
  color: '#666'
};

const profileCardStyle: React.CSSProperties = {
  backgroundColor: '#f8f9fa',
  padding: '2rem',
  borderRadius: '8px',
  border: '1px solid #e9ecef'
};

const profileInfoStyle: React.CSSProperties = {
  lineHeight: '2'
};

export default Dashboard;
