'use client';
import { useState } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, CheckCircle2, CreditCard, ShieldCheck, ArrowRight } from 'lucide-react';
import { useListings } from '@/context/ListingContext';

export default function BookingModal({ isOpen, onClose, property }) {
  const { addBooking } = useListings();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '10:00 AM'
  });

  if (!isOpen) return null;

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate payment and save booking
    setTimeout(() => {
      addBooking({
        propertyId: property.id,
        propertyTitle: property.title,
        propertyImage: property.image,
        ownerId: property.ownerId,
        ownerName: property.ownerName || 'Elena Petrova',
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        viewingDate: formData.date,
        viewingTime: formData.time,
      });
      setStep(3);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      {/* ... rest of the modal UI ... */}
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-pf-heading/80 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-xl overflow-hidden rounded-[48px] bg-white shadow-2xl shadow-black/50 animate-in zoom-in slide-in-from-bottom-10 duration-500">
        <button 
          onClick={onClose}
          className="absolute right-8 top-8 z-10 rounded-2xl bg-pf-background p-3 text-pf-muted hover:bg-pf-primary hover:text-white transition-all hover:scale-110 active:scale-90"
        >
          <X size={24} />
        </button>

        {step === 1 && (
          <div className="p-6 md:p-14">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-pf-primary mb-3">Step 1 of 2</p>
            <h2 className="text-2xl md:text-4xl font-black text-pf-heading tracking-tight mb-2 leading-tight">Booking Details</h2>
            <p className="text-xs md:text-sm font-medium text-pf-muted mb-8 md:mb-10 line-clamp-1">{property.title}</p>

            <form onSubmit={handleNext} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-pf-muted px-1">Select Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-pf-primary" size={18} />
                    <input 
                      type="date" 
                      required 
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full rounded-2xl border border-gray-100 bg-pf-background py-4 pl-12 pr-4 text-sm font-bold text-pf-heading focus:border-pf-primary transition-all outline-none" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-pf-muted px-1">Select Time</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-pf-primary" size={18} />
                    <select 
                      required 
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      className="w-full rounded-2xl border border-gray-100 bg-pf-background py-4 pl-12 pr-4 text-sm font-bold text-pf-heading focus:border-pf-primary transition-all outline-none appearance-none"
                    >
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:30 AM">11:30 AM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="04:30 PM">04:30 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-pf-muted px-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-pf-primary" size={18} />
                  <input 
                    type="text" 
                    placeholder="Enter your name" 
                    required 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full rounded-2xl border border-gray-100 bg-pf-background py-4 pl-12 pr-4 text-sm font-bold text-pf-heading focus:border-pf-primary transition-all outline-none" 
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-pf-muted px-1">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-pf-primary" size={18} />
                    <input 
                      type="tel" 
                      placeholder="+971" 
                      required 
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full rounded-2xl border border-gray-100 bg-pf-background py-4 pl-12 pr-4 text-sm font-bold text-pf-heading focus:border-pf-primary transition-all outline-none" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-pf-muted px-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-pf-primary" size={18} />
                    <input 
                      type="email" 
                      placeholder="Enter email" 
                      required 
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full rounded-2xl border border-gray-100 bg-pf-background py-4 pl-12 pr-4 text-sm font-bold text-pf-heading focus:border-pf-primary transition-all outline-none" 
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full btn-primary py-5 rounded-2xl shadow-xl shadow-pf-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all mt-4 flex items-center justify-center gap-2"
              >
                Proceed to Payment <ArrowRight size={20} />
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="p-6 md:p-14">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-pf-primary mb-4">Step 2 of 2</p>
            <h2 className="text-2xl md:text-4xl font-black text-pf-heading tracking-tight mb-2 leading-tight">Secure Payment</h2>
            <p className="text-xs md:text-sm font-medium text-pf-muted mb-8">Pay booking fee to confirm viewing.</p>

            <div className="rounded-[32px] bg-pf-background p-8 mb-10 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-pf-muted uppercase tracking-widest">Total Amount</span>
                <span className="text-pf-primary font-black">Booking Fee</span>
              </div>
              <div className="text-5xl font-black text-pf-heading tracking-tight">AED 5,000</div>
              <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-2 text-[10px] font-bold text-pf-muted uppercase tracking-widest">
                <ShieldCheck size={14} className="text-green-500" /> Secure SSL Encrypted Payment
              </div>
            </div>

            <form onSubmit={handlePayment} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-pf-muted px-1">Card Number</label>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-pf-primary" size={18} />
                  <input type="text" placeholder="0000 0000 0000 0000" required className="w-full rounded-2xl border border-gray-100 bg-pf-background py-4 pl-12 pr-4 text-sm font-bold text-pf-heading focus:border-pf-primary transition-all outline-none" />
                </div>
              </div>

              <div className="grid gap-6 grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-pf-muted px-1">Expiry Date</label>
                  <input type="text" placeholder="MM / YY" required className="w-full rounded-2xl border border-gray-100 bg-pf-background py-4 px-5 text-sm font-bold text-pf-heading focus:border-pf-primary transition-all outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-pf-muted px-1">CVV</label>
                  <input type="text" placeholder="123" required className="w-full rounded-2xl border border-gray-100 bg-pf-background py-4 px-5 text-sm font-bold text-pf-heading focus:border-pf-primary transition-all outline-none" />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full btn-primary py-5 rounded-2xl shadow-xl shadow-pf-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 mt-4 flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <div className="h-6 w-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Pay AED 5,000 & Confirm</>
                )}
              </button>
            </form>
          </div>
        )}

        {step === 3 && (
          <div className="p-8 md:p-14 text-center">
            <div className="mx-auto h-20 w-20 md:h-24 md:w-24 rounded-full bg-green-50 flex items-center justify-center text-green-500 mb-6 md:mb-8 shadow-inner">
              <CheckCircle2 size={44} className="animate-in zoom-in duration-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-pf-heading tracking-tight mb-4">Payment Successful!</h2>
            <p className="text-pf-muted font-medium mb-10 leading-relaxed">
              Booking confirmed for <span className="text-pf-heading font-black">{property.title}</span>.<br/><br/>
              A confirmation email with property details has been sent to <span className="text-pf-primary font-bold">your email</span> and a notification has been sent to the owner, <span className="text-pf-heading font-bold">{property.ownerName || 'Elena Petrova'}</span>.
            </p>
            <button 
              onClick={onClose}
              className="w-full py-5 rounded-2xl bg-pf-heading text-white font-black text-sm uppercase tracking-widest hover:bg-black transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
