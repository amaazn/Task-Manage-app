"use client";

import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask, toggleTaskStatus } from "@/services/taskService";
import { getUserName, logoutUser } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { 
  LogOut, 
  Plus, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  ListChecks, 
  CheckCircle2, 
  Clock, 
  Percent,
  CalendarDays,
  LayoutDashboard
} from "lucide-react";
import toast from "react-hot-toast";
import TaskCard from "@/components/TaskCard";
import TaskModal from "@/components/TaskModal";

export default function DashboardPage() {
  const router = useRouter();
  
  // State Management
  const [name, setName] = useState("");
  const [tasks, setTasks] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, progress: 0 });
  const [currentDate, setCurrentDate] = useState("");

  // Smart Header Scroll Logic
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    setName(getUserName() || "User");
    setCurrentDate(new Date().toLocaleDateString('en-US', { 
      weekday: 'long', month: 'long', day: 'numeric' 
    }));

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) setShowHeader(false);
      else setShowHeader(true);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const fetchTasks = async () => {
    try {
      const res = await getTasks({ search, status, page: currentPage, limit: 9 });
      if (res && res.tasks) {
        setTasks(res.tasks);
        setTotalPages(res.totalPages || 1);
        if (res.stats) setStats(res.stats);
      }
    } catch (error) {
      toast.error("Failed to load tasks");
    }
  };

  useEffect(() => { fetchTasks(); }, [search, status, currentPage]);
  useEffect(() => { setCurrentPage(1); }, [search, status]);

  const handleLogout = () => { logoutUser(); router.push("/login"); };

  const handleSaveTask = async (data: { title: string; description: string }) => {
    try {
      setModalLoading(true);
      editingTask ? await updateTask(editingTask.id, data) : await createTask(data);
      toast.success(editingTask ? "Task updated" : "Task created");
      setIsModalOpen(false);
      fetchTasks();
    } catch { toast.error("Operation failed"); } finally { setModalLoading(false); }
  };

  const handleToggle = async (id: string) => { try { await toggleTaskStatus(id); fetchTasks(); } catch { toast.error("Error"); } };
  const handleDelete = async (id: string) => { if (confirm("Delete?")) try { await deleteTask(id); fetchTasks(); } catch { toast.error("Error"); } };

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="min-h-screen bg-[#FAFAFA] relative font-sans">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none fixed" />

      {/* --- SMART HEADER WITH LOGO --- */}
      <div 
        className={`bg-white/80 backdrop-blur-2xl border-b border-gray-100 sticky top-0 z-50 transition-transform duration-500 ease-in-out
        ${showHeader ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="max-w-7xl mx-auto px-10 py-4 flex justify-between items-center">
          
          <div className="flex items-center gap-8">
            {/* BRAND LOGO SECTION */}
            <div className="flex items-center gap-3 pr-8 border-r border-gray-100">
               <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-100 transition-transform hover:rotate-12">
                  <ListChecks size={20} className="text-white" />
               </div>
               <span className="hidden md:block font-black text-slate-900 tracking-tighter text-lg">TaskManage</span>
            </div>

            {/* USER INFO SECTION */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex w-10 h-10 rounded-xl bg-gray-900 items-center justify-center text-white text-xs font-black shadow-sm">
                 {name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest leading-none mb-1">{greeting}</p>
                <h1 className="text-lg font-black text-slate-900 leading-none">
                  Welcome, <span className="text-indigo-600">{name}</span>
                </h1>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                <CalendarDays size={14} className="text-slate-400" />
                <span className="text-[10px] font-black text-slate-500 uppercase">{currentDate}</span>
             </div>

             <button 
                onClick={handleLogout} 
                className="group flex items-center gap-2 bg-white border border-gray-100 hover:border-red-100 hover:bg-red-50 px-4 py-2.5 rounded-xl transition-all shadow-sm"
             >
                <LogOut size={16} className="text-gray-400 group-hover:text-red-500" />
                <span className="text-xs font-bold text-gray-500 group-hover:text-red-600">Logout</span>
             </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 px-10">
        
        {/* STATS SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
          <StatCard title="Total" value={stats.total} icon={<ListChecks size={20} className="text-indigo-600" />} color="bg-indigo-50" />
          <StatCard title="Completed" value={stats.completed} icon={<CheckCircle2 size={20} className="text-emerald-600" />} color="bg-emerald-50" />
          <StatCard title="Pending" value={stats.pending} icon={<Clock size={20} className="text-amber-600" />} color="bg-amber-50" />
          
          <div className="bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-sm flex items-center gap-5">
             <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-blue-50">
                <Percent size={20} className="text-blue-600" />
             </div>
             <div className="flex-1">
                <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">Progress</p>
                <div className="flex items-end gap-2 mb-1">
                   <h2 className="text-2xl font-black text-slate-800 leading-none">{stats.progress}%</h2>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                   <div className="bg-blue-600 h-full transition-all duration-500" style={{ width: `${stats.progress}%` }} />
                </div>
             </div>
          </div>
        </div>

        {/* Controls */}
        <div className="py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center border border-gray-200 rounded-xl px-4 py-2.5 bg-white shadow-sm w-full sm:w-72 focus-within:border-indigo-400 transition-all">
              <Search size={16} className="text-gray-400 mr-2"/>
              <input type="text" placeholder="Search tasks..." className="outline-none bg-transparent w-full text-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <select className="border border-gray-200 rounded-xl px-4 py-2.5 bg-white shadow-sm text-sm font-bold" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="all">All Tasks</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <button onClick={() => { setEditingTask(null); setIsModalOpen(true); }} className="flex items-center gap-2 bg-[#0f172a] hover:bg-indigo-600 text-white px-8 py-3.5 rounded-2xl text-sm font-black transition-all shadow-xl active:scale-95">
            <Plus size={18}/> New Task
          </button>
        </div>

        {/* Task Grid (3x3 logic with limit 9) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onToggle={() => handleToggle(task.id)} onEdit={() => { setEditingTask(task); setIsModalOpen(true); }} onDelete={() => handleDelete(task.id)} />
          ))}
        </div>

        {/* Pagination UI */}
        {tasks.length > 0 && (
          <div className="py-16 flex items-center justify-center gap-6">
            <button 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(prev => prev - 1)} 
              className="p-3 border border-gray-200 rounded-2xl bg-white hover:border-indigo-200 transition-all disabled:opacity-40"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm font-black">
               <span className="text-sm text-slate-800">{currentPage}</span>
               <span className="text-[10px] text-gray-300 uppercase">of</span>
               <span className="text-sm text-slate-800">{totalPages}</span>
            </div>
            <button 
              disabled={currentPage === totalPages} 
              onClick={() => setCurrentPage(prev => prev + 1)} 
              className="p-3 border border-gray-200 rounded-2xl bg-white hover:border-indigo-200 transition-all disabled:opacity-40"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveTask} initialData={editingTask} loading={modalLoading} />
    </div>
  );
}

function StatCard({ title, value, icon, color }: any) {
  return (
    <div className="bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-sm flex items-center gap-5 transition-all hover:shadow-md hover:-translate-y-1">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-1 leading-none">{title}</p>
        <h2 className="text-2xl font-black text-slate-800 leading-none">{value}</h2>
      </div>
    </div>
  );
}