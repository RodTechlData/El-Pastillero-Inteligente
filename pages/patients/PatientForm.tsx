
import React, { useState, useEffect } from 'react';
import { Patient, EmergencyContact } from '../../types';

interface PatientFormProps {
  patient: Patient | null;
  onSave: (patient: Patient) => void;
  onCancel: () => void;
}

const getInitialFormData = (): Patient => ({
    id: '',
    name: '',
    age: 0,
    gender: 'Femenino',
    phone: '',
    email: '',
    pathologies: [],
    allergies: '',
    emergencyContact: {
        name: '',
        phone: '',
        relationship: '',
        email: '',
        whatsapp: '',
    },
});

const PatientForm: React.FC<PatientFormProps> = ({ patient, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Patient>(getInitialFormData());

  useEffect(() => {
    if (patient) {
        setFormData({
            ...patient,
            emergencyContact: patient.emergencyContact || getInitialFormData().emergencyContact,
        });
    } else {
        setFormData(getInitialFormData());
    }
  }, [patient]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'age' ? parseInt(value) || 0 : value }));
  };
  
  const handleEmergencyContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      emergencyContact: {
        ...(prev.emergencyContact as EmergencyContact),
        [name]: value,
      },
    }));
  };

  const handlePathologyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pathologies = e.target.value.split(',').map(p => p.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, pathologies }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const contact = formData.emergencyContact;
    const isContactEmpty = contact && !contact.name && !contact.phone && !contact.relationship;
    
    onSave({
        ...formData,
        emergencyContact: isContactEmpty ? undefined : contact,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-6">
            <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-2">Información Básica</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-600">Nombre Completo *</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Ej: Juan Pérez" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Edad *</label>
                        <input type="number" name="age" value={formData.age || ''} onChange={handleChange} placeholder="Ej: 65" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Sexo *</label>
                        <select name="gender" value={formData.gender} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required>
                            <option>Femenino</option>
                            <option>Masculino</option>
                            <option>Otro</option>
                        </select>
                    </div>
                </div>
            </div>
            <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-2">Información de Contacto</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Teléfono</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Ej: +56912345678" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Ej: juan.perez@example.com" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                </div>
            </div>
            <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-2">Contacto de Emergencia</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Nombre</label>
                        <input type="text" name="name" value={formData.emergencyContact?.name || ''} onChange={handleEmergencyContactChange} placeholder="Ej: Carlos García" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Relación</label>
                        <input type="text" name="relationship" value={formData.emergencyContact?.relationship || ''} onChange={handleEmergencyContactChange} placeholder="Ej: Hijo/a" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Teléfono</label>
                        <input type="tel" name="phone" value={formData.emergencyContact?.phone || ''} onChange={handleEmergencyContactChange} placeholder="Ej: +56987654321" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Email</label>
                        <input type="email" name="email" value={formData.emergencyContact?.email || ''} onChange={handleEmergencyContactChange} placeholder="Ej: carlos.garcia@example.com" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                     <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-600">WhatsApp</label>
                        <input type="tel" name="whatsapp" value={formData.emergencyContact?.whatsapp || ''} onChange={handleEmergencyContactChange} placeholder="Ej: +56987654321" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                </div>
            </div>
            <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-2">Historial Médico</h4>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Patologías (separadas por coma)</label>
                        <input type="text" name="pathologies" value={formData.pathologies.join(', ')} onChange={handlePathologyChange} placeholder="Ej: Hipertensión, Diabetes Tipo 2" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Alergias (separadas por coma)</label>
                        <input type="text" name="allergies" value={formData.allergies || ''} onChange={handleChange} placeholder="Ej: Penicilina, AINEs" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                </div>
            </div>
        </div>
        <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-3">
            <button type="button" onClick={onCancel} className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700">Guardar Paciente</button>
        </div>
    </form>
  );
};

export default PatientForm;