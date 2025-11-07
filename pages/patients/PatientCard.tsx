
import React from 'react';
import { Patient } from '../../types';

interface PatientCardProps {
  patient: Patient;
  onEdit: () => void;
  onDelete: () => void;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-800">{patient.name}</h3>
                    <p className="text-gray-500">{patient.age} años • {patient.gender}</p>
                </div>
            </div>
          <div className="flex space-x-2">
            <button onClick={onEdit} className="p-2 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200" aria-label={`Editar ${patient.name}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z" />
              </svg>
            </button>
            <button onClick={onDelete} className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200" aria-label={`Eliminar ${patient.name}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        <div className="mt-6 space-y-3 text-gray-600">
            <div className="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                <span>{patient.phone}</span>
            </div>
            <div className="flex items-center space-x-3">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <span>{patient.email}</span>
            </div>
            <div className="flex items-start space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                {patient.emergencyContact && patient.emergencyContact.name ? (
                     <div>
                        <span className="font-semibold text-sm">Contacto de Emergencia:</span>
                        <p className="text-sm">{patient.emergencyContact.name} ({patient.emergencyContact.relationship})</p>
                        <p className="text-xs text-gray-500">{patient.emergencyContact.phone}</p>
                    </div>
                ) : (
                    <span className="text-sm italic text-gray-500">No hay contacto de emergencia.</span>
                )}
            </div>
        </div>
      </div>
      <div className="bg-gray-50 p-4 border-t space-y-4">
        <div>
            <h4 className="font-semibold text-gray-700 mb-2">Patologías:</h4>
            <div className="flex flex-wrap gap-2">
                {patient.pathologies.length > 0 ? patient.pathologies.map((pathology, index) => (
                    <span key={index} className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{pathology}</span>
                )) : <span className="text-xs text-gray-500">Sin patologías registradas.</span>}
            </div>
        </div>
        {patient.allergies && (
            <div>
                <h4 className="font-semibold text-gray-700 mb-2">Alergias:</h4>
                <div className="flex flex-wrap gap-2">
                    {patient.allergies.split(',').map((allergy, index) => (
                        <span key={index} className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{allergy.trim()}</span>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default PatientCard;