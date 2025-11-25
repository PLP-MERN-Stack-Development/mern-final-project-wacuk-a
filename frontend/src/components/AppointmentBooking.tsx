import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  county: string;
  experience: string;
  rating: number;
  consultationFee: number;
}

const AppointmentBooking: React.FC = () => {
  const { user } = useAuth();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Mock doctors data
  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Wangari Maathai',
      specialization: 'General Physician',
      county: 'Nairobi',
      experience: '15 years',
      rating: 4.8,
      consultationFee: 1500
    },
    {
      id: '2',
      name: 'Dr. James Kariuki',
      specialization: 'Pediatrician',
      county: 'Nairobi',
      experience: '12 years',
      rating: 4.9,
      consultationFee: 2000
    },
    {
      id: '3',
      name: 'Dr. Grace Akinyi',
      specialization: 'Dermatologist',
      county: 'Mombasa',
      experience: '10 years',
      rating: 4.7,
      consultationFee: 1800
    },
    {
      id: '4',
      name: 'Dr. Samuel Njoroge',
      specialization: 'Cardiologist',
      county: 'Nakuru',
      experience: '18 years',
      rating: 4.9,
      consultationFee: 2500
    }
  ];

  const availableTimes = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const handleBookAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor || !appointmentDate || !appointmentTime) {
      alert('Please fill all required fields');
      return;
    }

    setIsBooking(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setBookingSuccess(true);
    setIsBooking(false);
    
    // Reset form after success
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedDoctor(null);
      setAppointmentDate('');
      setAppointmentTime('');
      setSymptoms('');
    }, 3000);
  };

  const filteredDoctors = doctors.filter(doctor => 
    doctor.county === user?.county || user?.county === 'Nairobi'
  );

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2>Book an Appointment</h2>
        
        {bookingSuccess && (
          <div style={successStyle}>
            ✅ Appointment booked successfully! You will receive a confirmation SMS.
          </div>
        )}

        <div style={contentStyle}>
          {/* Doctor Selection */}
          <div style={sectionStyle}>
            <h3>Select a Doctor</h3>
            <div style={doctorsGridStyle}>
              {filteredDoctors.map(doctor => (
                <div
                  key={doctor.id}
                  style={{
                    ...doctorCardStyle,
                    border: selectedDoctor?.id === doctor.id ? '3px solid #2E8B57' : '1px solid #ddd'
                  }}
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  <h4>{doctor.name}</h4>
                  <p><strong>Specialization:</strong> {doctor.specialization}</p>
                  <p><strong>County:</strong> {doctor.county}</p>
                  <p><strong>Experience:</strong> {doctor.experience}</p>
                  <p><strong>Rating:</strong> ⭐ {doctor.rating}</p>
                  <p><strong>Fee:</strong> KSh {doctor.consultationFee}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Appointment Form */}
          {selectedDoctor && (
            <div style={sectionStyle}>
              <h3>Appointment Details with {selectedDoctor.name}</h3>
              <form onSubmit={handleBookAppointment} style={formStyle}>
                <div style={inputGroupStyle}>
                  <label>Date:</label>
                  <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    style={inputStyle}
                  />
                </div>

                <div style={inputGroupStyle}>
                  <label>Time:</label>
                  <select
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    required
                    style={inputStyle}
                  >
                    <option value="">Select time</option>
                    {availableTimes.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                <div style={inputGroupStyle}>
                  <label>Symptoms/Reason for visit:</label>
                  <textarea
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="Describe your symptoms or reason for consultation..."
                    rows={4}
                    style={{...inputStyle, resize: 'vertical'}}
                  />
                </div>

                <div style={summaryStyle}>
                  <h4>Appointment Summary</h4>
                  <p><strong>Doctor:</strong> {selectedDoctor.name}</p>
                  <p><strong>Specialization:</strong> {selectedDoctor.specialization}</p>
                  <p><strong>Consultation Fee:</strong> KSh {selectedDoctor.consultationFee}</p>
                  <p><strong>Date:</strong> {appointmentDate}</p>
                  <p><strong>Time:</strong> {appointmentTime}</p>
                </div>

                <button 
                  type="submit" 
                  style={isBooking ? { ...buttonStyle, ...disabledButtonStyle } : buttonStyle}
                  disabled={isBooking}
                >
                  {isBooking ? 'Booking Appointment...' : 'Confirm Appointment & Pay via M-Pesa'}
                </button>
              </form>
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
  maxWidth: '1000px',
  margin: '0 auto'
};

const contentStyle: React.CSSProperties = {
  display: 'grid',
  gap: '2rem'
};

const sectionStyle: React.CSSProperties = {
  padding: '1.5rem',
  border: '1px solid #e9ecef',
  borderRadius: '8px'
};

const doctorsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '1rem',
  marginTop: '1rem'
};

const doctorCardStyle: React.CSSProperties = {
  padding: '1.5rem',
  border: '1px solid #ddd',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  backgroundColor: '#f8f9fa'
};

const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};

const inputGroupStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
};

const inputStyle: React.CSSProperties = {
  padding: '0.75rem',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '1rem'
};

const buttonStyle: React.CSSProperties = {
  padding: '1rem',
  backgroundColor: '#2E8B57',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontSize: '1rem',
  cursor: 'pointer',
  fontWeight: 'bold'
};

const disabledButtonStyle: React.CSSProperties = {
  backgroundColor: '#cccccc',
  cursor: 'not-allowed'
};

const summaryStyle: React.CSSProperties = {
  backgroundColor: '#e8f5e8',
  padding: '1.5rem',
  borderRadius: '8px',
  border: '1px solid #2E8B57'
};

const successStyle: React.CSSProperties = {
  backgroundColor: '#d4edda',
  color: '#155724',
  padding: '1rem',
  borderRadius: '4px',
  marginBottom: '1rem',
  border: '1px solid #c3e6cb'
};

export default AppointmentBooking;
