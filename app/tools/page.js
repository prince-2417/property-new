'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calculator, LineChart, BookOpen, Map, ArrowRight } from 'lucide-react';

export default function ToolsPage() {
  const [loanAmount, setLoanAmount] = useState(2200000);
  const [interestRate, setInterestRate] = useState(6.2);
  const [tenure, setTenure] = useState(19);

  const calculateMonthlyPayment = () => {
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = tenure * 12;
    if (monthlyRate === 0) return (loanAmount / numberOfPayments).toFixed(0);
    const payment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    return Math.round(payment).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-pf-background text-pf-text">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <section className="bg-pf-heading py-16 md:py-24 text-white overflow-hidden relative">
          <div className="container mx-auto px-4 relative z-10">
            <p className="text-pf-primary font-black uppercase tracking-[0.4em] mb-4 text-[10px] md:text-xs">Financial Planning</p>
            <h1 className="text-4xl md:text-7xl font-black mb-6 md:mb-8 tracking-tight leading-tight">Tools & Insights</h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl font-medium leading-relaxed">Empowering your property journey with data-driven tools and expert guidance.</p>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/2 bg-pf-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        </section>

        <div className="container mx-auto px-4 -mt-10 md:-mt-16 relative z-20">
          <div className="grid gap-6 md:gap-10 lg:grid-cols-3">
            {/* Mortgage Calculator Card */}
            <div className="lg:col-span-2 pf-card bg-white border border-gray-100 p-6 md:p-12 shadow-2xl rounded-[32px] md:rounded-[48px]">
              <div className="flex items-center gap-4 mb-8 md:mb-12">
                <div className="p-3 md:p-4 rounded-2xl bg-pf-primary/10 text-pf-primary shadow-inner">
                  <Calculator size={24} className="md:w-8 md:h-8" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-pf-heading tracking-tight">Mortgage Calculator</h2>
              </div>

              <div className="grid gap-10 md:gap-12 lg:grid-cols-[1.2fr_1fr]">
                <div className="space-y-8 md:space-y-10">
                  <div className="space-y-4 md:space-y-5">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-pf-muted">Loan Amount (AED)</label>
                      <input 
                        type="number" 
                        value={loanAmount} 
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        className="w-24 md:w-32 bg-pf-background rounded-xl px-3 py-1.5 text-right font-black text-pf-primary focus:outline-none focus:ring-2 focus:ring-pf-primary/20 text-sm md:text-base"
                      />
                    </div>
                    <input 
                      type="range" min="100000" max="10000000" step="100000"
                      value={loanAmount} onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-pf-primary"
                    />
                  </div>
                  
                  <div className="space-y-4 md:space-y-5">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-pf-muted">Interest Rate (%)</label>
                      <input 
                        type="number" 
                        step="0.1"
                        value={interestRate} 
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-20 md:w-24 bg-pf-background rounded-xl px-3 py-1.5 text-right font-black text-pf-primary focus:outline-none focus:ring-2 focus:ring-pf-primary/20 text-sm md:text-base"
                      />
                    </div>
                    <input 
                      type="range" min="1" max="15" step="0.1"
                      value={interestRate} onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-pf-primary"
                    />
                  </div>

                  <div className="space-y-4 md:space-y-5">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-pf-muted">Loan Tenure (Years)</label>
                      <input 
                        type="number" 
                        value={tenure} 
                        onChange={(e) => setTenure(Number(e.target.value))}
                        className="w-20 md:w-24 bg-pf-background rounded-xl px-3 py-1.5 text-right font-black text-pf-primary focus:outline-none focus:ring-2 focus:ring-pf-primary/20 text-sm md:text-base"
                      />
                    </div>
                    <input 
                      type="range" min="1" max="30" step="1"
                      value={tenure} onChange={(e) => setTenure(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-pf-primary"
                    />
                  </div>
                </div>

                <div className="bg-pf-heading rounded-[32px] md:rounded-[40px] p-8 md:p-10 flex flex-col items-center justify-center text-center text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-pf-primary/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                  <p className="text-[9px] md:text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-3 md:mb-4">Estimated Monthly Payment</p>
                  <div className="text-4xl md:text-6xl font-black text-pf-primary mb-5 md:mb-6 tracking-tight drop-shadow-2xl">
                    AED {calculateMonthlyPayment()}
                  </div>
                  <p className="text-[9px] md:text-[10px] text-white/40 mb-8 md:mb-10 leading-relaxed max-w-[200px]">This is an estimate. Actual rates may vary by bank and individual credit profiles.</p>
                  <button className="w-full bg-pf-primary text-white font-black py-4 md:py-5 rounded-2xl md:rounded-[20px] shadow-xl shadow-pf-primary/30 hover:scale-105 active:scale-95 transition-all">Get Pre-Approved</button>
                </div>
              </div>
            </div>

            {/* Quick Links Sidebar */}
            <div className="space-y-6 md:space-y-8">
              {[
                { title: 'Market Reports', desc: 'Latest real estate trends and analysis', icon: LineChart, color: 'text-blue-500' },
                { title: 'Area Insights', desc: 'Deep dive into local price trends', icon: Map, color: 'text-pf-primary' },
                { title: 'Buyer Guides', desc: 'Master the step-by-step process', icon: BookOpen, color: 'text-green-500' },
              ].map((item, i) => (
                <div key={i} className="pf-card group bg-white border border-gray-100 p-6 md:p-8 flex items-center justify-between cursor-pointer hover:border-pf-primary transition-all duration-500 rounded-3xl md:rounded-[32px] shadow-sm hover:shadow-2xl">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className={`p-4 md:p-5 rounded-2xl bg-slate-50 transition-all duration-500 group-hover:bg-pf-primary group-hover:text-white group-hover:-rotate-6 ${item.color}`}>
                      <item.icon size={20} className="md:w-6 md:h-6" />
                    </div>
                    <div>
                      <h3 className="font-black text-pf-heading text-base md:text-lg tracking-tight">{item.title}</h3>
                      <p className="text-[10px] font-bold text-pf-muted uppercase tracking-widest mt-1 opacity-60 line-clamp-1">{item.desc}</p>
                    </div>
                  </div>
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-full border border-gray-100 flex items-center justify-center text-pf-muted group-hover:border-pf-primary group-hover:text-pf-primary group-hover:translate-x-1 transition-all">
                    <ArrowRight size={18} />
                  </div>
                </div>
              ))}

              <div className="pf-card bg-gradient-to-br from-pf-primary to-pf-secondary p-8 md:p-10 rounded-[32px] md:rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4 tracking-tight">Need expert help?</h3>
                  <p className="text-white/80 text-sm font-medium mb-6 md:mb-8 leading-relaxed">Our advisors are available 24/7 to guide you through your financial journey.</p>
                  <button className="bg-white text-pf-primary font-black px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl shadow-xl hover:scale-105 transition-all">Speak to Agent</button>
                </div>
                <div className="absolute -bottom-10 -right-10 text-white/10 group-hover:scale-110 transition-transform duration-700">
                  <Calculator size={150} className="md:w-[200px] md:h-[200px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
