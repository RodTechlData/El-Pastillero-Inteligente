
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { PlusIcon, MoonIcon, SunIcon } from './icons/Icons';

const NavItem: React.FC<{ to: string, icon: React.ReactNode, label: string }> = ({ to, icon, label }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <NavLink
            to={to}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
        >
            {icon}
            <span>{label}</span>
        </NavLink>
    );
};

const Header: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    const location = useLocation();
    
    const getActionComponent = () => {
        switch (location.pathname) {
            case '/patients':
                return null; // The action button is in the page itself
            case '/medications':
                 return null;
            case '/vitals':
                 return null;
            default:
                return null;
        }
    };
    
    return (
        <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-4">
                        <NavLink to="/" className="flex items-center space-x-2 text-blue-600">
                             <div className="bg-blue-500 p-2 rounded-md">
                                <PlusIcon className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-xl">El Pastillero Inteligente</span>
                        </NavLink>
                        <nav className="hidden md:flex items-center space-x-2">
                            <NavItem to="/patients" icon={<span className="text-xl">👥</span>} label="Pacientes" />
                            <NavItem to="/medications" icon={<span className="text-xl">💊</span>} label="Medicamentos" />
                            <NavItem to="/vitals" icon={<span className="text-xl">❤️</span>} label="Signos Vitales" />
                            <NavItem to="/appointments" icon={<span className="text-xl">🗓️</span>} label="Agenda Médica" />
                        </nav>
                    </div>
                    <div className="flex items-center space-x-4">
                        {getActionComponent()}
                        <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full hover:bg-gray-100">
                           {isDarkMode ? <SunIcon className="w-6 h-6 text-gray-600" /> : <MoonIcon className="w-6 h-6 text-gray-600" />}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
