
import React, { useState, useMemo } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { VitalSign } from '../../types';
import Modal from '../../components/Modal';
import VitalSignForm from './VitalSignForm';
import VitalSignRow from './VitalSignRow';
import { PlusIcon } from '../../components/icons/Icons';

const VitalSignsPage: React.FC = () => {
    const { state: { vitalSigns, patients }, addVitalSign, updateVitalSign, deleteVitalSign } = useAppContext();
    const [selectedPatientId, setSelectedPatientId] = useState<string>(patients[0]?.id || '');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingVitalSign, setEditingVitalSign] = useState<VitalSign | null>(null);

    const patientVitals = useMemo(() => {
        return vitalSigns
            .filter(vs => vs.patientId === selectedPatientId)
            .sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());
    }, [vitalSigns, selectedPatientId]);
    
    const handleOpenModal = (vitalSign: VitalSign | null = null) => {
        setEditingVitalSign(vitalSign);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingVitalSign(null);
    };
    
    const handleSaveVitalSign = (vitalSign: VitalSign) => {
        if (editingVitalSign) {
            updateVitalSign(vitalSign);
        } else {
            addVitalSign({ ...vitalSign, id: Date.now().toString(), patientId: selectedPatientId });
        }
        handleCloseModal();
    };

    const handleDeleteVitalSign = (vitalSignId: string) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este registro?')) {
            deleteVitalSign(vitalSignId);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Control de Signos Vitales</h1>
                    <p className="mt-1 text-gray-600">Selecciona un paciente para ver su historial.</p>
                </div>
                 <button
                    onClick={() => handleOpenModal()}
                    disabled={!selectedPatientId}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    <PlusIcon className="w-5 h-5" />
                    <span>Agregar Signo Vital</span>
                </button>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center">
                <select 
                    value={selectedPatientId}
                    onChange={(e) => setSelectedPatientId(e.target.value)}
                    className="border-gray-300 rounded-md shadow-sm w-full max-w-xs"
                >
                    {patients.length > 0 ? (
                        patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)
                    ) : (
                        <option>No hay pacientes</option>
                    )}
                </select>
            </div>

            <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Fecha y Hora</th>
                            <th scope="col" className="px-6 py-3">P. Arterial</th>
                            <th scope="col" className="px-6 py-3">F. Cardiaca</th>
                            <th scope="col" className="px-6 py-3">F. Resp.</th>
                            <th scope="col" className="px-6 py-3">Temp.</th>
                            <th scope="col" className="px-6 py-3">Sat. O2</th>
                            <th scope="col" className="px-6 py-3">HGT</th>
                            <th scope="col" className="px-6 py-3">Observaciones</th>
                            <th scope="col" className="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patientVitals.map(vs => (
                            <VitalSignRow 
                                key={vs.id} 
                                vitalSign={vs} 
                                onEdit={() => handleOpenModal(vs)}
                                onDelete={() => handleDeleteVitalSign(vs.id)}
                            />
                        ))}
                    </tbody>
                </table>
                 {patientVitals.length === 0 && <p className="text-center text-gray-500 py-8">No hay registros de signos vitales para este paciente.</p>}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingVitalSign ? 'Editar Registro de Signos Vitales' : 'Agregar Registro de Signos Vitales'}
            >
                <VitalSignForm 
                    vitalSign={editingVitalSign}
                    onSave={handleSaveVitalSign}
                    onCancel={handleCloseModal}
                />
            </Modal>
        </div>
    );
};

export default VitalSignsPage;
