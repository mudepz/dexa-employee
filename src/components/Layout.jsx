import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Clock, ClipboardList, LogOut } from 'lucide-react';

const Layout = ({ children }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <nav className="bg-blue-700 text-white shadow-md">
                <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
                    <h1 className="text-xl font-bold tracking-tight">DEXA <span className="font-light">WFH</span></h1>
                    <div className="hidden md:flex space-x-6 items-center">
                        <Link to="/profile" className="flex items-center gap-1 hover:text-blue-200"><User size={18} /> Profil</Link>
                        <Link to="/attendance" className="flex items-center gap-1 hover:text-blue-200"><Clock size={18} /> Absen</Link>
                        <Link to="/summary" className="flex items-center gap-1 hover:text-blue-200"><ClipboardList size={18} /> Summary</Link>
                        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md transition-colors flex items-center gap-1 text-sm">
                            <LogOut size={16} /> Logout
                        </button>
                    </div>
                </div>
            </nav>

            <main className="flex-grow p-4 md:p-8">
                <div className="max-w-4xl mx-auto">{children}</div>
            </main>

            {/* Mobile Navigation */}
            <div className="md:hidden bg-white border-t flex justify-around p-3 sticky bottom-0">
                <Link to="/profile" className="flex flex-col items-center text-gray-600"><User size={20} /> <span className="text-[10px]">Profil</span></Link>
                <Link to="/attendance" className="flex flex-col items-center text-gray-600"><Clock size={20} /> <span className="text-[10px]">Absen</span></Link>
                <Link to="/summary" className="flex flex-col items-center text-gray-600"><ClipboardList size={20} /> <span className="text-[10px]">Summary</span></Link>
            </div>
        </div>
    );
};

export default Layout;