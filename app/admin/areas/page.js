'use client';
import { useState } from 'react';
import { useListings } from '@/context/ListingContext';
import { Map, Plus, Trash2, Edit2, Save, X, Image as ImageIcon, ArrowUpRight } from 'lucide-react';

export default function AdminManageAreas() {
  const { areas, updateAreas } = useListings();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (area) => {
    setEditingId(area.id);
    setEditForm({ ...area });
  };

  const handleSave = () => {
    const updated = areas.map(a => a.id === editingId ? editForm : a);
    updateAreas(updated);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this area?')) {
      const updated = areas.filter(a => a.id !== id);
      updateAreas(updated);
    }
  };

  const handleAdd = () => {
    const newArea = {
      ...editForm,
      id: Date.now()
    };
    updateAreas([...areas, newArea]);
    setIsAdding(false);
    setEditForm(null);
  };

  const startAdding = () => {
    setIsAdding(true);
    setEditForm({ name: '', count: '', label: '', image: '' });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm({ ...editForm, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-16 animate-in fade-in duration-1000">
      <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-pf-accent">Atlas</p>
          <h1 className="font-serif italic text-5xl text-white">Premier <span className="font-normal not-italic">Neighbourhoods</span></h1>
        </div>
        {!isAdding && (
          <button 
            onClick={startAdding}
            className="btn-pill btn-primary text-black flex items-center gap-3"
          >
            <Plus size={18} /> New Territory
          </button>
        )}
      </div>

      {(isAdding || editingId) && editForm && (
        <div className="bg-pf-surface border border-pf-accent/30 p-12 md:p-16 animate-in slide-in-from-top-8 duration-700">
          <div className="flex items-center justify-between mb-12">
            <h3 className="font-serif italic text-3xl text-white">
              {isAdding ? 'Defining New Territory' : 'Refining Area Identity'}
            </h3>
            <button onClick={() => { setEditingId(null); setIsAdding(false); }} className="text-white/20 hover:text-white transition-colors">
              <X size={28} />
            </button>
          </div>
          
          <div className="grid gap-10 md:grid-cols-2">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/30 px-1">Area Name</label>
              <input 
                type="text" 
                value={editForm.name}
                onChange={e => setEditForm({...editForm, name: e.target.value})}
                className="w-full bg-white/5 border border-white/10 px-8 py-6 text-base font-medium text-white placeholder:text-white/10 focus:border-pf-accent transition-all outline-none"
                placeholder="e.g. Dubai Marina"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/30 px-1">Designated Label</label>
              <input 
                type="text" 
                value={editForm.label}
                onChange={e => setEditForm({...editForm, label: e.target.value})}
                className="w-full bg-white/5 border border-white/10 px-8 py-6 text-base font-medium text-white placeholder:text-white/10 focus:border-pf-accent transition-all outline-none"
                placeholder="e.g. Waterfront living"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/30 px-1">Active Inventory Count</label>
              <input 
                type="text" 
                value={editForm.count}
                onChange={e => setEditForm({...editForm, count: e.target.value})}
                className="w-full bg-white/5 border border-white/10 px-8 py-6 text-base font-medium text-white placeholder:text-white/10 focus:border-pf-accent transition-all outline-none"
                placeholder="e.g. 2,450 residences"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/30 px-1">Visual Backdrop</label>
              <div className="flex gap-6">
                <div className="flex-1 relative border-2 border-dashed border-white/10 bg-white/5 hover:border-pf-accent transition-all h-32 flex flex-col items-center justify-center cursor-pointer">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                  <ImageIcon size={24} className="text-white/10 mb-2" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Replace Media</span>
                </div>
                <div className="h-32 w-48 border border-white/10 overflow-hidden bg-pf-background flex items-center justify-center">
                  {editForm.image ? <img src={editForm.image} className="h-full w-full object-cover" /> : <ImageIcon className="text-white/5" />}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 flex justify-end gap-8">
            <button 
              onClick={() => { setEditingId(null); setIsAdding(false); }}
              className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-white transition-all"
            >
              Discard Entry
            </button>
            <button 
              onClick={isAdding ? handleAdd : handleSave}
              className="btn-pill btn-primary px-16 py-6 text-black flex items-center gap-4"
            >
              <Save size={18} /> {isAdding ? 'Establish Territory' : 'Finalise Identity'}
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        {areas.map((area) => (
          <div key={area.id} className="group relative h-[450px] bg-pf-surface overflow-hidden border border-white/5 hover:border-pf-accent/30 transition-all duration-1000">
            <img src={area.image} className="absolute inset-0 h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-pf-background via-pf-background/20 to-transparent" />
            
            <div className="absolute inset-0 flex items-start justify-end p-6 z-20">
              <div className="flex flex-col gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                <button 
                  onClick={() => handleEdit(area)}
                  className="h-12 w-12 bg-white text-black flex items-center justify-center hover:bg-pf-accent hover:text-white transition-all"
                >
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(area.id)}
                  className="h-12 w-12 bg-white text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full p-10 space-y-6 z-10 transition-transform duration-500 group-hover:translate-y-[-10px]">
              <div className="space-y-2">
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-pf-accent">{area.label}</p>
                <h3 className="font-serif italic text-4xl text-white group-hover:text-pf-accent transition-colors">{area.name}</h3>
              </div>
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">{area.count}</p>
                <ArrowUpRight size={18} className="text-white/10 group-hover:text-pf-accent transition-colors" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
