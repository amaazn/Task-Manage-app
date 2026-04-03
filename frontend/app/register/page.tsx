// "use client";

// import { useState } from "react";
// import Sidebar from "@/components/Sidebar";
// import { registerUser } from "@/services/authService";
// import { saveAuth } from "@/utils/auth";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";

// export default function RegisterPage() {
//   const router = useRouter();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [loading, setLoading] = useState(false);

//   const handleRegister = async (e: any) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const res = await registerUser({
//         name,
//         email,
//         password
//       });

//       saveAuth(res.accessToken);

//       toast.success("Account created successfully");

//       router.push("/dashboard");

//     } catch (error: any) {

//       toast.error(error.response?.data?.message || "Registration failed");

//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen">

//       <Sidebar />

//       <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100">

//         <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 border border-gray-200">

//           <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//             Create Account
//           </h1>

//           <p className="text-gray-500 text-center mb-8">
//             Start managing your tasks today
//           </p>

//           <form onSubmit={handleRegister} className="space-y-5">

//             <input
//               type="text"
//               placeholder="Full Name"
//               className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />

//             <input
//               type="email"
//               placeholder="Email address"
//               className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />

//             <input
//               type="password"
//               placeholder="Password"
//               className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-lg shadow-md"
//             >
//               {loading ? "Creating account..." : "Register"}
//             </button>

//           </form>

//           <p className="text-center text-gray-600 mt-6">

//             Already have an account?{" "}

//             <a
//               href="/login"
//               className="text-blue-600 hover:underline font-medium"
//             >
//               Login
//             </a>

//           </p>

//         </div>

//       </div>

//     </div>
//   );
// }


"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { registerUser } from "@/services/authService";
import { saveAuth } from "@/utils/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await registerUser({
        name,
        email,
        password
      });

      saveAuth(res.accessToken, name);

      toast.success("Account created successfully");

      router.push("/dashboard");

    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FAFAFA] relative font-sans">
      
      {/* Subtle Grid Background matching the reference image */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <Sidebar />

      <div className="flex flex-1 items-center justify-center p-6 z-10">
        
        {/* Premium White Card */}
        <div className="w-full max-w-[420px] bg-white rounded-3xl p-10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-gray-100">
          
          <h1 className="text-[26px] font-bold text-[#0f172a] mb-2 text-center tracking-tight">
            Create Your Account 🎉
          </h1>
          
          <p className="text-[#64748b] text-sm text-center mb-8">
            Sign up to start managing your tasks
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3.5 bg-transparent border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3.5 bg-transparent border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3.5 bg-transparent border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#0f172a] text-white rounded-xl font-medium text-sm hover:bg-[#1e293b] active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none transition-all"
              >
                {loading ? "Creating account..." : "Register"}
              </button>
            </div>

          </form>

          <p className="text-center text-[#64748b] text-sm mt-8">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#0f172a] font-semibold hover:underline"
            >
              Login
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}