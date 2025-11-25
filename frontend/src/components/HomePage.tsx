import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section style={heroSectionStyle}>
        <div style={heroContentStyle}>
          <h1 style={heroTitleStyle}>
            Healthcare Access Across All 47 Kenyan Counties
          </h1>
          <p style={heroSubtitleStyle}>
            Connecting patients with doctors through telemedicine. 
            Quality healthcare from the comfort of your home.
          </p>
          <div style={buttonContainerStyle}>
            <button 
              style={primaryButtonStyle}
              onClick={() => window.location.href = '/register'}
            >
              Get Started
            </button>
            <button 
              style={secondaryButtonStyle}
              onClick={() => window.location.href = '/login'}
            >
              I'm a Doctor
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={featuresSectionStyle}>
        <h2 style={featuresTitleStyle}>Why Choose Kenya Telemedicine?</h2>
        <div style={featuresGridStyle}>
          <div style={featureCardStyle}>
            <h3>🏥 County-Wide Coverage</h3>
            <p>Access to healthcare professionals across all 47 Kenyan counties</p>
          </div>
          <div style={featureCardStyle}>
            <h3>💻 Video Consultations</h3>
            <p>Secure video calls with licensed doctors and specialists</p>
          </div>
          <div style={featureCardStyle}>
            <h3>📱 M-Pesa Integration</h3>
            <p>Seamless payments using Kenya's most popular mobile money system</p>
          </div>
          <div style={featureCardStyle}>
            <h3>🕒 24/7 Availability</h3>
            <p>Book appointments at your convenience, anytime day or night</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={howItWorksStyle}>
        <h2 style={sectionTitleStyle}>How It Works</h2>
        <div style={stepsContainerStyle}>
          <div style={stepStyle}>
            <div style={stepNumberStyle}>1</div>
            <h3>Register & Login</h3>
            <p>Create your account as a patient or healthcare provider</p>
          </div>
          <div style={stepStyle}>
            <div style={stepNumberStyle}>2</div>
            <h3>Find a Doctor</h3>
            <p>Search and filter doctors by specialty and county</p>
          </div>
          <div style={stepStyle}>
            <div style={stepNumberStyle}>3</div>
            <h3>Book Appointment</h3>
            <p>Schedule your consultation and make payment via M-Pesa</p>
          </div>
          <div style={stepStyle}>
            <div style={stepNumberStyle}>4</div>
            <h3>Video Consultation</h3>
            <p>Connect with your doctor through our secure video platform</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const heroSectionStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  padding: '4rem 2rem',
  textAlign: 'center',
};

const heroContentStyle: React.CSSProperties = {
  maxWidth: '800px',
  margin: '0 auto',
};

const heroTitleStyle: React.CSSProperties = {
  fontSize: '3rem',
  marginBottom: '1rem',
  fontWeight: 'bold',
};

const heroSubtitleStyle: React.CSSProperties = {
  fontSize: '1.2rem',
  marginBottom: '2rem',
  opacity: 0.9,
};

const buttonContainerStyle: React.CSSProperties = {
  display: 'flex',
  gap: '1rem',
  justifyContent: 'center',
  flexWrap: 'wrap',
};

const primaryButtonStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  color: '#667eea',
  padding: '12px 30px',
  border: 'none',
  borderRadius: '25px',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'transform 0.2s',
};

const secondaryButtonStyle: React.CSSProperties = {
  backgroundColor: 'transparent',
  color: 'white',
  padding: '12px 30px',
  border: '2px solid white',
  borderRadius: '25px',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.2s',
};

const featuresSectionStyle: React.CSSProperties = {
  padding: '4rem 2rem',
  backgroundColor: '#f8f9fa',
};

const featuresTitleStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: '2.5rem',
  marginBottom: '3rem',
  color: '#333',
};

const featuresGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '2rem',
  maxWidth: '1200px',
  margin: '0 auto',
};

const featureCardStyle: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '2rem',
  borderRadius: '10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
};

const howItWorksStyle: React.CSSProperties = {
  padding: '4rem 2rem',
  backgroundColor: 'white',
};

const sectionTitleStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: '2.5rem',
  marginBottom: '3rem',
  color: '#333',
};

const stepsContainerStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '2rem',
  maxWidth: '1000px',
  margin: '0 auto',
};

const stepStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: '1.5rem',
};

const stepNumberStyle: React.CSSProperties = {
  width: '50px',
  height: '50px',
  backgroundColor: '#667eea',
  color: 'white',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  margin: '0 auto 1rem',
};

export default HomePage;
