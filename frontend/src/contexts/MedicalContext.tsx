import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentId: string;
  diagnosis: string;
  prescription: string[];
  notes: string;
  vitalSigns: {
    bloodPressure: string;
    heartRate: number;
    temperature: number;
    weight: number;
    height: number;
  };
  labResults: string[];
  createdAt: string;
  updatedAt: string;
}

interface MedicalContextType {
  medicalRecords: MedicalRecord[];
  addMedicalRecord: (record: Omit<MedicalRecord, 'id' | 'createdAt' | 'updatedAt'>) => void;
  getPatientRecords: (patientId: string) => MedicalRecord[];
  getDoctorRecords: (doctorId: string) => MedicalRecord[];
  updateMedicalRecord: (id: string, updates: Partial<MedicalRecord>) => void;
}

const MedicalContext = createContext<MedicalContextType | undefined>(undefined);

export const MedicalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);

  const addMedicalRecord = (record: Omit<MedicalRecord, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newRecord: MedicalRecord = {
      ...record,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setMedicalRecords(prev => [...prev, newRecord]);
  };

  const getPatientRecords = (patientId: string) => {
    return medicalRecords.filter(record => record.patientId === patientId);
  };

  const getDoctorRecords = (doctorId: string) => {
    return medicalRecords.filter(record => record.doctorId === doctorId);
  };

  const updateMedicalRecord = (id: string, updates: Partial<MedicalRecord>) => {
    setMedicalRecords(prev =>
      prev.map(record =>
        record.id === id
          ? { ...record, ...updates, updatedAt: new Date().toISOString() }
          : record
      )
    );
  };

  const value: MedicalContextType = {
    medicalRecords,
    addMedicalRecord,
    getPatientRecords,
    getDoctorRecords,
    updateMedicalRecord,
  };

  return (
    <MedicalContext.Provider value={value}>
      {children}
    </MedicalContext.Provider>
  );
};

export const useMedical = () => {
  const context = useContext(MedicalContext);
  if (context === undefined) {
    throw new Error('useMedical must be used within a MedicalProvider');
  }
  return context;
};
