'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Building2, 
  MapPin, 
  CircleDollarSign, 
  BedDouble, 
  Bath, 
  Maximize, 
  Image as ImageIcon, 
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Video,
  ArrowRight
} from 'lucide-react';
import { useListings } from '@/context/ListingContext';

const propertyTypes = ['Apartment', 'Villa', 'Townhouse', 'Penthouse', 'Office', 'Retail', 'Land'];
const transactionTypes = ['For Sale', 'For Rent'];

export default function AddListing() {
  const router = useRouter();
  const { addListing } = useListings();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    type: 'Apartment',
    transaction: 'For Sale',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    description: '',
    image: '',
    videoUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addListing(formData);
    alert('Property listed successfully!');
    router.push('/dashboard');
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  return (
    <div className="mx-auto max-w-4xl animate-in fade-in duration-1000">
      {/* Progress Stepper */}
      <div className="mb-20 flex items-center justify-between px-10">
        {[1, 2, 3].map((num) => (
          <div key={num} className="flex flex-1 items-center last:flex-none">
            <div className={`flex h-14 w-14 items-center justify-center border transition-all duration-700 ${
              step >= num ? 'border-pf-accent bg-pf-accent text-white scale-110' : 'border-white/10 text-white/20'
            }`}>
              {step > num ? <CheckCircle2 size={24} /> : <span className="font-serif italic text-xl">{num}</span>}
            </div>
            {num < 3 && (
              <div className={`mx-6 h-px flex-1 transition-all duration-1000 ${
                step > num ? 'bg-pf-accent' : 'bg-white/10'
              }`} />
            )}
          </div>
        ))}
      </div>

      <div className="bg-pf-surface border border-white/5 p-12 md:p-20 shadow-2xl">
        {step === 1 && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-pf-accent">Step 01</p>
              <h2 className="font-serif italic text-4xl text-white">Basic <span className="font-normal not-italic">Information</span></h2>
              <p className="text-white/30 text-sm font-medium">Define the core identity of your residence.</p>
            </div>

            <div className="space-y-10">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest px-1">Property Title</label>
                <input 
                  type="text" 
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. The Grand Penthouse"
                  className="w-full bg-white/5 border border-white/10 px-8 py-6 text-base font-medium text-white placeholder:text-white/10 focus:border-pf-accent transition-all outline-none"
                />
              </div>

              <div className="grid gap-10 md:grid-cols-2">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest px-1">Property Type</label>
                  <select 
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 px-8 py-6 text-base font-medium text-white focus:border-pf-accent transition-all outline-none appearance-none"
                  >
                    {propertyTypes.map(t => <option key={t} value={t} className="bg-pf-surface">{t}</option>)}
                  </select>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest px-1">Transaction</label>
                  <select 
                    name="transaction"
                    value={formData.transaction}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 px-8 py-6 text-base font-medium text-white focus:border-pf-accent transition-all outline-none appearance-none"
                  >
                    {transactionTypes.map(t => <option key={t} value={t} className="bg-pf-surface">{t}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-10">
              <button onClick={nextStep} className="btn-pill btn-primary px-16 py-6 text-black flex items-center gap-4 group">
                Next Stage <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-pf-accent">Step 02</p>
              <h2 className="font-serif italic text-4xl text-white">Location & <span className="font-normal not-italic">Valuation</span></h2>
              <p className="text-white/30 text-sm font-medium">Position your residence within the elite market.</p>
            </div>

            <div className="space-y-10">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest px-1">Location Address</label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-8 top-1/2 -translate-y-1/2 text-pf-accent" />
                  <input 
                    type="text" 
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Palm Jumeirah, Dubai"
                    className="w-full bg-white/5 border border-white/10 pl-16 pr-8 py-6 text-base font-medium text-white placeholder:text-white/10 focus:border-pf-accent transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest px-1">Asking Price (AED)</label>
                <div className="relative">
                  <CircleDollarSign size={18} className="absolute left-8 top-1/2 -translate-y-1/2 text-pf-accent" />
                  <input 
                    type="number" 
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="e.g. 5,500,000"
                    className="w-full bg-white/5 border border-white/10 pl-16 pr-8 py-6 text-base font-medium text-white placeholder:text-white/10 focus:border-pf-accent transition-all outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-10 md:grid-cols-3">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest px-1">Bedrooms</label>
                  <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} className="w-full bg-white/5 border border-white/10 px-8 py-6 text-base font-medium text-white focus:border-pf-accent outline-none" />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest px-1">Bathrooms</label>
                  <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} className="w-full bg-white/5 border border-white/10 px-8 py-6 text-base font-medium text-white focus:border-pf-accent outline-none" />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest px-1">Area (sqft)</label>
                  <input type="number" name="area" value={formData.area} onChange={handleChange} className="w-full bg-white/5 border border-white/10 px-8 py-6 text-base font-medium text-white focus:border-pf-accent outline-none" />
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-10">
              <button onClick={prevStep} className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-white transition-all flex items-center gap-4">
                <ChevronLeft size={20} /> Back
              </button>
              <button onClick={nextStep} className="btn-pill btn-primary px-16 py-6 text-black flex items-center gap-4 group">
                Next Stage <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-pf-accent">Step 03</p>
              <h2 className="font-serif italic text-4xl text-white">Visuals & <span className="font-normal not-italic">Narrative</span></h2>
              <p className="text-white/30 text-sm font-medium">Capture the essence and legacy of the property.</p>
            </div>

            <div className="space-y-12">
              {/* Image Upload */}
              <div className="space-y-6">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest px-1">Hero Image</label>
                <div className="relative group min-h-[300px] border border-white/10 bg-white/5 flex flex-col items-center justify-center transition-all hover:border-pf-accent/50 cursor-pointer overflow-hidden">
                  {formData.image ? (
                    <>
                      <img src={formData.image} alt="Preview" className="absolute inset-0 h-full w-full object-cover opacity-60" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button onClick={() => setFormData(prev => ({ ...prev, image: '' }))} className="px-8 py-4 bg-white text-black font-black text-[10px] uppercase tracking-widest">Replace Media</button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-12 space-y-4">
                      <ImageIcon size={40} className="mx-auto text-white/10 group-hover:text-pf-accent transition-colors" />
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 group-hover:text-white transition-colors">Select High-Resolution Image</p>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setFormData(prev => ({ ...prev, image: reader.result }));
                      reader.readAsDataURL(file);
                    }
                  }} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
              </div>

              <div className="space-y-6">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest px-1">Editorial Description</label>
                <textarea 
                  rows={6}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the architectural language, interior craftsmanship, and the lifestyle this residence offers..."
                  className="w-full bg-white/5 border border-white/10 px-8 py-8 text-base font-medium text-white placeholder:text-white/10 focus:border-pf-accent transition-all outline-none font-serif italic"
                />
              </div>
            </div>

            <div className="flex justify-between pt-10">
              <button onClick={prevStep} className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-white transition-all flex items-center gap-4">
                <ChevronLeft size={20} /> Back
              </button>
              <button onClick={handleSubmit} className="btn-pill btn-primary px-16 py-6 text-black flex items-center gap-4 group">
                Publish Collection <CheckCircle2 size={20} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
