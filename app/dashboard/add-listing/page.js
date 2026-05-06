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
  Video
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
    <div className="mx-auto max-w-4xl">
      {/* Progress Stepper */}
      <div className="mb-12 flex items-center justify-between px-4">
        {[1, 2, 3].map((num) => (
          <div key={num} className="flex flex-1 items-center last:flex-none">
            <div className={`flex h-12 w-12 items-center justify-center rounded-full border-2 font-bold transition-all duration-300 ${
              step >= num ? 'border-pf-primary bg-pf-primary text-white scale-110 shadow-lg shadow-pf-primary/20' : 'border-gray-200 text-pf-muted'
            }`}>
              {step > num ? <CheckCircle2 size={24} /> : num}
            </div>
            {num < 3 && (
              <div className={`mx-4 h-1 flex-1 rounded transition-colors duration-500 ${
                step > num ? 'bg-pf-primary' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      <div className="pf-card border border-gray-100 bg-white p-8 md:p-12 shadow-2xl shadow-gray-200/50">
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-3xl font-black text-pf-heading">Basic Information</h2>
              <p className="mt-2 text-pf-muted">Let's start with the essential details of your property.</p>
            </div>

            <div className="grid gap-8">
              <div className="space-y-3">
                <label className="text-sm font-bold text-pf-heading uppercase tracking-wider">Property Title</label>
                <input 
                  type="text" 
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Modern Penthouse with Burj View"
                  className="w-full rounded-[20px] border border-gray-200 bg-gray-50 px-6 py-5 text-sm font-medium focus:border-pf-primary focus:outline-none focus:ring-4 focus:ring-pf-primary/5 transition-all"
                />
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-pf-heading uppercase tracking-wider">Property Type</label>
                  <select 
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full rounded-[20px] border border-gray-200 bg-gray-50 px-6 py-5 text-sm font-medium focus:border-pf-primary focus:outline-none transition-all appearance-none"
                  >
                    {propertyTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-pf-heading uppercase tracking-wider">Transaction Type</label>
                  <select 
                    name="transaction"
                    value={formData.transaction}
                    onChange={handleChange}
                    className="w-full rounded-[20px] border border-gray-200 bg-gray-50 px-6 py-5 text-sm font-medium focus:border-pf-primary focus:outline-none transition-all appearance-none"
                  >
                    {transactionTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button onClick={nextStep} className="btn-primary flex items-center gap-3 px-12 py-5 rounded-2xl text-base font-bold shadow-xl shadow-pf-primary/20 hover:scale-105 active:scale-95 transition-all">
                Next Step <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-3xl font-black text-pf-heading">Location & Pricing</h2>
              <p className="mt-2 text-pf-muted">Where is it located and what is your asking price?</p>
            </div>

            <div className="grid gap-8">
              <div className="space-y-3">
                <label className="text-sm font-bold text-pf-heading flex items-center gap-2 uppercase tracking-wider">
                  <MapPin size={18} className="text-pf-primary" /> Location
                </label>
                <input 
                  type="text" 
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Dubai Marina, Dubai"
                  className="w-full rounded-[20px] border border-gray-200 bg-gray-50 px-6 py-5 text-sm font-medium focus:border-pf-primary focus:outline-none focus:ring-4 focus:ring-pf-primary/5 transition-all"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-pf-heading flex items-center gap-2 uppercase tracking-wider">
                  <CircleDollarSign size={18} className="text-pf-primary" /> Price (AED)
                </label>
                <input 
                  type="number" 
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g. 2,500,000"
                  className="w-full rounded-[20px] border border-gray-200 bg-gray-50 px-6 py-5 text-sm font-medium focus:border-pf-primary focus:outline-none focus:ring-4 focus:ring-pf-primary/5 transition-all"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-pf-heading flex items-center gap-2 uppercase tracking-wider">
                    <BedDouble size={18} className="text-pf-primary" /> Beds
                  </label>
                  <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} className="w-full rounded-[20px] border border-gray-200 bg-gray-50 px-6 py-5 text-sm font-medium" />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-pf-heading flex items-center gap-2 uppercase tracking-wider">
                    <Bath size={18} className="text-pf-primary" /> Baths
                  </label>
                  <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} className="w-full rounded-[20px] border border-gray-200 bg-gray-50 px-6 py-5 text-sm font-medium" />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-pf-heading flex items-center gap-2 uppercase tracking-wider">
                    <Maximize size={18} className="text-pf-primary" /> Area (sqft)
                  </label>
                  <input type="number" name="area" value={formData.area} onChange={handleChange} className="w-full rounded-[20px] border border-gray-200 bg-gray-50 px-6 py-5 text-sm font-medium" />
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button onClick={prevStep} className="btn-secondary flex items-center gap-3 px-10 py-5 rounded-2xl text-base font-bold transition-all">
                <ChevronLeft size={20} /> Back
              </button>
              <button onClick={nextStep} className="btn-primary flex items-center gap-3 px-12 py-5 rounded-2xl text-base font-bold shadow-xl shadow-pf-primary/20 hover:scale-105 active:scale-95 transition-all">
                Next Step <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-3xl font-black text-pf-heading">Images & Video</h2>
              <p className="mt-2 text-pf-muted">Upload high-quality visuals to make your listing stand out.</p>
            </div>

            <div className="grid gap-8">
              {/* Image Upload */}
              <div className="space-y-4">
                <label className="text-sm font-black text-pf-heading flex items-center gap-2 uppercase tracking-widest">
                  <ImageIcon size={18} className="text-pf-primary" /> Property Image
                </label>
                <div className="relative group">
                  <div className={`relative flex flex-col items-center justify-center rounded-[32px] border-2 border-dashed transition-all duration-300 min-h-[240px] overflow-hidden ${
                    formData.image ? 'border-pf-primary bg-pf-primary/5' : 'border-slate-200 bg-slate-50 hover:border-pf-primary hover:bg-slate-100'
                  }`}>
                    {formData.image ? (
                      <>
                        <img src={formData.image} alt="Preview" className="absolute inset-0 h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                          <button 
                            onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                            className="bg-white text-red-500 p-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-110 transition-transform"
                          >
                            Remove Image
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-8">
                        <div className="h-16 w-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400 mx-auto mb-4 group-hover:text-pf-primary group-hover:scale-110 transition-all">
                          <ImageIcon size={32} />
                        </div>
                        <p className="text-sm font-black text-slate-900">Click to upload image</p>
                        <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">PNG, JPG or WebP (Max 5MB)</p>
                      </div>
                    )}
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData(prev => ({ ...prev, image: reader.result }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Video Upload */}
              <div className="space-y-4">
                <label className="text-sm font-black text-pf-heading flex items-center gap-2 uppercase tracking-widest">
                  <Video size={18} className="text-pf-primary" /> Property Video
                </label>
                <div className="relative group">
                  <div className={`relative flex flex-col items-center justify-center rounded-[32px] border-2 border-dashed transition-all duration-300 min-h-[160px] overflow-hidden ${
                    formData.videoUrl ? 'border-pf-primary bg-pf-primary/5' : 'border-slate-200 bg-slate-50 hover:border-pf-primary hover:bg-slate-100'
                  }`}>
                    {formData.videoUrl ? (
                      <div className="flex items-center gap-4 p-6 w-full">
                        <div className="h-12 w-12 rounded-xl bg-pf-primary/10 flex items-center justify-center text-pf-primary">
                          <Video size={24} />
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <p className="text-sm font-black text-slate-900 truncate">Video uploaded successfully</p>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ready for processing</p>
                        </div>
                        <button 
                          onClick={() => setFormData(prev => ({ ...prev, videoUrl: '' }))}
                          className="text-red-500 font-black text-[10px] uppercase tracking-widest hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="text-center p-6">
                        <p className="text-sm font-black text-slate-900">Upload property video</p>
                        <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">MP4 or MOV (Max 20MB)</p>
                      </div>
                    )}
                    <input 
                      type="file" 
                      accept="video/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          // For large videos, we'd normally upload to a server.
                          // Here we use a fake path or small base64 for demo purposes.
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData(prev => ({ ...prev, videoUrl: reader.result }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-black text-pf-heading uppercase tracking-widest">Detailed Description</label>
                <textarea 
                  rows={5}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell us more about the property, its features, and the neighborhood..."
                  className="w-full rounded-[24px] border border-slate-100 bg-slate-50 px-8 py-6 text-sm font-bold text-slate-700 focus:border-pf-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-pf-primary/5 transition-all placeholder:text-slate-300"
                />
              </div>
            </div>

            <div className="flex justify-between pt-8">
              <button onClick={prevStep} className="flex items-center gap-3 px-10 py-5 rounded-2xl text-sm font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 hover:text-pf-primary transition-all">
                <ChevronLeft size={20} /> Back
              </button>
              <button onClick={handleSubmit} className="flex items-center gap-3 px-12 py-5 rounded-3xl bg-pf-primary text-white text-base font-black uppercase tracking-widest shadow-2xl shadow-pf-primary/30 hover:scale-105 active:scale-95 transition-all">
                Submit Listing <CheckCircle2 size={24} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
