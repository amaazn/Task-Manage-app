// "use client";

// import { CheckSquare, LogIn, UserPlus } from "lucide-react";

// export default function Sidebar() {
//   return (
//     <div className="w-64 bg-white border-r shadow-sm flex flex-col justify-between h-screen">

//       <div>
//         {/* Logo */}
//         <div className="flex items-center gap-2 px-6 py-6">
//           <CheckSquare className="text-blue-600" size={28} />
//           <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//             TaskFlow
//           </span>
//         </div>

//         {/* Navigation */}
//         <div className="px-4 space-y-2">

//           <button className="flex items-center gap-3 w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow hover:opacity-90 transition">
//             <LogIn size={18} />
//             Login
//           </button>

//           <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100 transition">
//             <UserPlus size={18} />
//             Register
//           </button>

//         </div>
//       </div>

//       {/* Footer */}
//       <div className="px-6 py-6 text-sm text-gray-400">
//         TaskFlow © 2026
//       </div>

//     </div>
//   );
// }



// "use client";

// import { CheckSquare, LogIn, UserPlus } from "lucide-react";

// export default function Sidebar() {
//   return (
//     <div className="w-64 bg-[#FAFAFA] border-r border-gray-200/80 flex flex-col justify-between h-screen z-20 relative">

//       <div>
//         {/* Logo Section */}
//         <div className="flex items-center gap-3 px-6 py-8">
//           <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-900 text-white shadow-sm">
//             <CheckSquare size={18} strokeWidth={2.5} />
//           </div>
//           <span className="text-lg font-bold text-gray-900 tracking-tight">
//             TaskFlow
//           </span>
//         </div>

//         {/* Navigation */}
//         <div className="px-4 space-y-1.5">

//           {/* Active State (Login) */}
//           <button className="flex items-center gap-3 w-full px-3 py-2.5 bg-white border border-gray-200/80 text-gray-900 rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.03)] font-medium text-sm transition-all duration-200">
//             <LogIn size={18} className="text-gray-700" />
//             Login
//           </button>

//           {/* Inactive State (Register) */}
//           <button className="flex items-center gap-3 w-full px-3 py-2.5 text-gray-500 rounded-xl hover:bg-gray-100 hover:text-gray-900 font-medium text-sm transition-all duration-200">
//             <UserPlus size={18} />
//             Register
//           </button>

//         </div>
//       </div>

//       {/* Footer */}
//       <div className="px-6 py-8 text-xs font-medium text-gray-400">
//         TaskFlow © 2026
//       </div>

//     </div>
//   );
// }


"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckSquare, LogIn, UserPlus } from "lucide-react";

export default function Sidebar() {

  const pathname = usePathname();

  return (
    <div className="w-64 bg-[#FAFAFA] border-r border-gray-200/80 flex flex-col justify-between h-screen z-20 relative">

      <div>

        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-8">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-900 text-white shadow-sm">
            <CheckSquare size={18} strokeWidth={2.5} />
          </div>
          <span className="text-lg font-bold text-gray-900 tracking-tight">
            TaskFlow
          </span>
        </div>

        {/* Navigation */}
        <div className="px-4 space-y-1.5">

          {/* LOGIN */}
          <Link href="/login">

            <div
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200
              ${
                pathname === "/login"
                  ? "bg-white border border-gray-200 text-gray-900 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <LogIn size={18} />
              Login
            </div>

          </Link>

          {/* REGISTER */}
          <Link href="/register">

            <div
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200
              ${
                pathname === "/register"
                  ? "bg-white border border-gray-200 text-gray-900 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <UserPlus size={18} />
              Register
            </div>

          </Link>

        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-8 text-xs font-medium text-gray-400">
        TaskFlow © 2026
      </div>

    </div>
  );
}