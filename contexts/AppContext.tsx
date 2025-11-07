
import React, { createContext, useContext, ReactNode } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { initialData } from '../data';
import { AppState, AppContextType, Patient, Medication, VitalSign } from '../types';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useLocalStorage<AppState>('app-data', initialData);

  const addPatient = (patient: Patient) => {
    setState(prevState => ({
      ...prevState,
      patients: [...prevState.patients, patient],
    }));
  };

  const updatePatient = (updatedPatient: Patient) => {
    setState(prevState => ({
      ...prevState,
      patients: prevState.patients.map(p => p.id === updatedPatient.id ? updatedPatient : p),
    }));
  };

  const deletePatient = (patientId: string) => {
    setState(prevState => ({
      ...prevState,
      patients: prevState.patients.filter(p => p.id !== patientId),
    }));
  };

  const addMedication = (medication: Medication) => {
    setState(prevState => ({
      ...prevState,
      medications: [...prevState.medications, medication],
    }));
  };
  
  const updateMedication = (updatedMedication: Medication) => {
    setState(prevState => ({
      ...prevState,
      medications: prevState.medications.map(m => m.id === updatedMedication.id ? updatedMedication : m),
    }));
  };

  const deleteMedication = (medicationId: string) => {
     setState(prevState => ({
      ...prevState,
      medications: prevState.medications.filter(m => m.id !== medicationId),
    }));
  };

  const addVitalSign = (vitalSign: VitalSign) => {
    setState(prevState => ({
      ...prevState,
      vitalSigns: [...prevState.vitalSigns, vitalSign],
    }));
  };

  const updateVitalSign = (updatedVitalSign: VitalSign) => {
     setState(prevState => ({
      ...prevState,
      vitalSigns: prevState.vitalSigns.map(v => v.id === updatedVitalSign.id ? updatedVitalSign : v),
    }));
  };

  const deleteVitalSign = (vitalSignId: string) => {
    setState(prevState => ({
      ...prevState,
      vitalSigns: prevState.vitalSigns.filter(v => v.id !== vitalSignId),
    }));
  };

  const value = {
    state,
    addPatient,
    updatePatient,
    deletePatient,
    addMedication,
    updateMedication,
    deleteMedication,
    addVitalSign,
    updateVitalSign,
    deleteVitalSign,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
