import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import dayjs from 'dayjs';
import { Search, Calendar as CalIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const Summary = () => {
    const [filters, setFilters] = useState({
        start_date: dayjs().startOf('month').format('YYYY-MM-DD'),
        end_date: dayjs().format('YYYY-MM-DD')
    });
    const [logs, setLogs] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total_page: 1
    });

    const fetchLogs = async (targetPage = 1) => {
        try {
            if (filters.start_date > filters.end_date) {
                return alert('Start Date can not be greater than End Date');
            }

            const res = await api.get('/attendance', {
                params: {
                    ...filters,
                    page: targetPage,
                    limit: pagination.limit
                }
            });

            setLogs(res.data.data);
            setPagination(prev => ({
                ...prev,
                page: res.data.meta.page,
                total_page: res.data.meta.total_page
            }));
        } catch (err) {
            console.error("Gagal ambil summary");
        }
    };

    useEffect(() => {
        fetchLogs(1);
    }, []);

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-lg font-bold mb-4">Attendance Summary</h2>

            <div className="flex flex-wrap gap-3 mb-6 items-end bg-gray-50 p-4 rounded-lg">
                <div className="flex-1 min-w-[120px]">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">From</label>
                    <input
                        type="date"
                        value={filters.start_date}
                        onChange={(e) => setFilters({ ...filters, start_date: e.target.value })}
                        className="w-full p-2 border rounded text-sm outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <div className="flex-1 min-w-[120px]">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">To</label>
                    <input
                        type="date"
                        value={filters.end_date}
                        onChange={(e) => setFilters({ ...filters, end_date: e.target.value })}
                        className="w-full p-2 border rounded text-sm outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <button
                    onClick={() => fetchLogs(1)}
                    className="bg-blue-600 text-white px-4 py-2 rounded text-sm flex items-center gap-2 hover:bg-blue-700 transition-colors"
                >
                    <Search size={14} /> Cari
                </button>
            </div>

            <div className="space-y-3 min-h-[200px]">
                {logs.length > 0 ? logs.map((log, i) => (
                    <div key={i} className="border-b pb-3 flex justify-between items-center hover:bg-gray-50 transition-colors">
                        <span className="text-sm font-medium text-gray-600">
                            {dayjs(log.date).format('DD MMM YYYY')}
                        </span>
                        <div className="text-sm font-bold">
                            <span className="text-green-600">{log.tap_in_at_format || '--:--'}</span>
                            <span className="mx-2 text-gray-300">|</span>
                            <span className="text-red-600">{log.tap_out_at_format || '--:--'}</span>
                        </div>
                    </div>
                )) : (
                    <div className="text-center py-10 text-gray-400 text-sm">No data found</div>
                )}
            </div>

            <div className="flex justify-between items-center mt-8 pt-4 border-t">
                <p className="text-xs text-gray-500">
                    Page <span className="font-bold text-gray-800">{pagination.page}</span> of {pagination.total_page}
                </p>
                <div className="flex gap-2">
                    <button
                        disabled={pagination.page <= 1}
                        onClick={() => fetchLogs(pagination.page - 1)}
                        className="p-1 border rounded disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        disabled={pagination.page >= pagination.total_page}
                        onClick={() => fetchLogs(pagination.page + 1)}
                        className="p-1 border rounded disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Summary;