'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="min-h-screen bg-pf-background text-pf-text">
      <Navbar />
      
      <main className="flex min-h-screen items-center justify-center px-4 py-24">
        <div className="w-full max-w-md">
          <div className="pf-card border border-gray-100 bg-white p-8 md:p-12 shadow-2xl">
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-black text-pf-heading mb-2">Welcome Back</h1>
              <p className="text-pf-muted">Login to manage your properties and leads.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-pf-heading">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-pf-muted" size={18} />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-5 text-sm focus:border-pf-primary focus:outline-none focus:ring-4 focus:ring-pf-primary/5 transition"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-pf-heading">Password</label>
                  <Link href="#" className="text-xs font-bold text-pf-primary hover:underline">Forgot password?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-pf-muted" size={18} />
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-5 text-sm focus:border-pf-primary focus:outline-none focus:ring-4 focus:ring-pf-primary/5 transition"
                  />
                </div>
              </div>

              <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2 py-4">
                Sign In <ArrowRight size={18} />
              </button>
            </form>

            <div className="my-8 flex items-center gap-4 text-pf-muted">
              <div className="h-px flex-1 bg-gray-100" />
              <span className="text-xs font-bold uppercase tracking-wider">Or continue with</span>
              <div className="h-px flex-1 bg-gray-100" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 py-3 text-sm font-bold text-pf-heading hover:bg-gray-50 transition">
                <Chrome size={18} /> Google
              </button>
              <button className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 py-3 text-sm font-bold text-pf-heading hover:bg-gray-50 transition">
                <Github size={18} /> GitHub
              </button>
            </div>

            <p className="mt-8 text-center text-sm text-pf-muted">
              Don't have an account? <Link href="/signup" className="font-bold text-pf-primary hover:underline">Create Account</Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
