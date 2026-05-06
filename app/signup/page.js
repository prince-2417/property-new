'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Lock, User, ArrowRight, Chrome, Github } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { signup } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    signup(formData.name, formData.email, formData.password);
  };

  return (
    <div className="min-h-screen bg-pf-background text-pf-text">
      <Navbar />
      
      <main className="flex min-h-screen items-center justify-center px-4 py-24">
        <div className="w-full max-w-md">
          <div className="pf-card border border-gray-100 bg-white p-8 md:p-12 shadow-2xl">
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-black text-pf-heading mb-2">Create Account</h1>
              <p className="text-pf-muted">Join the UAE's most premium property network.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-pf-heading">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-pf-muted" size={18} />
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-5 text-sm focus:border-pf-primary focus:outline-none focus:ring-4 focus:ring-pf-primary/5 transition"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-pf-heading">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-pf-muted" size={18} />
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-5 text-sm focus:border-pf-primary focus:outline-none focus:ring-4 focus:ring-pf-primary/5 transition"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-pf-heading">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-pf-muted" size={18} />
                  <input 
                    type="password" 
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-5 text-sm focus:border-pf-primary focus:outline-none transition"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-pf-heading">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-pf-muted" size={18} />
                  <input 
                    type="password" 
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-5 text-sm focus:border-pf-primary focus:outline-none transition"
                  />
                </div>
              </div>

              <div className="flex items-start gap-3 py-2">
                <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-gray-300 text-pf-primary focus:ring-pf-primary" />
                <p className="text-xs text-pf-muted leading-relaxed">
                  I agree to the <Link href="#" className="font-bold text-pf-primary hover:underline">Terms of Service</Link> and <Link href="#" className="font-bold text-pf-primary hover:underline">Privacy Policy</Link>.
                </p>
              </div>

              <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2 py-4 shadow-lg shadow-pf-primary/20">
                Create Account <ArrowRight size={18} />
              </button>
            </form>

            <div className="my-8 flex items-center gap-4 text-pf-muted">
              <div className="h-px flex-1 bg-gray-100" />
              <span className="text-xs font-bold uppercase tracking-wider">Or sign up with</span>
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
              Already have an account? <Link href="/login" className="font-bold text-pf-primary hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
