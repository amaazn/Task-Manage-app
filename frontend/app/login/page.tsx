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
      const res = await loginUser({ email, password });

      // Safety check: Fallback to "User" if name is missing from backend
      const userName = res.user?.name || res.name || "User";
      const token = res.accessToken;

      if (!token) {
        throw new Error("No access token received");
      }

      // Save credentials to localStorage
      saveAuth(token, userName);

      toast.success("Welcome back!");
      
      // Navigate to dashboard
      router.push("/dashboard");
      
      // Delay refresh slightly to ensure navigation starts
      setTimeout(() => {
        router.refresh();
      }, 100);

    } catch (error: any) {
      console.error("Login error details:", error);
      const errorMsg = error.response?.data?.message || "Invalid email or password";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FAFAFA] relative font-sans overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gray-300/30 rounded-full blur-[100px] pointer-events-none" />

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
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-900/5 focus:border-gray-900 focus:bg-white transition-all duration-200"
            />

            <input
              type="password"
              placeholder="Password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-900/5 focus:border-gray-900 focus:bg-white transition-all duration-200"
            />

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-medium text-sm hover:bg-gray-800 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.3)] active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          <p className="text-center text-gray-500 text-sm mt-8 font-medium">
            Don't have an account?{" "}
            <Link href="/register" className="text-gray-900 font-semibold cursor-pointer hover:underline underline-offset-4 decoration-gray-300 transition-all">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}