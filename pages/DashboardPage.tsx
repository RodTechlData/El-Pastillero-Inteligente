
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon } from '../components/icons/Icons';
import Modal from '../components/Modal';
import { useAppContext } from '../contexts/AppContext';

const DashboardCard: React.FC<{
  to: string;
  icon: React.ReactNode;
  title: string;
}> = ({ to, icon, title }) => (
  <Link to={to} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center space-x-4">
    <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center">
      <span className="text-3xl" role="img" aria-label={title}>{icon}</span>
    </div>
    <span className="text-lg font-medium text-gray-700">{title}</span>
  </Link>
);

const DashboardPage: React.FC = () => {
    const { state: { patients } } = useAppContext();
    const [isSOSModalOpen, setIsSOSModalOpen] = useState(false);
    const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || '');

    const handleLifeButtonClick = () => {
        if (patients.length > 0 && !selectedPatientId) {
            setSelectedPatientId(patients[0].id);
        }
        setIsSOSModalOpen(true);
    };

    const handleCloseSOSModal = () => {
        setIsSOSModalOpen(false);
    };
    
    const selectedPatient = patients.find(p => p.id === selectedPatientId);
    const emergencyContact = selectedPatient?.emergencyContact;

    const handleCall = () => {
        if (emergencyContact?.phone) {
            window.location.href = `tel:${emergencyContact.phone}`;
        }
    };

  return (
    <div className="flex flex-col items-center">
      <div className="my-8 text-center">
        <button 
            onClick={handleLifeButtonClick}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-48 h-48 flex flex-col justify-center items-center shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
            aria-label="Botón de Vida para llamada de emergencia"
        >
          <HeartIcon className="w-16 h-16" />
          <span className="mt-2 text-xl font-bold">Botón de Vida</span>
        </button>
      </div>

      <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard to="/patients" icon="👥" title="Pacientes" />
        <DashboardCard to="/medications" icon="💊" title="Medicamentos" />
        <DashboardCard to="/vitals" icon="📊" title="Signos Vitales" />
        <DashboardCard to="/appointments" icon="🗓️" title="Agenda Médica" />
        <DashboardCard to="/pharmacy" icon="🏥" title="Buscar Farmacia" />
        <DashboardCard to="/settings" icon="⚙️" title="Ajustes" />
      </div>

      <Modal isOpen={isSOSModalOpen} onClose={handleCloseSOSModal} title="Llamada de Emergencia SOS">
        <div className="p-6">
          {patients.length > 0 ? (
            <div className="space-y-4">
              <div>
                <label htmlFor="patient-select" className="block text-sm font-medium text-gray-700">Seleccionar Paciente</label>
                <select
                  id="patient-select"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={selectedPatientId}
                  onChange={(e) => setSelectedPatientId(e.target.value)}
                >
                  {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>

              {emergencyContact && emergencyContact.name && emergencyContact.phone ? (
                <div className="text-center space-y-4 pt-4">
                  <p className="text-lg text-gray-600">Se llamará al contacto de emergencia de <span className="font-bold">{selectedPatient?.name}</span>:</p>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <p className="text-2xl font-bold text-blue-800">{emergencyContact.name}</p>
                    <p className="text-lg text-blue-700">{emergencyContact.relationship}</p>
                    <p className="text-lg text-gray-700 mt-2 flex items-center justify-center space-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C6.477 18 2 13.523 2 8V3z" /></svg>
                      <span>{emergencyContact.phone}</span>
                    </p>
                  </div>
                  <button
                    onClick={handleCall}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-4 rounded-lg text-xl shadow-lg flex items-center justify-center space-x-3 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C6.477 18 2 13.523 2 8V3z" /></svg>
                    <span>LLAMAR AHORA</span>
                  </button>
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">No hay un contacto de emergencia configurado para <span className="font-bold">{selectedPatient?.name}</span>.</p>
                  <Link to="/patients" onClick={handleCloseSOSModal} className="text-blue-600 hover:underline mt-2 inline-block">Configurar ahora</Link>
                </div>
              )}

            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No hay pacientes registrados.</p>
              <Link to="/patients" onClick={handleCloseSOSModal} className="text-blue-600 hover:underline mt-2 inline-block">Agregar un paciente</Link>
            </div>
          )}
        </div>
        <div className="bg-gray-50 px-6 py-3 flex justify-end">
          <button type="button" onClick={handleCloseSOSModal} className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Cerrar</button>
        </div>
      </Modal>
    </div>
  );
};

export default DashboardPage;
