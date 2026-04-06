"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, AlertCircle, Loader2, ArrowRight, ChevronLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.replace(callbackUrl);
    }
  }, [isAuthenticated, authLoading, router, callbackUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    setIsSubmitting(true);
    setError(null);
    const result = await login({ email: form.email, password: form.password }, callbackUrl);
    if (result.success) {
      // redirect is handled inside login() based on roleType
    } else {
      setError(result.error ?? "Login failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary/90 to-blue-900">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-primary p-12 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute top-1/3 -left-16 w-56 h-56 bg-white/5 rounded-full" />
        <div className="absolute -bottom-20 right-20 w-72 h-72 bg-accent-orange/10 rounded-full" />

        {/* Back to portal */}
        <div className="relative z-10 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-blue-300/70 hover:text-white text-xs font-medium transition-colors group"
          >
            <ChevronLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to portal selection
          </Link>
        </div>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl overflow-hidden ring-2 ring-white/20 shadow-lg">
            <Image src="/logo.svg" alt="OrionX" width={48} height={48} priority />
          </div>
          <div>
            <span className="text-white text-2xl font-bold tracking-wide">OrionX</span>
            <p className="text-blue-300 text-xs font-medium tracking-widest uppercase">Admin / IT Portal</p>
          </div>
        </div>

        {/* Hero text */}
        <div className="relative z-10">
          <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight">
            Streamline Your
            <br />
            <span className="text-accent-orange">IT Operations</span>
          </h1>
          <p className="mt-4 text-blue-200 text-base leading-relaxed max-w-sm">
            Manage incidents, assets, vendors, and employee workflows in one powerful platform.
          </p>
          {/* Feature badges */}
          <div className="mt-8 flex flex-wrap gap-3">
            {["Incident Management", "Asset Tracking", "Change Control", "Employee Lifecycle"].map((f) => (
              <span
                key={f}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-100 bg-white/10 px-3 py-1.5 rounded-full border border-white/10"
              >
                <span className="w-1.5 h-1.5 bg-accent-orange rounded-full" />
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10">
          <p className="text-blue-400 text-xs">
            &copy; {new Date().getFullYear()} OrionX. Enterprise IT Service Management.
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-6 md:p-12">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl overflow-hidden">
            <Image src="/logo.svg" alt="OrionX" width={40} height={40} priority />
          </div>
          <span className="text-primary text-xl font-bold">OrionX</span>
        </div>

        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-white text-[11px] font-bold uppercase tracking-wider bg-primary">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                Admin / IT Portal Access
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
              <p className="text-gray-500 text-sm mt-1.5">
                Sign in to your OrionX Admin account to continue.
              </p>
            </div>

            {/* Demo credentials hint */}
            <div className="mb-6 p-3.5 rounded-xl bg-primary/5 border border-primary/10 space-y-2">
              <p className="text-xs font-semibold text-primary">Demo Credentials</p>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold bg-primary text-white px-2 py-0.5 rounded-full">Admin</span>
                <span className="text-xs text-gray-600 font-mono">admin@orionx.com / Admin@123</span>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 flex items-center gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm animate-fade-in">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@orionx.com"
                    value={form.email}
                    onChange={handleChange}
                    className={cn(
                      "input-field pl-10",
                      error && "border-red-300 focus:border-red-400 focus:ring-red-200"
                    )}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-xs text-primary hover:underline font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    className={cn(
                      "input-field pl-10 pr-11",
                      error && "border-red-300 focus:border-red-400 focus:ring-red-200"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-2.5">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  checked={form.remember}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/30 cursor-pointer"
                />
                <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer select-none">
                  Keep me signed in for 7 days
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl",
                  "bg-primary text-white font-semibold text-sm",
                  "hover:bg-primary/90 active:scale-[0.98] transition-all duration-200 shadow-md shadow-primary/20",
                  "disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
                )}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in to OrionX
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Back + footer */}
          <div className="mt-5 text-center space-y-2">
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors">
              <ChevronLeft size={14} /> Back to portal selection
            </Link>
            <p className="text-xs text-gray-400">
              &copy; {new Date().getFullYear()} OrionX. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
