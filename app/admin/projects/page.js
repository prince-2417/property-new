'use client';
import { useState } from 'react';
import { useListings } from '@/context/ListingContext';
import { Building2, Plus, Trash2, Edit2, Save, X, Image as ImageIcon } from 'lucide-react';

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
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Signature Projects</h1>
          <p className="text-slate-500 font-bold mt-1 uppercase tracking-widest text-xs">Manage home page featured developments</p>
        </div>
        {!isAdding && (
          <button 
            onClick={startAdding}
            className="flex items-center gap-2 rounded-2xl bg-pf-primary px-6 py-3 text-sm font-black text-white shadow-xl shadow-pf-primary/20 hover:scale-105 active:scale-95 transition-all"
          >
            <Plus size={18} /> Add Project
          </button>
        )}
      </div>

      {(isAdding || editingId) && editForm && (
        <div className="pf-card p-10 border-2 border-pf-primary/20 bg-pf-primary/[0.02]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-pf-heading uppercase tracking-widest">
              {isAdding ? 'Add New Project' : 'Edit Project'}
            </h3>
            <button onClick={() => { setEditingId(null); setIsAdding(false); }} className="text-slate-400 hover:text-pf-heading">
              <X size={24} />
            </button>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Project Title</label>
              <input 
                type="text" 
                value={editForm.title}
                onChange={e => setEditForm({...editForm, title: e.target.value})}
                className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold focus:border-pf-primary outline-none transition-all"
                placeholder="e.g. Marina Heights"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Location</label>
              <input 
                type="text" 
                value={editForm.location}
                onChange={e => setEditForm({...editForm, location: e.target.value})}
                className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold focus:border-pf-primary outline-none transition-all"
                placeholder="e.g. Dubai Marina"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Price Range</label>
              <input 
                type="text" 
                value={editForm.price}
                onChange={e => setEditForm({...editForm, price: e.target.value})}
                className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold focus:border-pf-primary outline-none transition-all"
                placeholder="e.g. From AED 3.4M"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Status</label>
              <input 
                type="text" 
                value={editForm.status}
                onChange={e => setEditForm({...editForm, status: e.target.value})}
                className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold focus:border-pf-primary outline-none transition-all"
                placeholder="e.g. Ready to move"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Project Image</label>
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
              <Save size={18} /> {isAdding ? 'Add Project' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div key={project.id} className="pf-card group overflow-hidden bg-white border border-slate-100 hover:shadow-2xl transition-all duration-500">
            <div className="relative h-48 overflow-hidden">
              <img src={project.image} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-pf-heading/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-start justify-end p-4 z-20">
                <div className="flex flex-col gap-2 transform translate-x-4 group-hover:translate-x-0 transition-transform duration-500">
                  <button 
                    onClick={() => handleEdit(project)}
                    className="h-10 w-10 rounded-xl bg-white text-pf-heading flex items-center justify-center hover:bg-pf-primary hover:text-white shadow-lg transition-all"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(project.id)}
                    className="h-10 w-10 rounded-xl bg-white text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white shadow-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-8">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-pf-primary bg-pf-primary/5 px-3 py-1 rounded-lg border border-pf-primary/10">
                {project.status}
              </span>
              <h3 className="text-xl font-black text-pf-heading mt-4 tracking-tight">{project.title}</h3>
              <p className="text-sm font-bold text-slate-400 mt-1">{project.location}</p>
              <div className="mt-6 flex items-center justify-between border-t border-slate-50 pt-6">
                <span className="text-lg font-black text-pf-heading">{project.price}</span>
                <Building2 size={20} className="text-slate-100" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
