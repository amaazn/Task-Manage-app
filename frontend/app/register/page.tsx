"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { registerUser } from "@/services/authService";
import { saveAuth } from "@/utils/auth";
import toast from "react-hot-toast";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      // 'as any' prevents TypeScript from being a pain during the build
      const res: any = await registerUser({ name, email, password });

      const token = res.accessToken || res.token || (res.data && res.data.accessToken);
      const displayName = res.user?.name || res.name || name || "User";

      if (token) {
        saveAuth(token, displayName);
        toast.success("Account created! Welcome to TaskFlow.");
        router.push("/dashboard");
      } else {
        toast.success("Registration successful! Please login.");
        router.push("/login");
      }

    } catch (error: any) {
      // --- THE NUCLEAR ERROR CLEANER ---
      const errorData = error.response?.data;
      let finalMessage = "Registration failed";

      // 1. If it's the Zod Array list we see in your screenshot: [ { message: "..." } ]
      if (Array.isArray(errorData) && errorData.length > 0) {
        // We grab ONLY the 'message' property from the first item
        finalMessage = errorData[0].message; 
      } 
      // 2. If it's a simple error object: { message: "..." }
      else if (errorData && typeof errorData === 'object' && errorData.message) {
        finalMessage = errorData.message;
      }
      // 3. If the backend just sent a raw string
      else if (typeof errorData === "string") {
        finalMessage = errorData;
      }
      // 4. Fallback if the above fails
      else {
        finalMessage = error.message || "An unexpected error occurred";
      }

      // We use String() to be 100% sure we are passing text, not an object
      toast.error(String(finalMessage));
      
      // Keep this for your terminal so you can see if the structure changes
      console.log("CLEANED MESSAGE:", finalMessage);

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
            Create Your Account 🎉
          </h1>
          <p className="text-gray-500 text-sm text-center mb-8 font-medium">
            Sign up to start managing your tasks
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-gray-900/5 focus:border-gray-900 focus:bg-white transition-all duration-200"
            />

            <input
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-gray-900/5 focus:border-gray-900 focus:bg-white transition-all duration-200"
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-gray-900/5 focus:border-gray-900 focus:bg-white transition-all duration-200"
            />

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-medium text-sm hover:bg-gray-800 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.3)] active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>

          <p className="text-center text-gray-500 text-sm mt-8 font-medium">
            Already have an account?{" "}
            <Link href="/login" className="text-gray-900 font-semibold cursor-pointer hover:underline underline-offset-4 transition-all">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}