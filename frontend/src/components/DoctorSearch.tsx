import React, { useState } from 'react';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  county: string;
  experience: string;
  rating: number;
  consultationFee: number;
  availability: string[];
  languages: string[];
  bio: string;
}

const DoctorSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');

  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Wangari Maathai',
      specialization: 'General Physician',
      county: 'Nairobi',
      experience: '15 years',
      rating: 4.8,
      consultationFee: 1500,
      availability: ['Mon-Fri: 9AM-5PM', 'Sat: 9AM-1PM'],
      languages: ['English', 'Kiswahili', 'Kikuyu'],
      bio: 'Experienced general physician with focus on preventive healthcare and chronic disease management.'
    },
    {
      id: '2',
      name: 'Dr. James Kariuki',
      specialization: 'Pediatrician',
      county: 'Nairobi',
      experience: '12 years',
      rating: 4.9,
      consultationFee: 2000,
      availability: ['Mon-Wed: 8AM-4PM', 'Thu-Fri: 10AM-6PM'],
      languages: ['English', 'Kiswahili'],
      bio: 'Pediatric specialist with expertise in child development and vaccination programs.'
    },
    {
      id: '3',
      name: 'Dr. Grace Akinyi',
      specialization: 'Dermatologist',
      county: 'Mombasa',
      experience: '10 years',
      rating: 4.7,
      consultationFee: 1800,
      availability: ['Tue-Thu: 9AM-5PM', 'Sat: 10AM-2PM'],
      languages: ['English', 'Kiswahili', 'Luo'],
      bio: 'Skin care specialist with advanced training in dermatological conditions and cosmetic procedures.'
    },
    {
      id: '4',
      name: 'Dr. Samuel Njoroge',
      specialization: 'Cardiologist',
      county: 'Nakuru',
      experience: '18 years',
      rating: 4.9,
      consultationFee: 2500,
      availability: ['Mon-Tue: 8AM-3PM', 'Wed: 1PM-6PM'],
      languages: ['English', 'Kiswahili'],
      bio: 'Cardiology expert with extensive experience in heart disease prevention and treatment.'
    },
    {
      id: '5',
      name: 'Dr. Amina Mohamed',
      specialization: 'Gynecologist',
      county: 'Nairobi',
      experience: '14 years',
      rating: 4.8,
      consultationFee: 2200,
      availability: ['Mon-Fri: 9AM-4PM'],
      languages: ['English', 'Kiswahili', 'Somali'],
      bio: "Women's health specialist focusing on reproductive health and prenatal care."
    },
    {
      id: '6',
      name: 'Dr. Peter Omondi',
      specialization: 'Orthopedic Surgeon',
      county: 'Kisumu',
      experience: '16 years',
      rating: 4.7,
      consultationFee: 3000,
      availability: ['Mon-Wed: 8AM-5PM', 'Fri: 9AM-3PM'],
      languages: ['English', 'Kiswahili', 'Luo'],
      bio: 'Orthopedic specialist with expertise in joint replacement and sports injuries.'
    }
  ];

  const specializations = Array.from(new Set(doctors.map(doc => doc.specialization)));
  const counties = Array.from(new Set(doctors.map(doc => doc.county)));

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCounty = !selectedCounty || doctor.county === selectedCounty;
    const matchesSpecialization = !selectedSpecialization || doctor.specialization === selectedSpecialization;
    
    return matchesSearch && matchesCounty && matchesSpecialization;
  });

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2>Find Healthcare Providers</h2>
        
        {/* Search and Filters */}
        <div style={filtersStyle}>
          <input
            type="text"
            placeholder="Search by doctor name or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={searchInputStyle}
          />
          
          <select
            value={selectedCounty}
            onChange={(e) => setSelectedCounty(e.target.value)}
            style={selectStyle}
          >
            <option value="">All Counties</option>
            {counties.map(county => (
              <option key={county} value={county}>{county}</option>
            ))}
          </select>
          
          <select
            value={selectedSpecialization}
            onChange={(e) => setSelectedSpecialization(e.target.value)}
            style={selectStyle}
          >
            <option value="">All Specializations</option>
            {specializations.map(spec => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
        </div>

        {/* Results */}
        <div style={resultsStyle}>
          {filteredDoctors.length === 0 ? (
            <div style={noResultsStyle}>
              <p>No doctors found matching your criteria.</p>
            </div>
          ) : (
            <div style={doctorsGridStyle}>
              {filteredDoctors.map(doctor => (
                <div key={doctor.id} style={doctorCardStyle}>
                  <div style={doctorHeaderStyle}>
                    <h3>{doctor.name}</h3>
                    <span style={ratingStyle}>⭐ {doctor.rating}</span>
                  </div>
                  
                  <div style={doctorInfoStyle}>
                    <p><strong>Specialization:</strong> {doctor.specialization}</p>
                    <p><strong>County:</strong> {doctor.county}</p>
                    <p><strong>Experience:</strong> {doctor.experience}</p>
                    <p><strong>Consultation Fee:</strong> KSh {doctor.consultationFee}</p>
                    
                    <div style={languagesStyle}>
                      <strong>Languages:</strong> {doctor.languages.join(', ')}
                    </div>
                    
                    <div style={availabilityStyle}>
                      <strong>Availability:</strong>
                      {doctor.availability.map((slot, index) => (
                        <div key={index} style={timeSlotStyle}>{slot}</div>
                      ))}
                    </div>
                    
                    <div style={bioStyle}>
                      <p>{doctor.bio}</p>
                    </div>
                  </div>
                  
                  <button style={bookButtonStyle}>
                    Book Consultation
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  padding: '1rem'
};

const cardStyle: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  maxWidth: '1200px',
  margin: '0 auto'
};

const filtersStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '2fr 1fr 1fr',
  gap: '1rem',
  marginBottom: '2rem'
};

const searchInputStyle: React.CSSProperties = {
  padding: '0.75rem',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '1rem'
};

const selectStyle: React.CSSProperties = {
  padding: '0.75rem',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '1rem'
};

const resultsStyle: React.CSSProperties = {
  marginTop: '1rem'
};

const noResultsStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: '2rem',
  color: '#666'
};

const doctorsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
  gap: '1.5rem'
};

const doctorCardStyle: React.CSSProperties = {
  border: '1px solid #e9ecef',
  borderRadius: '8px',
  padding: '1.5rem',
  backgroundColor: '#f8f9fa',
  transition: 'transform 0.2s ease'
};

const doctorHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1rem',
  borderBottom: '2px solid #2E8B57',
  paddingBottom: '0.5rem'
};

const ratingStyle: React.CSSProperties = {
  backgroundColor: '#2E8B57',
  color: 'white',
  padding: '0.25rem 0.5rem',
  borderRadius: '4px',
  fontSize: '0.9rem'
};

const doctorInfoStyle: React.CSSProperties = {
  marginBottom: '1rem'
};

const languagesStyle: React.CSSProperties = {
  margin: '0.5rem 0',
  fontSize: '0.9rem'
};

const availabilityStyle: React.CSSProperties = {
  margin: '0.5rem 0'
};

const timeSlotStyle: React.CSSProperties = {
  backgroundColor: '#e8f5e8',
  padding: '0.25rem 0.5rem',
  borderRadius: '4px',
  fontSize: '0.8rem',
  margin: '0.25rem 0',
  display: 'inline-block',
  marginRight: '0.5rem'
};

const bioStyle: React.CSSProperties = {
  marginTop: '1rem',
  padding: '1rem',
  backgroundColor: 'white',
  borderRadius: '4px',
  borderLeft: '3px solid #2E8B57'
};

const bookButtonStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem',
  backgroundColor: '#2E8B57',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontSize: '1rem',
  cursor: 'pointer',
  fontWeight: 'bold'
};

export default DoctorSearch;
