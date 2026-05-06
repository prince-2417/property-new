'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Lock, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  const { user, changePassword } = useAuth();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    
    const res = changePassword(formData.currentPassword, formData.newPassword);
    if (res) {
      setSuccess(true);
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setSuccess(false), 5000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-32 max-w-4xl">
      <div className="grid gap-10 lg:grid-cols-3">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1">
          <div className="pf-card bg-white border border-gray-100 p-8 shadow-2xl rounded-[40px] sticky top-32">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-pf-primary text-white font-black text-4xl shadow-2xl shadow-pf-primary/30">
                {user?.name?.[0]}
              </div>
              <h2 className="text-2xl font-black text-pf-heading tracking-tight">{user?.name}</h2>
              <p className={`mt-2 inline-flex rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest border ${
                user?.role === 'Admin' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-blue-50 text-blue-600 border-blue-100'
              }`}>
                {user?.role}
              </p>
            </div>
            
            <div className="mt-10 space-y-6 border-t border-gray-50 pt-8">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-pf-muted">Email Address</p>
                <p className="mt-1 text-sm font-bold text-pf-heading">{user?.email}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-pf-muted">Member ID</p>
                <p className="mt-1 text-sm font-bold text-pf-heading font-mono">#{user?.id?.slice(-8)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Form */}
        <div className="lg:col-span-2">
          <div className="pf-card bg-white border border-gray-100 p-10 shadow-2xl rounded-[48px]">
            <div className="mb-10">
              <h1 className="text-3xl font-black text-pf-heading tracking-tight">Account Security</h1>
              <p className="mt-2 text-pf-muted font-medium">Update your password to keep your account secure.</p>
            </div>

            {success && (
              <div className="mb-8 flex items-center gap-3 rounded-2xl bg-green-50 p-5 text-green-600 border border-green-100 animate-in fade-in slide-in-from-top-2 duration-500">
                <CheckCircle2 size={24} />
                <p className="text-sm font-black uppercase tracking-wider">Password updated successfully!</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-pf-muted ml-4">Current Password</label>
                <div className="relative">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-pf-muted" size={20} />
                  <input 
                    type="password" 
                    required
                    value={formData.currentPassword}
                    onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                    placeholder="••••••••"
                    className="w-full rounded-[24px] border border-gray-100 bg-gray-50/50 py-5 pl-16 pr-6 text-base font-medium focus:border-pf-primary focus:outline-none focus:ring-4 focus:ring-pf-primary/5 transition-all shadow-inner"
                  />
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-[0.2em] text-pf-muted ml-4">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-pf-muted" size={20} />
                    <input 
                      type="password" 
                      required
                      value={formData.newPassword}
                      onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                      placeholder="••••••••"
                      className="w-full rounded-[24px] border border-gray-100 bg-gray-50/50 py-5 pl-16 pr-6 text-base font-medium focus:border-pf-primary focus:outline-none focus:ring-4 focus:ring-pf-primary/5 transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-[0.2em] text-pf-muted ml-4">Confirm New</label>
                  <div className="relative">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-pf-muted" size={20} />
                    <input 
                      type="password" 
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      placeholder="••••••••"
                      className="w-full rounded-[24px] border border-gray-100 bg-gray-50/50 py-5 pl-16 pr-6 text-base font-medium focus:border-pf-primary focus:outline-none focus:ring-4 focus:ring-pf-primary/5 transition-all shadow-inner"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full btn-primary flex items-center justify-center gap-3 py-6 rounded-[24px] text-lg shadow-2xl shadow-pf-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                  Update Security Credentials <ArrowRight size={22} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
