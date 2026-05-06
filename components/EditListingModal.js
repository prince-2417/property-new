'use client';
import { useState, useEffect } from 'react';
import { 
  X, 
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
  Video
} from 'lucide-react';
import { useListings } from '@/context/ListingContext';

const propertyTypes = ['Apartment', 'Villa', 'Townhouse', 'Penthouse', 'Office', 'Retail', 'Land'];
const transactionTypes = ['For Sale', 'For Rent'];

export default function EditListingModal({ listing, isOpen, onClose }) {
  const { updateListing } = useListings();
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

  useEffect(() => {
    if (listing) {
      setFormData({
        title: listing.title || '',
        type: listing.type || 'Apartment',
        transaction: listing.transaction || 'For Sale',
        price: listing.price || '',
        location: listing.location || '',
        bedrooms: listing.bedrooms || '',
        bathrooms: listing.bathrooms || '',
        area: listing.area || '',
        description: listing.description || '',
        image: listing.image || '',
        videoUrl: listing.videoUrl || '',
      });
    }
  }, [listing]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateListing(listing.id, formData);
    alert('Property updated successfully!');
    onClose();
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl bg-white rounded-[48px] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Edit Property</h2>
            <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Update your listing details</p>
          </div>
          <button onClick={onClose} className="p-3 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-pf-primary hover:border-pf-primary transition-all">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12">
          {/* Progress Stepper */}
          <div className="mb-12 flex items-center justify-between max-w-md mx-auto">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex flex-1 items-center last:flex-none">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-bold transition-all duration-300 ${
                  step >= num ? 'border-pf-primary bg-pf-primary text-white' : 'border-gray-200 text-pf-muted'
                }`}>
                  {step > num ? <CheckCircle2 size={20} /> : num}
                </div>
                {num < 3 && (
                  <div className={`mx-2 h-0.5 flex-1 rounded transition-colors duration-500 ${
                    step > num ? 'bg-pf-primary' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid gap-6">
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Property Title</label>
                  <input 
                    type="text" 
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4 text-sm font-bold focus:border-pf-primary focus:bg-white focus:outline-none transition-all"
                  />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Type</label>
                    <select name="type" value={formData.type} onChange={handleChange} className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4 text-sm font-bold appearance-none">
                      {propertyTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Transaction</label>
                    <select name="transaction" value={formData.transaction} onChange={handleChange} className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4 text-sm font-bold appearance-none">
                      {transactionTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <button onClick={nextStep} className="flex items-center gap-2 px-8 py-4 bg-pf-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-pf-primary/20 hover:scale-105 transition-all">
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid gap-6">
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <MapPin size={14} className="text-pf-primary" /> Location
                  </label>
                  <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4 text-sm font-bold" />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <CircleDollarSign size={14} className="text-pf-primary" /> Price (AED)
                  </label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4 text-sm font-bold" />
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <input type="number" name="bedrooms" placeholder="Beds" value={formData.bedrooms} onChange={handleChange} className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4 text-sm font-bold" />
                  <input type="number" name="bathrooms" placeholder="Baths" value={formData.bathrooms} onChange={handleChange} className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4 text-sm font-bold" />
                  <input type="number" name="area" placeholder="Area" value={formData.area} onChange={handleChange} className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4 text-sm font-bold" />
                </div>
              </div>
              <div className="flex justify-between pt-4">
                <button onClick={prevStep} className="px-8 py-4 text-slate-400 font-black text-xs uppercase tracking-widest hover:text-pf-primary transition-all">Back</button>
                <button onClick={nextStep} className="flex items-center gap-2 px-8 py-4 bg-pf-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-pf-primary/20 hover:scale-105 transition-all">
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid gap-6">
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Image Preview</label>
                  <div className="h-48 w-full rounded-3xl overflow-hidden border border-slate-100 bg-slate-50 flex items-center justify-center relative">
                    {formData.image ? (
                      <img src={formData.image} alt="Preview" className="h-full w-full object-cover" />
                    ) : (
                      <ImageIcon size={32} className="text-slate-300" />
                    )}
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => setFormData(prev => ({ ...prev, image: reader.result }));
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Description</label>
                  <textarea rows={4} name="description" value={formData.description} onChange={handleChange} className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4 text-sm font-bold" />
                </div>
              </div>
              <div className="flex justify-between pt-4">
                <button onClick={prevStep} className="px-8 py-4 text-slate-400 font-black text-xs uppercase tracking-widest hover:text-pf-primary transition-all">Back</button>
                <button onClick={handleSubmit} className="flex items-center gap-2 px-10 py-4 bg-pf-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-pf-primary/20 hover:scale-105 transition-all">
                  Update Listing <CheckCircle2 size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
