
import React, { useState, useMemo } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import MedicationListItem from './MedicationListItem';
import Modal from '../../components/Modal';
import MedicationForm from './MedicationForm';
import { Medication } from '../../types';
import { PlusIcon } from '../../components/icons/Icons';

const MedicationsPage: React.FC = () => {
  const { state: { medications, patients }, addMedication, updateMedication, deleteMedication } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMedication, setEditingMedication] = useState<Medication | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState('all');
  const [showOnlyActive, setShowOnlyActive] = useState(false);

  const filteredMedications = useMemo(() => {
    return medications.filter(med => {
      const patient = patients.find(p => p.id === med.patientId);
      const patientName = patient ? patient.name : 'Sin asignar';

      const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPatient = selectedPatient === 'all' || med.patientId === selectedPatient;
      const matchesActive = !showOnlyActive || med.isActive;
      
      return matchesSearch && matchesPatient && matchesActive;
    });
  }, [medications, patients, searchTerm, selectedPatient, showOnlyActive]);


  const handleOpenModal = (medication: Medication | null = null) => {
    setEditingMedication(medication);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMedication(null);
  };

  const handleSaveMedication = (medication: Medication) => {
    if (editingMedication) {
      updateMedication(medication);
    } else {
      addMedication({ ...medication, id: Date.now().toString() });
    }
    handleCloseModal();
  };
  
  const handleDeleteMedication = (medicationId: string) => {
    if(window.confirm('¿Estás seguro de que quieres eliminar este medicamento?')) {
        deleteMedication(medicationId);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gestión de Medicamentos</h1>
          <p className="mt-1 text-gray-600">Filtra y administra los fármacos de tus pacientes.</p>
        </div>
        <button
            onClick={() => handleOpenModal()}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
            <PlusIcon className="w-5 h-5" />
            <span>Agregar Fármaco</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <h3 className="font-semibold text-gray-700 mb-2">Filtros</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <input 
                type="text" 
                placeholder="Buscar por nombre..." 
                className="w-full border-gray-300 rounded-md shadow-sm"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <select 
                className="w-full border-gray-300 rounded-md shadow-sm"
                value={selectedPatient}
                onChange={e => setSelectedPatient(e.target.value)}
            >
                <option value="all">Todos los pacientes</option>
                {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <div className="flex items-center">
                <input 
                    type="checkbox" 
                    id="active-only" 
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    checked={showOnlyActive}
                    onChange={e => setShowOnlyActive(e.target.checked)}
                />
                <label htmlFor="active-only" className="ml-2 block text-sm text-gray-900">Solo activos</label>
            </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredMedications.map(med => (
          <MedicationListItem 
            key={med.id} 
            medication={med} 
            patientName={patients.find(p => p.id === med.patientId)?.name || 'Sin asignar'}
            onEdit={() => handleOpenModal(med)}
            onDelete={() => handleDeleteMedication(med.id)}
            onToggleActive={(isActive) => updateMedication({...med, isActive})}
          />
        ))}
        {filteredMedications.length === 0 && <p className="text-center text-gray-500 py-8">No se encontraron medicamentos con los filtros actuales.</p>}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingMedication ? 'Editar Fármaco' : 'Agregar Nuevo Fármaco'}
      >
        <MedicationForm
          medication={editingMedication}
          onSave={handleSaveMedication}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default MedicationsPage;
