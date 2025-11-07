
import React, { useState } from 'react';
import { Medication } from '../../types';

interface MedicationListItemProps {
  medication: Medication;
  patientName: string;
  onEdit: () => void;
  onDelete: () => void;
  onToggleActive: (isActive: boolean) => void;
}

const MedicationListItem: React.FC<MedicationListItemProps> = ({ medication, patientName, onEdit, onDelete, onToggleActive }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleToggle = () => {
        onToggleActive(!medication.isActive);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10H6a4 4 0 000 8h8a4 4 0 100-8z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14v4m0-12v4"></path></svg>
                </div>
                <div>
                    <h3 className="font-bold text-lg text-gray-800">{medication.name}</h3>
                    <div className="text-sm text-gray-500 flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <span>{medication.schedules.join(', ')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            <span>{medication.isPermanent ? 'Permanente' : `${medication.startDate} - ${medication.endDate}`}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">{medication.quantity}</span>
                <div className="flex flex-col items-center">
                    <button onClick={handleToggle} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${medication.isActive ? 'bg-blue-600' : 'bg-gray-200'}`}>
                        <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${medication.isActive ? 'translate-x-6' : 'translate-x-1'}`}/>
                    </button>
                    <span className={`text-xs mt-1 font-medium ${medication.isActive ? 'text-blue-600' : 'text-gray-500'}`}>{medication.isActive ? 'Activo' : 'Inactivo'}</span>
                </div>
                <div className="relative">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-full hover:bg-gray-100">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
                    </button>
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                            <button onClick={() => { onEdit(); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Editar</button>
                            <button onClick={() => { onDelete(); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Eliminar</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MedicationListItem;
