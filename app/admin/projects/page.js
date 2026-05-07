'use client';
import { useState } from 'react';
import { useListings } from '@/context/ListingContext';
import { Building2, Plus, Trash2, Edit2, Save, X, Image as ImageIcon, ArrowUpRight } from 'lucide-react';

export default function AdminManageProjects() {
  const { projects, updateProjects } = useListings();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (project) => {
    setEditingId(project.id);
    setEditForm({ ...project });
  };

  const handleSave = () => {
    const updated = projects.map(p => p.id === editingId ? editForm : p);
    updateProjects(updated);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this project?')) {
      const updated = projects.filter(p => p.id !== id);
      updateProjects(updated);
    }
  };

  const handleAdd = () => {
    const newProject = {
      ...editForm,
      id: Date.now()
    };
    updateProjects([...projects, newProject]);
    setIsAdding(false);
    setEditForm(null);
  };

  const startAdding = () => {
    setIsAdding(true);
    setEditForm({ title: '', location: '', price: '', status: '', image: '' });
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
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-pf-accent">Portfolio</p>
          <h1 className="font-serif italic text-5xl text-white">Signature <span className="font-normal not-italic">Developments</span></h1>
        </div>
        {!isAdding && (
          <button 
            onClick={startAdding}
            className="btn-pill btn-primary text-black flex items-center gap-3"
          >
            <Plus size={18} /> New Project
          </button>
        )}
      </div>

      {(isAdding || editingId) && editForm && (
        <div className="bg-pf-surface border border-pf-accent/30 p-12 md:p-16 animate-in slide-in-from-top-8 duration-700">
          <div className="flex items-center justify-between mb-12">
            <h3 className="font-serif italic text-3xl text-white">
              {isAdding ? 'Initialising New Project' : 'Modifying Project Legacy'}
            </h3>
            <button onClick={() => { setEditingId(null); setIsAdding(false); }} className="text-white/20 hover:text-white transition-colors">
              <X size={28} />
            </button>
          </div>
          
          <div className="grid gap-10 md:grid-cols-2">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/30 px-1">Project Identity</label>
              <input 
                type="text" 
                value={editForm.title}
                onChange={e => setEditForm({...editForm, title: e.target.value})}
                className="w-full bg-white/5 border border-white/10 px-8 py-6 text-base font-medium text-white placeholder:text-white/10 focus:border-pf-accent transition-all outline-none"
                placeholder="Project Title"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/30 px-1">Prime Location</label>
              <input 
                type="text" 
                value={editForm.location}
                onChange={e => setEditForm({...editForm, location: e.target.value})}
                className="w-full bg-white/5 border border-white/10 px-8 py-6 text-base font-medium text-white placeholder:text-white/10 focus:border-pf-accent transition-all outline-none"
                placeholder="Location"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/30 px-1">Valuation Range</label>
              <input 
                type="text" 
                value={editForm.price}
                onChange={e => setEditForm({...editForm, price: e.target.value})}
                className="w-full bg-white/5 border border-white/10 px-8 py-6 text-base font-medium text-white placeholder:text-white/10 focus:border-pf-accent transition-all outline-none"
                placeholder="e.g. From AED 5M"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/30 px-1">Collection Status</label>
              <input 
                type="text" 
                value={editForm.status}
                onChange={e => setEditForm({...editForm, status: e.target.value})}
                className="w-full bg-white/5 border border-white/10 px-8 py-6 text-base font-medium text-white placeholder:text-white/10 focus:border-pf-accent transition-all outline-none"
                placeholder="e.g. Limited Edition"
              />
            </div>
            <div className="md:col-span-2 space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/30 px-1">Development Visual</label>
              <div className="flex gap-6">
                <div className="flex-1 relative border-2 border-dashed border-white/10 bg-white/5 hover:border-pf-accent transition-all cursor-pointer h-32 flex flex-col items-center justify-center">
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
              Discard Changes
            </button>
            <button 
              onClick={isAdding ? handleAdd : handleSave}
              className="btn-pill btn-primary px-16 py-6 text-black flex items-center gap-4"
            >
              <Save size={18} /> {isAdding ? 'Commence Project' : 'Finalise Legacy'}
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div key={project.id} className="bg-pf-surface border border-white/5 group overflow-hidden transition-all duration-700 hover:border-pf-accent/30">
            <div className="relative h-64 overflow-hidden">
              <img src={project.image} className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 z-20">
                <button 
                  onClick={() => handleEdit(project)}
                  className="h-14 w-14 bg-white text-black flex items-center justify-center hover:bg-pf-accent hover:text-white transition-all"
                >
                  <Edit2 size={20} />
                </button>
                <button 
                  onClick={() => handleDelete(project.id)}
                  className="h-14 w-14 bg-white text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            <div className="p-10 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-pf-accent border border-pf-accent/20 px-3 py-1">
                  {project.status}
                </span>
                <Building2 size={16} className="text-white/10" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif italic text-3xl text-white group-hover:text-pf-accent transition-colors">{project.title}</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30">{project.location}</p>
              </div>
              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="font-serif text-xl text-white/60">{project.price}</span>
                <ArrowUpRight size={18} className="text-white/10 group-hover:text-pf-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
