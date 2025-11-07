
import React from 'react';
import { VitalSign } from '../../types';

interface VitalSignRowProps {
    vitalSign: VitalSign;
    onEdit: () => void;
    onDelete: () => void;
}

const VitalSignRow: React.FC<VitalSignRowProps> = ({ vitalSign, onEdit, onDelete }) => {
    const formattedDate = new Date(vitalSign.dateTime).toLocaleString('es-CL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    return (
        <tr className="bg-white border-b hover:bg-gray-50">
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{formattedDate}</td>
            <td className="px-6 py-4">{vitalSign.bloodPressure}</td>
            <td className="px-6 py-4">{vitalSign.heartRate}</td>
            <td className="px-6 py-4">{vitalSign.respiratoryRate}</td>
            <td className="px-6 py-4">{vitalSign.temperature}°C</td>
            <td className="px-6 py-4">{vitalSign.oxygenSaturation}%</td>
            <td className="px-6 py-4">{vitalSign.bloodGlucose}</td>
            <td className="px-6 py-4 max-w-xs truncate">{vitalSign.observations}</td>
            <td className="px-6 py-4">
                <div className="flex space-x-2">
                    <button onClick={onEdit} className="p-2 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z" />
                      </svg>
                    </button>
                    <button onClick={onDelete} className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default VitalSignRow;
