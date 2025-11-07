
import React, { useState, useEffect } from 'react';
import { Medication } from '../../types';
import { useAppContext } from '../../contexts/AppContext';
import { PlusIcon } from '../../components/icons/Icons';

interface MedicationFormProps {
  medication: Medication | null;
  onSave: (medication: Medication) => void;
  onCancel: () => void;
}

const MedicationForm: React.FC<MedicationFormProps> = ({ medication, onSave, onCancel }) => {
    const { state: { patients } } = useAppContext();
    const [formData, setFormData] = useState<Medication>({
        id: '',
        name: '',
        dosage: '',
        quantity: '',
        frequency: 'Diaria',
        patientId: '',
        isPermanent: false,
        startDate: '',
        endDate: '',
        schedules: ['08:00'],
        isActive: true,
    });

    useEffect(() => {
        if (medication) {
            setFormData(medication);
        } else {
            setFormData({
                id: '', name: '', dosage: '', quantity: '', frequency: 'Diaria', patientId: '',
                isPermanent: false, startDate: '', endDate: '', schedules: ['08:00'], isActive: true,
            });
        }
    }, [medication]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleScheduleChange = (index: number, value: string) => {
        const newSchedules = [...formData.schedules];
        newSchedules[index] = value;
        setFormData(prev => ({ ...prev, schedules: newSchedules }));
    };

    const addSchedule = () => {
        setFormData(prev => ({ ...prev, schedules: [...prev.schedules, ''] }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Nombre *</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Ej: Paracetamol" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Frecuencia *</label>
                         <select name="frequency" value={formData.frequency} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required>
                            <option>Diaria</option>
                            <option>Cada 12 horas</option>
                            <option>Cada 8 horas</option>
                            <option>Cada 6 horas</option>
                            <option>Semanal</option>
                            <option>Mensual</option>
                         </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Cantidad/Dosis *</label>
                        <input type="text" name="dosage" value={formData.dosage} onChange={handleChange} placeholder="Ej: 500mg" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Asignar a Paciente</label>
                         <select name="patientId" value={formData.patientId} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                            <option value="">Sin asignar</option>
                            {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Fecha de Inicio</label>
                        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" disabled={formData.isPermanent} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Fecha de Término</label>
                        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" disabled={formData.isPermanent} />
                    </div>
                </div>
                <div className="flex items-center">
                    <input type="checkbox" id="isPermanent" name="isPermanent" checked={formData.isPermanent} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                    <label htmlFor="isPermanent" className="ml-2 block text-sm text-gray-900">Tratamiento Permanente</label>
                </div>
                <div>
                     <label className="block text-sm font-medium text-gray-600">Horarios</label>
                     <div className="space-y-2 mt-1">
                        {formData.schedules.map((schedule, index) => (
                            <input key={index} type="time" value={schedule} onChange={(e) => handleScheduleChange(index, e.target.value)} className="block w-full border-gray-300 rounded-md shadow-sm" />
                        ))}
                     </div>
                     <button type="button" onClick={addSchedule} className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1">
                        <PlusIcon className="w-4 h-4" />
                        <span>Agregar horario</span>
                     </button>
                </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-3">
                <button type="button" onClick={onCancel} className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700">Agregar Fármaco</button>
            </div>
        </form>
    );
};

export default MedicationForm;
