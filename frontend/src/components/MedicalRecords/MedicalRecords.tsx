import React from 'react';
import { useMedical } from '../../contexts/MedicalContext';
import { useAuth } from '../../context/AuthContext';

const MedicalRecords: React.FC = () => {
  const { user } = useAuth();
  const { getPatientRecords, getDoctorRecords } = useMedical();

  const userRecords = user?.userType === 'patient' 
    ? getPatientRecords(user.id)
    : user?.userType === 'doctor' 
    ? getDoctorRecords(user.id)
    : [];

  return (
    <div className="medical-records">
      <h2>Medical Records</h2>
      
      {userRecords.length === 0 ? (
        <p>No medical records found.</p>
      ) : (
        <div className="records-list">
          {userRecords.map(record => (
            <div key={record.id} className="record-card">
              <h3>Diagnosis: {record.diagnosis}</h3>
              <p><strong>Date:</strong> {new Date(record.createdAt).toLocaleDateString()}</p>
              <p><strong>Vital Signs:</strong></p>
              <ul>
                <li>Blood Pressure: {record.vitalSigns.bloodPressure}</li>
                <li>Heart Rate: {record.vitalSigns.heartRate} bpm</li>
                <li>Temperature: {record.vitalSigns.temperature}°C</li>
              </ul>
              <p><strong>Prescription:</strong> {record.prescription.join(', ')}</p>
              <p><strong>Notes:</strong> {record.notes}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicalRecords;
