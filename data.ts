
import { Patient, Medication, VitalSign } from './types';

export const initialPatients: Patient[] = [
  {
    id: '1',
    name: 'Ana García',
    age: 72,
    gender: 'Femenino',
    phone: '+56987654321',
    email: 'ana.garcia@example.com',
    pathologies: ['Hipertensión', 'Diabetes Tipo 2'],
    allergies: 'Penicilina',
    emergencyContact: {
      name: 'Carlos García',
      phone: '+56912345678',
      relationship: 'Hijo',
      email: 'carlos.garcia@example.com',
      whatsapp: '+56912345678',
    }
  },
  {
    id: '2',
    name: 'Juan Martinez',
    age: 65,
    gender: 'Masculino',
    phone: '+56911223344',
    email: 'juan.martinez@example.com',
    pathologies: ['Artritis'],
    allergies: 'AINEs (Ibuprofeno)',
    emergencyContact: {
        name: 'Maria Martinez',
        phone: '+56987654321',
        relationship: 'Hija',
    }
  },
];

export const initialMedications: Medication[] = [
  {
    id: 'med1',
    patientId: '1',
    name: 'Losartán 50mg',
    dosage: '50mg',
    quantity: '1 comprimido',
    schedules: ['08:00'],
    isPermanent: true,
    isActive: true,
  },
  {
    id: 'med2',
    patientId: '1',
    name: 'Metformina 850mg',
    dosage: '850mg',
    quantity: '1 comprimido',
    schedules: ['09:00', '21:00'],
    isPermanent: true,
    isActive: true,
  },
  {
    id: 'med3',
    patientId: '2',
    name: 'Paracetamol 500mg',
    dosage: '500mg',
    quantity: '1 comprimido',
    schedules: ['07:00', '15:00', '23:00'],
    isPermanent: false,
    startDate: '2023-10-01',
    endDate: '2023-10-07',
    isActive: false,
  },
];

export const initialVitalSigns: VitalSign[] = [
    {
        id: 'vs1',
        patientId: '1',
        dateTime: '2023-10-26T05:00',
        bloodPressure: '130/85',
        heartRate: '75',
        respiratoryRate: '16',
        temperature: '36.8',
        oxygenSaturation: '98',
        bloodGlucose: '110',
        observations: 'Medición matutina de rutina.',
    },
    {
        id: 'vs2',
        patientId: '2',
        dateTime: '2023-10-26T08:30',
        bloodPressure: '125/80',
        heartRate: '70',
        respiratoryRate: '18',
        temperature: '37.0',
        oxygenSaturation: '97',
        bloodGlucose: '95',
        observations: 'Paciente se siente bien.',
    }
];

export const initialData = {
    patients: initialPatients,
    medications: initialMedications,
    vitalSigns: initialVitalSigns,
};