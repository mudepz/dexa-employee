import React, { useState } from 'react';
import api from '../api/axios';
import { Clock, LogIn, LogOut } from 'lucide-react';
import dayjs from 'dayjs';

const Attendance = () => {
    const [loading, setLoading] = useState(false);
    const currentTime = dayjs().format('HH:mm:ss');

    const handleAttendance = async (status) => {
        setLoading(true);
        try {
            status === 'IN' ? await api.post('/attendance') : await api.put('/attendance');
            alert(`Berhasil Absen ${status === 'IN' ? 'Masuk' : 'Pulang'}`);
        } catch (err) {
            alert(err.response?.data?.message || 'Gagal melakukan absen');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center border border-gray-100">
                <Clock className="w-16 h-16 mx-auto text-blue-600 mb-4" />
                <h2 className="text-2xl font-bold text-gray-800">Employee Attendance</h2>
                <p className="text-gray-500 mb-8 font-mono">Time: {currentTime}</p>
                <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => handleAttendance('IN')} disabled={loading} className="flex flex-col items-center bg-green-500 text-white p-6 rounded-xl hover:bg-green-600 transition-all">
                        <LogIn className="mb-2" /> <span className="font-bold">Tap In</span>
                    </button>
                    <button onClick={() => handleAttendance('OUT')} disabled={loading} className="flex flex-col items-center bg-red-500 text-white p-6 rounded-xl hover:bg-red-600 transition-all">
                        <LogOut className="mb-2" /> <span className="font-bold">Tap Out</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Attendance;