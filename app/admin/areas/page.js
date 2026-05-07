'use client';
import { useState } from 'react';
import { useListings } from '@/context/ListingContext';
import { Map, Plus, Trash2, Edit2, Save, X, Image as ImageIcon } from 'lucide-react';

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
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Premier Neighbourhoods</h1>
          <p className="text-slate-500 font-bold mt-1 uppercase tracking-widest text-xs">Manage home page area highlights</p>
        </div>
        {!isAdding && (
          <button 
            onClick={startAdding}
            className="flex items-center gap-2 rounded-2xl bg-pf-primary px-6 py-3 text-sm font-black text-white shadow-xl shadow-pf-primary/20 hover:scale-105 active:scale-95 transition-all"
          >
            <Plus size={18} /> Add Area
          </button>
        )}
      </div>

      {(isAdding || editingId) && editForm && (
        <div className="pf-card p-10 border-2 border-pf-primary/20 bg-pf-primary/[0.02]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-pf-heading uppercase tracking-widest">
              {isAdding ? 'Add New Area' : 'Edit Area'}
            </h3>
            <button onClick={() => { setEditingId(null); setIsAdding(false); }} className="text-slate-400 hover:text-pf-heading">
              <X size={24} />
            </button>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Area Name</label>
              <input 
                type="text" 
                value={editForm.name}
                onChange={e => setEditForm({...editForm, name: e.target.value})}
                className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold focus:border-pf-primary outline-none transition-all"
                placeholder="e.g. Dubai Marina"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Tagline / Label</label>
              <input 
                type="text" 
                value={editForm.label}
                onChange={e => setEditForm({...editForm, label: e.target.value})}
                className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold focus:border-pf-primary outline-none transition-all"
                placeholder="e.g. Waterfront living"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Listing Count Text</label>
              <input 
                type="text" 
                value={editForm.count}
                onChange={e => setEditForm({...editForm, count: e.target.value})}
                className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold focus:border-pf-primary outline-none transition-all"
                placeholder="e.g. 2,450 listings"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Area Image</label>
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-full rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-4 text-sm font-bold text-slate-400 flex items-center justify-center gap-3">
                    <ImageIcon size={20} />
                    <span>{editForm.image ? 'Change Image' : 'Upload Image'}</span>
                  </div>
                </div>
                <div className="h-14 w-14 rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center">
                  {editForm.image ? <img src={editForm.image} className="h-full w-full object-cover" /> : <ImageIcon className="text-slate-300" />}
                </div>
              </div>
              <p className="text-[9px] text-slate-400 ml-1 mt-1">* Recommended size: 600x800px</p>
            </div>
          </div>
          
          <div className="mt-10 flex justify-end gap-4">
            <button 
              onClick={() => { setEditingId(null); setIsAdding(false); }}
              className="px-8 py-4 text-sm font-black uppercase tracking-widest text-slate-400 hover:text-pf-heading transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={isAdding ? handleAdd : handleSave}
              className="flex items-center gap-2 rounded-2xl bg-slate-900 px-10 py-4 text-sm font-black uppercase tracking-widest text-white shadow-xl hover:bg-pf-primary transition-all"
            >
              <Save size={18} /> {isAdding ? 'Add Area' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {areas.map((area) => (
          <div key={area.id} className="pf-card group relative h-80 overflow-hidden rounded-[32px] border-none shadow-sm hover:shadow-2xl transition-all duration-700">
            <img src={area.image} className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-pf-heading/90 via-pf-heading/20 to-transparent" />
            
            <div className="absolute inset-0 flex items-start justify-end p-4 z-20">
              <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                <button 
                  onClick={() => handleEdit(area)}
                  className="h-10 w-10 rounded-xl bg-white/90 backdrop-blur text-pf-heading flex items-center justify-center hover:bg-pf-primary hover:text-white shadow-lg transition-all"
                >
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(area.id)}
                  className="h-10 w-10 rounded-xl bg-white/90 backdrop-blur text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white shadow-lg transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full p-8 transition-transform duration-500 group-hover:translate-y-[-10px] z-10">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-pf-primary mb-2">{area.label}</p>
              <h3 className="text-2xl font-black text-white tracking-tight leading-none">{area.name}</h3>
              <p className="mt-4 text-xs font-bold text-white/50 uppercase tracking-widest">{area.count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
