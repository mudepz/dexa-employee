import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Camera, Phone, Lock, User as UserIcon } from 'lucide-react';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [file, setFile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/employee');
                setProfile(res.data.data);
                setPhone(res.data.data.phone_number);
            } catch (err) { console.error("Gagal load profil"); }
        };
        fetchProfile();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('phone_number', phone);
        if (password) formData.append('password', password);
        if (file) formData.append('file', file);

        try {
            await api.patch('/employee', formData);
            alert('Profil diperbarui!');
        } catch (err) { alert('Gagal update'); }
    };

    if (!profile) return <div className="text-center mt-20">Loading...</div>;

    return (
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border">
            <div className="bg-blue-600 h-24 relative">
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                    <div className="relative">
                        <img src={profile.photo_url || 'https://via.placeholder.com/150'} className="w-24 h-24 rounded-full border-4 border-white object-cover" alt="Avatar" />
                        <label className="absolute bottom-0 right-0 bg-blue-500 p-1.5 rounded-full text-white cursor-pointer hover:bg-blue-600">
                            <Camera size={14} /><input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
                        </label>
                    </div>
                </div>
            </div>
            <div className="pt-12 pb-8 px-8 text-center space-y-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">{profile.full_name}</h2>
                    <p className="text-blue-600 text-sm font-medium">{profile.position || 'Backend Engineer'}</p>
                    <p className="text-gray-400 text-xs">{profile.email}</p>
                </div>
                <form onSubmit={handleUpdate} className="text-left space-y-4">
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase">Phone Number</label>
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 border rounded mt-1 outline-none focus:ring-1 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase">New Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded mt-1 outline-none focus:ring-1 focus:ring-blue-500" placeholder="••••••••" />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition-colors">Save</button>
                </form>
            </div>
        </div>
    );
};

export default Profile;