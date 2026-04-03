"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { loginUser } from "@/services/authService";
import { saveAuth } from "@/utils/auth";
import toast from "react-hot-toast";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      // We use : any to ensure we can read the properties without TS errors
      const res: any = await loginUser({ email, password });

      // 1. EXTRACTION: Check every possible place the token and name could be
      const token = res.accessToken || res.token || (res.data && res.data.accessToken);
      const userName = res.user?.name || res.name || "User";

      if (!token) {
        throw new Error("No access token received from server");
      }

      // 2. SAVE & REDIRECT
      saveAuth(token, userName);
      toast.success(`Welcome back, ${userName}!`);
      
      router.push("/dashboard");
      
      setTimeout(() => {
        router.refresh();
      }, 100);

    } catch (error: any) {
      console.error("Login error details:", error);

      // --- THE FIX FOR THE JSON BOX ---
      const errorData = error.response?.data;
      let finalMsg = "Invalid email or password";

      if (Array.isArray(errorData) && errorData.length > 0) {
        // If it's the Zod Array list, grab the first text message
        finalMsg = errorData[0].message;
      } else if (errorData?.message) {
        // If it's a simple error object
        finalMsg = errorData.message;
      }

      // This will show ONLY the clean text in the toast
      toast.error(finalMsg);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FAFAFA] relative font-sans overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      <Sidebar />

      <div className="flex flex-1 items-center justify-center p-6 z-10">
        <div className="w-full max-w-[400px] bg-white rounded-[1.5rem] p-10 shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_8px_16px_-4px_rgba(0,0,0,0.05),0_24px_32px_-8px_rgba(0,0,0,0.05)]">
          
          <h1 className="text-[28px] font-bold text-gray-900 tracking-tight mb-2 text-center">
            Welcome Back 👋
          </h1>
          
          <p className="text-gray-500 text-sm text-center mb-8 font-medium">
            Login to manage your tasks
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-gray-900/5 focus:border-gray-900 focus:bg-white transition-all"
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-gray-900/5 focus:border-gray-900 focus:bg-white transition-all"
            />

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-medium text-sm hover:bg-gray-800 transition-all disabled:opacity-70"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          <p className="text-center text-gray-500 text-sm mt-8 font-medium">
            Don't have an account?{" "}
            <Link href="/register" className="text-gray-900 font-semibold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}