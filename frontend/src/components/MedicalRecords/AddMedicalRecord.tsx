import React, { useState } from 'react';
import { useMedical } from '../../contexts/MedicalContext';
import { useAuth } from '../../context/AuthContext';

interface AddMedicalRecordProps {
  appointmentId: string;
  patientId: string;
  onSuccess: () => void;
}

const AddMedicalRecord: React.FC<AddMedicalRecordProps> = ({ 
  appointmentId, 
  patientId, 
  onSuccess 
}) => {
  const { user } = useAuth();
  const { addMedicalRecord } = useMedical();
  const [formData, setFormData] = useState({
    diagnosis: '',
    prescription: [''],
    notes: '',
    vitalSigns: {
      bloodPressure: '',
      heartRate: 80,
      temperature: 37,
      weight: 70,
      height: 170
    },
    labResults: ['']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (user?.userType === 'doctor') {
      addMedicalRecord({
        patientId,
        doctorId: user.id,
        appointmentId,
        diagnosis: formData.diagnosis,
        prescription: formData.prescription.filter(p => p.trim() !== ''),
        notes: formData.notes,
        vitalSigns: formData.vitalSigns,
        labResults: formData.labResults.filter(l => l.trim() !== '')
      });
      
      onSuccess();
    }
  };

  const addPrescription = () => {
    setFormData(prev => ({
      ...prev,
      prescription: [...prev.prescription, '']
    }));
  };

  const updatePrescription = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      prescription: prev.prescription.map((p, i) => i === index ? value : p)
    }));
  };

  return (
    <div className="add-medical-record">
      <h3>Add Medical Record</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Diagnosis:</label>
          <input
            type="text"
            value={formData.diagnosis}
            onChange={(e) => setFormData(prev => ({ ...prev, diagnosis: e.target.value }))}
            required
          />
        </div>

        <div className="form-group">
          <label>Vital Signs:</label>
          <div className="vital-signs-grid">
            <input
              type="text"
              placeholder="Blood Pressure"
              value={formData.vitalSigns.bloodPressure}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                vitalSigns: { ...prev.vitalSigns, bloodPressure: e.target.value }
              }))}
            />
            <input
              type="number"
              placeholder="Heart Rate"
              value={formData.vitalSigns.heartRate}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                vitalSigns: { ...prev.vitalSigns, heartRate: parseInt(e.target.value) }
              }))}
            />
            <input
              type="number"
              step="0.1"
              placeholder="Temperature"
              value={formData.vitalSigns.temperature}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                vitalSigns: { ...prev.vitalSigns, temperature: parseFloat(e.target.value) }
              }))}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Prescription:</label>
          {formData.prescription.map((med, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Medication ${index + 1}`}
              value={med}
              onChange={(e) => updatePrescription(index, e.target.value)}
            />
          ))}
          <button type="button" onClick={addPrescription}>
            Add Medication
          </button>
        </div>

        <div className="form-group">
          <label>Notes:</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            rows={3}
          />
        </div>

        <button type="submit">Save Medical Record</button>
      </form>
    </div>
  );
};

export default AddMedicalRecord;
