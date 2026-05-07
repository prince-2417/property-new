'use client';
import { useState, useEffect } from 'react';
import { Users, Mail, ShieldCheck, Search, Filter, Trash2, UserCheck, MoreVertical } from 'lucide-react';

export default function AdminManageUsers() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('pf_users') || '[]');
    setUsers(storedUsers);
  }, []);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deleteUser = (userId) => {
    if (confirm('Are you sure you want to delete this user? All their data will be removed.')) {
      const updatedUsers = users.filter(u => u.id !== userId);
      setUsers(updatedUsers);
      localStorage.setItem('pf_users', JSON.stringify(updatedUsers));
      // Also should delete their listings in a real app
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">User Management</h1>
          <p className="text-slate-500 font-bold mt-1 uppercase tracking-widest text-xs">Showing {filteredUsers.length} of {users.length} members</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-6 text-sm font-bold focus:border-pf-primary focus:outline-none transition-all w-64 shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 rounded-2xl bg-pf-primary px-6 py-3 text-sm font-black text-white shadow-xl shadow-pf-primary/20 hover:scale-105 active:scale-95 transition-all">
            <UserCheck size={18} /> Add User
          </button>
        </div>
      </div>

      <div className="rounded-[48px] border border-slate-200 bg-white shadow-2xl shadow-slate-200/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">
                <th className="px-10 py-8">User Info</th>
                <th className="px-10 py-8">Role & Status</th>
                <th className="px-10 py-8">Platform ID</th>
                <th className="px-10 py-8">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="group hover:bg-slate-50/30 transition-colors">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-6">
                      <div className="h-16 w-16 rounded-3xl bg-pf-primary/10 flex items-center justify-center text-pf-primary font-black text-2xl shadow-inner group-hover:bg-pf-primary group-hover:text-white transition-all duration-500">
                        {user.name[0]}
                      </div>
                      <div>
                        <p className="text-xl font-black text-slate-900 leading-tight">{user.name}</p>
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-400 mt-2">
                          <Mail size={14} className="text-pf-primary" /> {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className={`inline-flex items-center gap-2 rounded-xl px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] border ${
                      user.role === 'Admin' 
                        ? 'bg-amber-50 text-amber-600 border-amber-100' 
                        : 'bg-pf-primary/10 text-pf-primary border-pf-primary/20'
                    }`}>
                      {user.role === 'Admin' ? <ShieldCheck size={14} /> : <Users size={14} />}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-10 py-8">
                    <span className="font-mono text-xs font-black text-slate-300 tracking-widest bg-slate-50 px-3 py-1 rounded-lg">
                      #{user.id.slice(-8)}
                    </span>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-3">
                      <button className="rounded-2xl p-3 text-slate-400 hover:bg-slate-100 transition-all hover:scale-110">
                        <MoreVertical size={20} />
                      </button>
                      {user.role !== 'Admin' && (
                        <button 
                          onClick={() => deleteUser(user.id)}
                          className="rounded-2xl p-3 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all hover:scale-110"
                        >
                          <Trash2 size={20} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
