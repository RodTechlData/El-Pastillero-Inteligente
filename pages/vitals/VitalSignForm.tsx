
import React, { useState, useEffect } from 'react';
import { VitalSign } from '../../types';

interface VitalSignFormProps {
    vitalSign: VitalSign | null;
    onSave: (vitalSign: Omit<VitalSign, 'id' | 'patientId'>) => void;
    onCancel: () => void;
}

const VitalSignForm: React.FC<VitalSignFormProps> = ({ vitalSign, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        dateTime: new Date().toISOString().slice(0, 16),
        systolic: '',
        diastolic: '',
        heartRate: '',
        respiratoryRate: '',
        temperature: '',
        oxygenSaturation: '',
        bloodGlucose: '',
        observations: '',
    });

    useEffect(() => {
        if (vitalSign) {
            const [systolic, diastolic] = vitalSign.bloodPressure.split('/');
            setFormData({
                dateTime: vitalSign.dateTime,
                systolic: systolic || '',
                diastolic: diastolic || '',
                heartRate: vitalSign.heartRate,
                respiratoryRate: vitalSign.respiratoryRate,
                temperature: vitalSign.temperature,
                oxygenSaturation: vitalSign.oxygenSaturation,
                bloodGlucose: vitalSign.bloodGlucose,
                observations: vitalSign.observations,
            });
        }
    }, [vitalSign]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const dataToSave = {
            ...formData,
            bloodPressure: `${formData.systolic}/${formData.diastolic}`,
        };
        // Omit systolic and diastolic from the final object
        const {systolic, diastolic, ...rest} = dataToSave;
        onSave(rest);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600">Fecha y Hora</label>
                    <input type="datetime-local" name="dateTime" value={formData.dateTime} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Presión Arterial (Sist/Diast)</label>
                        <div className="flex items-center mt-1">
                            <input type="number" name="systolic" value={formData.systolic} onChange={handleChange} placeholder="Sistólica" className="w-full border-gray-300 rounded-l-md shadow-sm" />
                            <span className="inline-flex items-center px-3 border-t border-b border-gray-300 bg-gray-50 text-gray-500">/</span>
                            <input type="number" name="diastolic" value={formData.diastolic} onChange={handleChange} placeholder="Diastólica" className="w-full border-gray-300 rounded-r-md shadow-sm" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Frecuencia Cardiaca (lat/min)</label>
                        <input type="number" name="heartRate" value={formData.heartRate} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">F. Respiratoria</label>
                        <input type="number" name="respiratoryRate" value={formData.respiratoryRate} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Temperatura (°C)</label>
                        <input type="number" step="0.1" name="temperature" value={formData.temperature} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Saturación O2 (%)</label>
                        <input type="number" name="oxygenSaturation" value={formData.oxygenSaturation} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">HGT (mg/dL)</label>
                        <input type="number" name="bloodGlucose" value={formData.bloodGlucose} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600">Observaciones</label>
                    <textarea name="observations" value={formData.observations} onChange={handleChange} rows={3} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"></textarea>
                </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-3">
                <button type="button" onClick={onCancel} className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700">Guardar Registro</button>
            </div>
        </form>
    );
};

export default VitalSignForm;
