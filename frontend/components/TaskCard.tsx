"use client";

import { CheckCircle2, Circle, Edit3, Trash2, Calendar } from "lucide-react";

export default function TaskCard({ task, onToggle, onEdit, onDelete }: any) {
  // Format the date (or use a hardcoded one if createdAt doesn't exist yet)
  const date = task.createdAt 
    ? new Date(task.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : "Apr 3, 2026";

  return (
    <div className={`relative group bg-white p-6 rounded-[1.25rem] border transition-all duration-300 flex flex-col justify-between min-h-[180px]
      ${task.completed 
        ? "border-emerald-100 shadow-sm" 
        : "border-gray-100 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.04)] hover:shadow-lg hover:border-indigo-100"
      }`}>
      
      {/* Edit/Delete Actions (Hidden by default, shows on hover) */}
      <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={onEdit} className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
          <Edit3 size={16} />
        </button>
        <button onClick={onDelete} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
          <Trash2 size={16} />
        </button>
      </div>

      <div className="flex gap-4 items-start">
        {/* Status Icon Toggle */}
        <button onClick={onToggle} className="mt-1 transition-transform active:scale-90">
          {task.completed ? (
            <CheckCircle2 className="text-emerald-500" size={22} />
          ) : (
            <Circle className="text-gray-300" size={22} />
          )}
        </button>

        {/* Text Content */}
        <div className="pr-8">
          <h3 className={`font-bold text-[16px] leading-tight mb-1 ${task.completed ? "text-gray-400 line-through" : "text-slate-800"}`}>
            {task.title}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
            {task.description || "No description provided."}
          </p>
        </div>
      </div>

      {/* Footer: Badge and Date */}
      <div className="mt-6 flex justify-between items-center">
        {/* Badge */}
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider
          ${task.completed 
            ? "bg-emerald-50 text-emerald-600" 
            : "bg-indigo-50 text-indigo-600"
          }`}>
          {task.completed ? "Done" : "Todo"}
        </span>

        {/* Date */}
        <div className="flex items-center gap-1.5 text-gray-400">
          <Calendar size={14} />
          <span className="text-[12px] font-medium">{date}</span>
        </div>
      </div>
    </div>
  );
}