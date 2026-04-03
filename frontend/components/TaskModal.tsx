"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { title: string; description: string }) => void;
  initialData?: { title: string; description: string };
  loading?: boolean;
}

export default function TaskModal({ isOpen, onClose, onSave, initialData, loading }: TaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Update fields when modal opens or editingTask changes
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [initialData, isOpen]);

  // This is the function that was missing/misnamed!
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, description });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden border border-white/20 animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-gray-50">
          <h2 className="text-xl font-black text-[#0f172a] tracking-tight">
            {initialData ? "Update Task" : "New Task"}
          </h2>
          <button 
            type="button"
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
              Task Title
            </label>
            <input
              required
              className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all"
              placeholder="Ex: Design system update"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
              Description
            </label>
            <textarea
              rows={4}
              className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all resize-none"
              placeholder="Describe the details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 border border-gray-200 rounded-2xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !title}
              className="flex-1 py-4 bg-[#0f172a] text-white rounded-2xl text-sm font-bold hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-95 disabled:opacity-50 transition-all"
            >
              {loading ? "Saving..." : initialData ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}