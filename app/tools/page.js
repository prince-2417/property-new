'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calculator, LineChart, BookOpen, Map, ArrowUpRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function ToolsPage() {
  const [loanAmount, setLoanAmount] = useState(2200000);
  const [interestRate, setInterestRate] = useState(6.2);
  const [tenure, setTenure] = useState(19);
  const [activeTitle, setActiveTitle] = useState('Financial Projection');
  const { user } = useAuth();
  const router = useRouter();

  const handleToolClick = (title) => {
    if (!user) { router.push('/login'); return; }
    setActiveTitle(title);
  };

  const handleAppraisal = () => {
    if (!user) { router.push('/login'); return; }
    const monthly = calculateMonthlyPayment();
    const subject = encodeURIComponent('Property Appraisal Request');
    const body = encodeURIComponent(`Hello,\n\nI would like to request a property appraisal.\n\nMortgage Details:\n- Loan Amount: AED ${loanAmount.toLocaleString('en-US')}\n- Interest Rate: ${interestRate}%\n- Tenure: ${tenure} Years\n- Monthly Payment: AED ${monthly}\n\nName: ${user.name}\nEmail: ${user.email}`);
    window.location.href = `mailto:admin@property.com?subject=${subject}&body=${body}`;
  };

  const calculateMonthlyPayment = () => {
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = tenure * 12;
    if (monthlyRate === 0) return Math.round(loanAmount / numberOfPayments).toLocaleString('en-US');
    const payment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    return Math.round(payment).toLocaleString('en-US');
  };

  return (
    <div className="min-h-screen text-white bg-pf-background">
      <Navbar />
      
      <main className="pt-24 pb-32">
        <section className="relative min-h-[50vh] flex items-center py-24 mb-16 overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2075" 
              alt="Financial Insights" 
              className="object-cover w-full h-full opacity-40 grayscale"
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-gradient-to-b from-pf-background via-pf-background/70 to-pf-background" />
          </div>
          
          <div className="container relative z-10 px-6 mx-auto">
            <div className="max-w-4xl space-y-8">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-pf-accent animate-in fade-in slide-in-from-left-4 duration-1000">Intelligence Portfolio</p>
              <h1 className="font-serif italic text-6xl md:text-8xl text-pf-heading leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000">
                Tools & <br />
                <span className="not-italic font-normal text-white">Market Insights</span>
              </h1>
              <p className="max-w-2xl text-xl font-light leading-relaxed duration-1000 delay-200 md:text-2xl text-white/40 animate-in fade-in slide-in-from-bottom-12">
                Empowering your property journey with data-driven tools and expert guidance.
              </p>
            </div>
          </div>
        </section>

        <div className="container relative z-20 px-6 mx-auto">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Mortgage Calculator Card */}
            <div className="relative p-12 overflow-hidden transition-all duration-700 border lg:col-span-2 bg-pf-surface border-white/5 group">
              <div className="flex items-center gap-6 mb-16">
                <div className="flex items-center justify-center w-16 h-16 border bg-pf-accent/10 text-pf-accent border-pf-accent/20">
                  <Calculator size={28} />
                </div>
                <h2 className="font-serif text-4xl italic text-pf-heading">{activeTitle}</h2>
              </div>

              <div className="grid gap-16 lg:grid-cols-[1.3fr_1fr]">
                <div className="space-y-12">
                  {/* Loan Amount */}
                  <div className="space-y-6">
                    <div className="flex items-end justify-between">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Loan Principal (AED)</label>
                      <span className="font-serif text-2xl italic text-pf-heading">{loanAmount.toLocaleString('en-US')}</span>
                    </div>
                    <input 
                      type="range" min="100000" max="10000000" step="100000"
                      value={loanAmount} onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                      className="w-full h-px appearance-none cursor-pointer bg-white/10 accent-white"
                    />
                  </div>
                  
                  {/* Interest Rate */}
                  <div className="space-y-6">
                    <div className="flex items-end justify-between">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Annual Interest Rate (%)</label>
                      <span className="font-serif text-2xl italic text-pf-heading">{interestRate}%</span>
                    </div>
                    <input 
                      type="range" min="1" max="15" step="0.1"
                      value={interestRate} onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                      className="w-full h-px appearance-none cursor-pointer bg-white/10 accent-white"
                    />
                  </div>

                  {/* Tenure */}
                  <div className="space-y-6">
                    <div className="flex items-end justify-between">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Repayment Period (Years)</label>
                      <span className="font-serif text-2xl italic text-pf-heading">{tenure} Years</span>
                    </div>
                    <input 
                      type="range" min="1" max="30" step="1"
                      value={tenure} onChange={(e) => setTenure(parseInt(e.target.value))}
                      className="w-full h-px appearance-none cursor-pointer bg-white/10 accent-white"
                    />
                  </div>
                </div>

                <div className="relative flex flex-col items-center justify-center p-12 overflow-hidden text-center border bg-pf-background border-white/5 group">
                  <div className="absolute inset-0 transition-opacity duration-1000 opacity-0 bg-pf-accent/5 group-hover:opacity-100" />
                  <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mb-6 relative z-10">Monthly Commitment</p>
                  <div className="relative z-10 mb-8 font-serif text-5xl italic text-pf-heading">
                    AED {calculateMonthlyPayment()}
                  </div>
                  <p className="text-[10px] text-white/20 mb-10 font-medium uppercase tracking-widest leading-relaxed relative z-10">Estimated Valuation</p>
                  <button onClick={handleAppraisal} className="w-full py-5 bg-white text-black text-[11px] font-black uppercase tracking-widest hover:bg-pf-accent transition-all duration-500 relative z-10">
                    Request Appraisal
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Links Sidebar */}
            <div className="space-y-12">
              {[
                { title: 'Market Analysis', desc: 'Real-time volatility & trend tracking', icon: LineChart },
                { title: 'Area Intel', desc: 'Deep dive into regional valuation', icon: Map },
                { title: 'Legal Desk', desc: 'Asset transfer & compliance', icon: BookOpen },
              ].map((item, i) => (
                <div key={i} onClick={() => handleToolClick(item.title)} className="flex items-center justify-between p-10 transition-all duration-700 border cursor-pointer bg-pf-surface border-white/5 group hover:border-pf-accent/30">
                  <div className="flex items-center gap-8">
                    <div className="flex items-center justify-center w-16 h-16 transition-all duration-700 bg-white/5 text-white/40 group-hover:bg-pf-accent group-hover:text-black">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl transition-all text-pf-heading group-hover:italic">{item.title}</h3>
                      <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mt-2">{item.desc}</p>
                    </div>
                  </div>
                  <ArrowUpRight size={20} className="transition-colors text-white/10 group-hover:text-pf-accent" />
                </div>
              ))}

              {/* <div className="p-12 transition-all duration-700 bg-pf-accent group hover:bg-pf-heading">
                <h3 className="mb-6 font-serif text-3xl italic text-white">Expert Advisory</h3>
                <p className="text-[13px] text-white/70 mb-10 font-medium leading-relaxed">
                  Our intelligence desk is available 24/7 to guide you through your financial property journey.
                </p>
                <button className="w-full py-5 bg-white text-black text-[11px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-500">
                  Connect Now
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
