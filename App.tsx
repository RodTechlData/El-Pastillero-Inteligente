
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import DashboardPage from './pages/DashboardPage';
import PatientsPage from './pages/patients/PatientsPage';
import MedicationsPage from './pages/medications/MedicationsPage';
import VitalSignsPage from './pages/vitals/VitalSignsPage';
import ComingSoonPage from './pages/ComingSoonPage';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/medications" element={<MedicationsPage />} />
          <Route path="/vitals" element={<VitalSignsPage />} />
          <Route path="/appointments" element={<ComingSoonPage title="Agenda Médica" />} />
          <Route path="/pharmacy" element={<ComingSoonPage title="Buscar Farmacia" />} />
          <Route path="/settings" element={<ComingSoonPage title="Ajustes" />} />
        </Routes>
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm border-t border-gray-200 mt-8">
        © DATAFLOWIA.COM todos los derechos reservados | contacto@dataflowia.com | by Rodrigo CH
      </footer>
    </div>
  );
};

export default App;
