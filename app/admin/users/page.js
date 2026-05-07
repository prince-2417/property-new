'use client';
import { useState, useEffect } from 'react';
import { Users, Mail, ShieldCheck, Search, Filter, Trash2, UserCheck, MoreVertical, ArrowUpRight } from 'lucide-react';

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
    }
  };

  return (
    <div className="space-y-16 animate-in fade-in duration-1000">
      <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-pf-accent">Security</p>
          <h1 className="font-serif italic text-5xl text-white">Member <span className="font-normal not-italic">Directory</span></h1>
        </div>
        
        <div className="flex flex-wrap gap-6">
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-pf-accent transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search members..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-pf-surface border border-white/5 px-14 py-5 text-[11px] font-black uppercase tracking-widest text-white placeholder:text-white/10 focus:border-pf-accent transition-all outline-none w-72"
            />
          </div>
          <button className="btn-pill btn-primary text-black flex items-center gap-3">
            <UserCheck size={16} /> Add Member
          </button>
        </div>
      </div>

      <div className="bg-pf-surface border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-[9px] font-black uppercase tracking-[0.3em] text-white/20">
                <th className="px-12 py-8">User Profile</th>
                <th className="px-12 py-8">Access Level</th>
                <th className="px-12 py-8">Identity Reference</th>
                <th className="px-12 py-8 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="group hover:bg-white/5 transition-all duration-500">
                  <td className="px-12 py-10">
                    <div className="flex items-center gap-8">
                      <div className="h-20 w-20 bg-white text-black flex items-center justify-center font-black text-2xl group-hover:bg-pf-accent group-hover:text-white transition-all duration-700">
                        {user.name[0]}
                      </div>
                      <div>
                        <p className="font-serif text-2xl text-white group-hover:italic transition-all leading-tight mb-2">{user.name}</p>
                        <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-white/20">
                          <Mail size={14} className="text-pf-accent" /> {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-12 py-10">
                    <span className={`inline-flex items-center gap-2 px-5 py-2 text-[9px] font-black uppercase tracking-[0.2em] border ${
                      user.role === 'Admin' 
                        ? 'bg-pf-accent/10 text-pf-accent border-pf-accent/20' 
                        : 'bg-white/5 text-white/40 border-white/10'
                    }`}>
                      {user.role === 'Admin' ? <ShieldCheck size={14} /> : <Users size={14} />}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-12 py-10">
                    <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-white/10">
                      <span>#{user.id.slice(-8)}</span>
                      <ArrowUpRight size={14} />
                    </div>
                  </td>
                  <td className="px-12 py-10 text-right">
                    <div className="flex items-center justify-end gap-6 opacity-40 group-hover:opacity-100 transition-all">
                      <button className="text-white/40 hover:text-white transition-colors">
                        <MoreVertical size={20} />
                      </button>
                      {user.role !== 'Admin' && (
                        <button 
                          onClick={() => deleteUser(user.id)}
                          className="text-white/40 hover:text-red-500 transition-colors"
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
