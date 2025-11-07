
export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
  email?: string;
  whatsapp?: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Femenino' | 'Masculino' | 'Otro';
  phone: string;
  email: string;
  pathologies: string[];
  allergies?: string;
  emergencyContact?: EmergencyContact;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  schedules: string[];
  isPermanent: boolean;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
  patientId?: string;
  quantity: string;
}

export interface VitalSign {
  id: string;
  patientId: string;
  dateTime: string;
  bloodPressure: string;
  heartRate: string;
  respiratoryRate: string;
  temperature: string;
  oxygenSaturation: string;
  bloodGlucose: string;
  observations: string;
}

export type AppState = {
  patients: Patient[];
  medications: Medication[];
  vitalSigns: VitalSign[];
};

export type AppContextType = {
  state: AppState;
  addPatient: (patient: Patient) => void;
  updatePatient: (patient: Patient) => void;
  deletePatient: (patientId: string) => void;
  addMedication: (medication: Medication) => void;
  updateMedication: (medication: Medication) => void;
  deleteMedication: (medicationId: string) => void;
  addVitalSign: (vitalSign: VitalSign) => void;
  updateVitalSign: (vitalSign: VitalSign) => void;
  deleteVitalSign: (vitalSignId: string) => void;
};