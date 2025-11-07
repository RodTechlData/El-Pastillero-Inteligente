
import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import PatientCard from './PatientCard';
import Modal from '../../components/Modal';
import PatientForm from './PatientForm';
import { Patient } from '../../types';
import { PlusIcon } from '../../components/icons/Icons';

const PatientsPage: React.FC = () => {
  const { state: { patients }, addPatient, updatePatient, deletePatient } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

  const handleOpenModal = (patient: Patient | null = null) => {
    setEditingPatient(patient);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPatient(null);
  };

  const handleSavePatient = (patient: Patient) => {
    if (editingPatient) {
      updatePatient(patient);
    } else {
      addPatient({ ...patient, id: Date.now().toString() });
    }
    handleCloseModal();
  };

  const handleDeletePatient = (patientId: string) => {
    if(window.confirm('¿Estás seguro de que quieres eliminar este paciente?')) {
        deletePatient(patientId);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gestión de Pacientes</h1>
          <p className="mt-1 text-gray-600">Administra la información de los pacientes y sus tratamientos.</p>
        </div>
        <button
            onClick={() => handleOpenModal()}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
            <PlusIcon className="w-5 h-5" />
            <span>Nuevo Paciente</span>
        </button>
      </div>

      {patients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patients.map(patient => (
            <PatientCard 
              key={patient.id} 
              patient={patient} 
              onEdit={() => handleOpenModal(patient)}
              onDelete={() => handleDeletePatient(patient.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500">No hay pacientes registrados.</p>
          <p className="text-gray-500 mt-2">Haz clic en "Nuevo Paciente" para empezar.</p>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingPatient ? 'Editar Paciente' : 'Agregar Nuevo Paciente'}
      >
        <PatientForm
          patient={editingPatient}
          onSave={handleSavePatient}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default PatientsPage;
